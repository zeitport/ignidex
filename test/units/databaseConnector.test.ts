import 'fake-indexeddb/auto';
import {expect, test, describe, beforeEach, afterEach} from 'vitest';
import {DatabaseConnector} from '#src/idb/databaseConnector.ts';

function deleteDatabase(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const req = indexedDB.deleteDatabase('ignidex');
        req.onsuccess = () => resolve();
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        req.onerror = () => reject(req.error);
    });
}

describe('DatabaseConnector', () => {
    let connector: DatabaseConnector;

    beforeEach(async () => {
        await deleteDatabase();
        connector = new DatabaseConnector();
    });

    afterEach(async () => {
        try {
            const db = await connector.open();
            db.close();
        } catch { /* ignore */ }
        await deleteDatabase();
    });

    describe('open', () => {
        test('should open the database successfully', async () => {
            const db = await connector.open();
            expect(db).toBeInstanceOf(IDBDatabase);
            expect(db.name).toBe('ignidex');
        });

        test('should return the same promise on repeated calls', () => {
            const promise1 = connector.open();
            const promise2 = connector.open();
            expect(promise1).toBe(promise2);
        });

        test('should create all required object stores', async () => {
            const db = await connector.open();
            expect(db.objectStoreNames.contains('startPanels')).toBe(true);
            expect(db.objectStoreNames.contains('userState')).toBe(true);
            expect(db.objectStoreNames.contains('imageAssets')).toBe(true);
        });

        test('should create anchor index on startPanels store', async () => {
            const db = await connector.open();
            const tx = db.transaction('startPanels', 'readonly');
            const store = tx.objectStore('startPanels');
            expect(store.indexNames.contains('anchor')).toBe(true);
        });

        test('should create remoteUrl index on startPanels store', async () => {
            const db = await connector.open();
            const tx = db.transaction('startPanels', 'readonly');
            const store = tx.objectStore('startPanels');
            expect(store.indexNames.contains('remoteUrl')).toBe(true);
        });
    });

    describe('set and get', () => {
        test('should store and retrieve an entry', async () => {
            const entry = {id: 'test-1', value: 'hello'};
            await connector.set('userState', entry);

            const result = await connector.get<typeof entry>('userState', 'test-1');
            expect(result).toEqual(entry);
        });

        test('should return null for a non-existent entry', async () => {
            const result = await connector.get('userState', 'non-existent');
            expect(result).toBeNull();
        });

        test('should overwrite an existing entry with same id', async () => {
            await connector.set('userState', {id: 'test-1', value: 'first'});
            await connector.set('userState', {id: 'test-1', value: 'second'});

            const result = await connector.get<{id: string; value: string}>('userState', 'test-1');
            expect(result?.value).toBe('second');
        });
    });

    describe('has', () => {
        test('should return true when entry exists', async () => {
            await connector.set('userState', {id: 'exists'});
            const result = await connector.has('userState', 'exists');
            expect(result).toBe(true);
        });

        test('should return false when entry does not exist', async () => {
            const result = await connector.has('userState', 'missing');
            expect(result).toBe(false);
        });
    });

    describe('getAll', () => {
        test('should return empty array when store is empty', async () => {
            const result = await connector.getAll('userState');
            expect(result).toEqual([]);
        });

        test('should return all entries in the store', async () => {
            await connector.set('userState', {id: 'a', value: 1});
            await connector.set('userState', {id: 'b', value: 2});
            await connector.set('userState', {id: 'c', value: 3});

            const result = await connector.getAll<{id: string; value: number}>('userState');
            expect(result).toHaveLength(3);

            const ids = result.map(item => item.id).sort();
            expect(ids).toEqual(['a', 'b', 'c']);
        });
    });

    describe('delete', () => {
        test('should remove an existing entry', async () => {
            await connector.set('userState', {id: 'to-delete'});
            await connector.delete('userState', 'to-delete');

            const result = await connector.get('userState', 'to-delete');
            expect(result).toBeNull();
        });

        test('should not throw when deleting a non-existent entry', async () => {
            await expect(connector.delete('userState', 'ghost')).resolves.toBeUndefined();
        });
    });

    describe('getByIndex', () => {
        test('should retrieve an entry by index value', async () => {
            await connector.set('startPanels', {
                id: 'panel-1',
                anchor: 'home',
                order: 0,
                remoteUrl: null,
                startPanel: {name: 'Home'},
            });

            const result = await connector.getByIndex<{id: string; anchor: string}>(
                'startPanels', 'anchor', 'home',
            );
            expect(result?.id).toBe('panel-1');
            expect(result?.anchor).toBe('home');
        });

        test('should return null when no entry matches the index value', async () => {
            const result = await connector.getByIndex('startPanels', 'anchor', 'missing');
            expect(result).toBeNull();
        });
    });
});
