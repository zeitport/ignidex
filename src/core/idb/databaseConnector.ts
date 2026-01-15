import {ImageAssetsStore} from '#core/idb/imageAssetsStore.ts';
import type {StartPanelEntry} from '#models/idb/startPanelEntry.ts';

export class DatabaseConnector {
    private dbPromise: Promise<IDBDatabase> | null = null;
    private readonly dbName: string = 'ignidex';
    private readonly dbVersion: number = 11;

    private readonly startPanelsStoreName = 'startPanels';
    private readonly userStateStoreName = 'userState';

    private get idb(): IDBFactory | null {
        if (typeof indexedDB === 'undefined') return null;
        return indexedDB;
    }

    open(): Promise<IDBDatabase> {
        if (this.dbPromise) return this.dbPromise;

        if (!this.idb) {
            this.dbPromise = Promise.reject(new Error('IndexedDB is not available in this environment.'));
            return this.dbPromise;
        }

        this.dbPromise = new Promise((resolve, reject) => {
            const request = this.idb!.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = () => {
                console.log(`Upgrading IndexedDB database to version ${this.dbVersion}`);

                const db = request.result;
                const transaction = request.transaction!;

                ImageAssetsStore.upgrade(db);
                this.upgradeStartPanelsStore(db, transaction);
                this.upgradeUserStateStore(db);
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error ?? new Error('Failed to open IndexedDB'));
        });

        return this.dbPromise;
    }

    async get<T>(storeName: string, id: string): Promise<T | null> {
        const db = await this.open();
        return await new Promise<T | null>((resolve, reject) => {
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const req = store.get(id);
            req.onsuccess = () => resolve((req.result as T) ?? null);
            req.onerror = () => reject(req.error ?? new Error(`Failed to read from ${storeName}`));
        });
    }

    async set<T>(storeName: string, entry: T): Promise<void> {
        const db = await this.open();
        await new Promise<void>((resolve, reject) => {
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const req = store.put(entry);
            req.onsuccess = () => resolve();
            req.onerror = () => reject(req.error ?? new Error(`Failed to write to ${storeName}`));
        });
    }

    async has(storeName: string, id: string): Promise<boolean> {
        const db = await this.open();
        return await new Promise<boolean>((resolve, reject) => {
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const req = store.getKey(id);
            req.onsuccess = () => resolve(req.result !== undefined && req.result !== null);
            req.onerror = () => reject(req.error ?? new Error(`Failed to check existence in ${storeName}`));
        });
    }

    async getAll<T>(storeName: string): Promise<Array<T>> {
        const db = await this.open();
        return await new Promise<Array<T>>((resolve, reject) => {
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result as Array<T>);
            req.onerror = () => reject(req.error ?? new Error(`Failed to get all entries from ${storeName}`));
        });
    }

    async delete(storeName: string, id: string): Promise<void> {
        const db = await this.open();
        await new Promise<void>((resolve, reject) => {
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const req = store.delete(id);
            req.onsuccess = () => resolve();
            req.onerror = () => reject(req.error ?? new Error(`Failed to delete from ${storeName}`));
        });
    }

    async getByIndex<T>(storeName: string, indexName: string, value: IDBValidKey): Promise<T | null> {
        const db = await this.open();
        return await new Promise<T | null>((resolve, reject) => {
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const index = store.index(indexName);
            const req = index.get(value);
            req.onsuccess = () => resolve((req.result as T) ?? null);
            req.onerror = () => reject(req.error ?? new Error(`Failed to read from ${storeName} by index ${indexName}`));
        });
    }

    private upgradeStartPanelsStore(db: IDBDatabase, transaction: IDBTransaction): void {
        if (!db.objectStoreNames.contains(this.startPanelsStoreName)) {
            console.log(`Creating start panels store with anchor and remoteUrl indexes`);
            const store = db.createObjectStore(this.startPanelsStoreName, {keyPath: 'id'});
            store.createIndex('anchor', 'anchor', {unique: false});
            store.createIndex('remoteUrl', 'remoteUrl', {unique: false});
        } else {
            const store = transaction.objectStore(this.startPanelsStoreName);

            if (!store.indexNames.contains('anchor')) {
                console.log(`Creating anchor index.`);
                store.createIndex('anchor', 'anchor', {unique: false});
            }

            if (!store.indexNames.contains('remoteUrl')) {
                console.log(`Creating remoteUrl index.`);
                store.createIndex('remoteUrl', 'remoteUrl', {unique: false});
            }

            this.migrateStartPanelsOrder(store);
            this.migrateStartPanelsRemoteUrl(store);
        }
    }

    private migrateStartPanelsOrder(store: IDBObjectStore): void {
        console.log(`Migrate Start Panels Order`);
        const request = store.openCursor();
        let orderIndex = 0;

        request.onsuccess = () => {
            const cursor = request.result;

            if (cursor && cursor.value) {
                const entry = cursor.value as Partial<StartPanelEntry>;

                if (entry.order === undefined || entry.order === null) {
                    entry.order = orderIndex;
                    cursor.update(entry);
                    orderIndex++;
                }
                cursor.continue();
            }
        };
    }

    private migrateStartPanelsRemoteUrl(store: IDBObjectStore): void {
        console.log(`Migrate Start Panels RemoteUrl`);
        const request = store.openCursor();

        request.onsuccess = () => {
            const cursor = request.result;

            if (cursor && cursor.value) {
                const entry = cursor.value as Partial<StartPanelEntry>;

                if (entry.remoteUrl === undefined) {
                    entry.remoteUrl = null;
                    cursor.update(entry);
                }
                cursor.continue();
            }
        };
    }

    private upgradeUserStateStore(db: IDBDatabase): void {
        if (!db.objectStoreNames.contains(this.userStateStoreName)) {
            db.createObjectStore(this.userStateStoreName, {keyPath: 'id'});
        }
    }
}
