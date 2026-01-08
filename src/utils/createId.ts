import {customAlphabet} from 'nanoid';

const abc = 'abcdefghijklmnopqrstuvwxyz';
const abcUppercase = abc.toUpperCase();

const nanoid = customAlphabet(abc + abcUppercase, 10);

/**
 * Generates a unique identifier string using the nanoid library.
 * @return {string} A unique identifier string.
 */
export function createId(): string {
    return nanoid();
}
