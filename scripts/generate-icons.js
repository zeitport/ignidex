import sharp from 'sharp';
import {readFileSync, mkdirSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');
const iconsDir = join(publicDir, 'icons');

const sizes = [192, 512];

async function generateIcons() {
    if (!existsSync(iconsDir)) {
        mkdirSync(iconsDir, {recursive: true});
    }

    const svgPath = join(publicDir, 'ignidex-icon.svg');
    const svgBuffer = readFileSync(svgPath);

    for (const size of sizes) {
        const outputPath = join(iconsDir, `icon-${size}.png`);
        await sharp(svgBuffer)
            .resize(size, size)
            .png()
            .toFile(outputPath);
        console.log(`Generated: ${outputPath}`);
    }

    console.log('Icon generation complete.');
}

generateIcons().catch(console.error);
