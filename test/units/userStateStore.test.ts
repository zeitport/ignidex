import {expect, test, describe, vi, beforeEach} from 'vitest';
import {UserStateEntry} from '#models/idb/userStateEntry.ts';

const mockGet = vi.fn();
const mockSet = vi.fn();

vi.mock('#src/idb/databaseConnector.ts', () => {
    return {
        DatabaseConnector: class {
            get = mockGet;
            set = mockSet;
        },
    };
});

// Import after mock setup so the mock is applied
const {UserStateStore} = await import('#src/idb/userStateStore.ts');

beforeEach(() => {
    vi.clearAllMocks();
});

describe('UserStateStore', () => {
    describe('set', () => {
        test('should delegate to connector.set with correct store name', async () => {
            const store = new UserStateStore();
            const entry = new UserStateEntry({id: 'default'});

            await store.set(entry);

            expect(mockSet).toHaveBeenCalledOnce();
            expect(mockSet).toHaveBeenCalledWith('userState', entry);
        });
    });

    describe('getOrCreate', () => {
        test('should return existing entry when found in database', async () => {
            const existing = {
                id: 'default',
                accentColor: '#ff0000',
                baseFontSize: 20,
                useUppercase: false,
            };
            mockGet.mockResolvedValue(existing);

            const store = new UserStateStore();
            const result = await store.getOrCreate();

            expect(mockGet).toHaveBeenCalledWith('userState', 'default');
            expect(result).toBeInstanceOf(UserStateEntry);
            expect(result.accentColor).toBe('#ff0000');
            expect(result.baseFontSize).toBe(20);
            expect(result.useUppercase).toBe(false);
        });

        test('should create default entry when nothing is found in database', async () => {
            mockGet.mockResolvedValue(null);

            const store = new UserStateStore();
            const result = await store.getOrCreate();

            expect(mockGet).toHaveBeenCalledWith('userState', 'default');
            expect(result).toBeInstanceOf(UserStateEntry);
            expect(result.id).toBe('default');
        });

        test('should preserve default values for missing fields on existing entry', async () => {
            mockGet.mockResolvedValue({id: 'default'});

            const store = new UserStateStore();
            const result = await store.getOrCreate();

            expect(result.baseFontSize).toBe(16);
            expect(result.useUppercase).toBe(true);
            expect(result.accentColor).toBeNull();
            expect(result.lastUsedStartPanelId).toBeNull();
            expect(result.dragHoldDelay).toBe(500);
        });
    });
});
