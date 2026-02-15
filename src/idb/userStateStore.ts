import {UserStateEntry} from '#models/idb/userStateEntry.ts';
import {DatabaseConnector} from './databaseConnector.ts';

export class UserStateStore {
    private readonly userStateStoreName = 'userState';
    private readonly connector = new DatabaseConnector();
    private readonly defaultId = 'default';

    async set(entry: UserStateEntry): Promise<void> {
        await this.connector.set(this.userStateStoreName, entry);
    }

    async getOrCreate(): Promise<UserStateEntry> {
        const entry = await this.connector.get<UserStateEntry>(this.userStateStoreName, this.defaultId);
        console.log('Fetched user state entry', entry);

        return new UserStateEntry(entry ?? {id: this.defaultId});
    }
}
