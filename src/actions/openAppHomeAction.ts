import type {ActionInterface} from './actionInterface.ts';

const IGNIDEX_GITHUB_URL = 'https://github.com/zeitport/ignidex';

export class OpenAppHomeAction implements ActionInterface {
    run() {
        window.location.href = IGNIDEX_GITHUB_URL;
    }
}
