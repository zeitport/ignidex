import {ReactiveController, ReactiveControllerHost} from 'lit';
import {ObservableProperty} from './observableProperty';

export class ObservableController<T> implements ReactiveController {
    private host: ReactiveControllerHost;
    private observable: ObservableProperty<T>;
    private unsubscribe?: () => void;

    constructor(host: ReactiveControllerHost, observable: ObservableProperty<T>) {
        this.host = host;
        this.observable = observable;
        host.addController(this);
    }

    get value(): T {
        return this.observable.value;
    }

    set value(val: T) {
        this.observable.value = val;
    }

    hostConnected() {
        const subscription = this.observable.observe(() => {
            this.host.requestUpdate();
        });
        this.unsubscribe = subscription.unsubscribe;
    }

    hostDisconnected() {
        this.unsubscribe?.();
    }
}
