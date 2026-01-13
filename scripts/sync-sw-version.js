/**
 * Synchronizes the service worker cache version with package.json version.
 *
 * Reads the version from package.json and updates the CACHE_NAME constant
 * in public/sw.js to match. This ensures the service worker cache is
 * invalidated when the app version changes.
 *
 * Usage: npm run sync-sw
 * Runs automatically as part of: npm run build
 */
import {readFileSync, writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
const version = packageJson.version;

const swPath = join(rootDir, 'public', 'sw.js');
let swContent = readFileSync(swPath, 'utf-8');

swContent = swContent.replace(
    /const CACHE_NAME = 'ignidex-v[^']*';/,
    `const CACHE_NAME = 'ignidex-v${version}';`
);

writeFileSync(swPath, swContent);
console.log(`Updated sw.js cache version to: ignidex-v${version}`);
