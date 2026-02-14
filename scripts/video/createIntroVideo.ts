import type {BBox} from './bbox.ts';
import {chromium} from 'playwright';
import {moveMouseToBox, moveMouseToLocator} from './moveMouseToBox';
import {showMouseCursor} from './showMouseCursor.ts';
import {videoConfig} from './videoConfig';

const browser = await chromium.launch(videoConfig.launchOptions);
const context = await browser.newContext({
    recordVideo: {
        dir: './videos/',
        size: {width: 1280, height: 720}
    }
});
const page = await context.newPage();

// (1) Open page

await showMouseCursor(page);
await page.goto(videoConfig.appUrl);


// (2) Select the Ignidex Demo panel
await page.waitForTimeout(1000);
const demoListItem = page.getByRole('listitem', { name: 'Ignidex Demo' });
await moveMouseToBox(page, await demoListItem.boundingBox() as BBox, {dx: -100});
await page.waitForTimeout(500);
await demoListItem.click();
// await page.pause();

// (3) Add new bookmark
const examplesGroup = page.getByRole('heading', { name: 'Examples' });

await moveMouseToBox(page, await examplesGroup.boundingBox() as BBox, {dx: -100});
await page.waitForTimeout(500);
await examplesGroup.click({button: 'right'});

const addBookmarkItem = page.getByText('Add Bookmark');
await moveMouseToLocator(page, addBookmarkItem, {dx: -50});
await page.waitForTimeout(500);
await addBookmarkItem.click();

// (3a) Update title
const titleInput = page.getByRole('textbox', { name: 'Title' });
const urlInput = page.getByRole('textbox', { name: 'URL' });
const iconPreview = page.locator('.icon-preview');

await moveMouseToLocator(page, titleInput);
await titleInput.click();
await titleInput.fill('Ignidex');
await page.waitForTimeout(500);


await moveMouseToLocator(page, urlInput);
await urlInput.click();
await urlInput.fill('https://ignidex.eu');
await page.waitForTimeout(500);

await moveMouseToLocator(page, iconPreview);
await iconPreview.click();
await page.waitForTimeout(500);

const iconElement = page.locator('div:nth-child(8) > .image-item-icon');
await moveMouseToLocator(page, iconElement);
await iconElement.click();
await page.waitForTimeout(500);

const maskAccentButton = page.getByRole('radio', { name: 'maskAccent' });
await moveMouseToLocator(page, maskAccentButton);
await maskAccentButton.click();
await page.waitForTimeout(500);

const saveButton = page.getByRole('button', { name: 'Save' });
await moveMouseToLocator(page, saveButton);
await saveButton.click();
await page.waitForTimeout(500);

const createdBookmark = page.getByText('Ignidex', { exact: true });
await moveMouseToLocator(page, createdBookmark);
await page.waitForTimeout(1000);

await context.close();
await browser.close()

