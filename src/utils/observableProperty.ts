import {ObservableController} from '#utils/observableController.ts';
import {ReactiveControllerHost} from 'lit';

export type ObservablePropertyCallback<T> = (value: T) => void | Promise<void>;

export class ObservableProperty<T> {
    private propertyValue: T;
    private subscribers = new Set<ObservablePropertyCallback<T>>;

    constructor(value: T) {
        this.propertyValue = value;
    }

    set value(value: T) {
        if (this.propertyValue !== value) {
            this.propertyValue = value;
            this.update();
        }
    }

    get value() {
        return this.propertyValue;
    }

    get nonNullableValue(): NonNullable<T> {
        // Does not use the strict equal (===) here to also catch undefined
        if (this.propertyValue == null) {
            throw new Error(`${this.constructor.name} Expected property value not to be null/undefined.`);
        }

        return this.propertyValue;
    }

    observe(callback: (value: T) => void | Promise<void>) {
        this.subscribers.add(callback);
        callback(this.propertyValue);

        return {
            unsubscribe: () => {
                this.unsubscribe(callback);
            }
        }
    }

    unsubscribe(callback: (value: T) => void | Promise<void>) {
        this.subscribers.delete(callback);
        callback(this.propertyValue);
    }

    update() {
        for(const callback of this.subscribers.values()) {
            callback(this.propertyValue);
        }
    }

    /**
     * Creates a watch controller that automatically updates the host component
     * when the property value changes.
     *
     * @example
     * class MyElement extends LitElement {
     *   private myProperty = someObservableProperty.watch(this);
     *
     *   render() {
     *     return html`<div>${this.myProperty.value}</div>`;
     *   }
     * }
     *
     * @param host The Lit component that will use this controller.
     */
    watch(host: ReactiveControllerHost) {
        return new ObservableController(host, this);
    }
}
