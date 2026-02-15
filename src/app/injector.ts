/* eslint-disable @typescript-eslint/no-explicit-any */

type ConstructorType<T> = {new (...args: any[]): T};

const instances: Map<ConstructorType<any>, any> = new Map();

export class Injector {
    static get<T>(constructor: ConstructorType<T>): T {
        if (instances.has(constructor)) {
            return instances.get(constructor) as T;
        }

        const instance = new constructor();
        instances.set(constructor, instance);

        return instance;
    }
}

export function inject<T>(constructor: ConstructorType<T>): T {
    return Injector.get(constructor);
}
