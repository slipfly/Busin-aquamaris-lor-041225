import gulp from 'gulp'
const {series} = gulp
import puppeteer from 'puppeteer'
import jimp from 'jimp'
import browserSync from 'browser-sync'
import events from 'node:events'
import fs from 'node:fs'

import {path as _path} from './config.mjs'

const bs = browserSync.create()

let port = 3010

events.defaultMaxListeners = 100

export function startServer(done) {
    // Create local server
    bs.init({
        server: {
            baseDir: _path.dist,
        },
        port,
        notify: false,
        open: false,
    })
    setTimeout(() => {
        done()
    }, 2000)
}

export async function createThumbnails(done) {
    const folderPath = `${_path.src}/slides`
    const foldersArr = fs
        .readdirSync(folderPath)
        .filter(folder => folder !== '_partials' && folder !== '.DS_Store')
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: 'new',
        defaultViewport: {
            width: 2000,
            height: 1200,
        },
        args: ['--no-sandbox', '--disable-gpu'],
    })
    await Promise.all(
        foldersArr.map(folder => {
            return new Promise(async (resolve, reject) => {
                const page = await browser.newPage()
                await page.goto('http://localhost:' + port + '/' + folder, {
                    waitUntill: 'networkidle0',
                    timeout: 60000,
                })
                await page.waitForNetworkIdle(4300)
                await page.screenshot({
                    path: 'dist/' + folder + '/thumb.png',
                })
                await page.close()
                await jimp
                    .read('dist/' + folder + '/thumb.png')
                    .then(img => {
                        return img
                            .resize(380, 228)
                            .quality(60)
                            .write('dist/' + folder + '/thumb.png')
                    })
                    .catch(err => {
                        console.error(err)
                    })
                resolve()
            })
        })
    ).then(() => {
        browser.close()
        bs.exit()
        done()
    })
}

export async function createSharedThumbnails(done) {
    const folderPath = `${_path.src}/slides`;
    const foldersArr = fs
        .readdirSync(folderPath)
        .filter(folder => folder !== '_partials' && folder !== '.DS_Store');

    const thumbnailsDir = `${_path.src}/shared/images/thumbnails`;
    fs.mkdirSync(thumbnailsDir, { recursive: true }); // <-- ensure folder exists

    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: 'new',
        defaultViewport: { width: 2000, height: 1200 },
        args: ['--no-sandbox', '--disable-gpu'],
    });

    try {
        await Promise.all(
            foldersArr.map(async (folder) => {
                try {
                    const page = await browser.newPage();

                    await page.goto(`http://localhost:${port}/${folder}`, {
                        waitUntil: 'networkidle0',
                        timeout: 60000,
                    });

                    await page.waitForNetworkIdle(4300);

                    const outPath = `${thumbnailsDir}/${folder}.png`;

                    await page.screenshot({ path: outPath });
                    await page.close();

                    const img = await jimp.read(outPath);
                    await img.resize(380, 228).quality(60).writeAsync(outPath);

                } catch (err) {
                    console.error(`Thumb error for ${folder}:`, err);
                    // don't rethrow — we want other thumbnails to continue
                }
            })
        );
    } finally {
        await browser.close().catch(() => { });
        if (typeof bs !== 'undefined' && bs && typeof bs.exit === 'function') {
            bs.exit();
        }
        done();
    }
}

export const thumbnailsSeries = series(startServer, createThumbnails)
export const sharedThumbsSeries = series(startServer, createSharedThumbnails)
