import gulp from 'gulp'
const {src} = gulp
import fs from 'node:fs'
const {writeFileSync} = fs
import tap from 'gulp-tap'
import path from 'node:path'
import {path as _path} from './config.mjs'
import data from '../../src/data/data.json' with {type: 'json'}

let arr = []

export function getList() {
    return src([
        _path.src + '/slides/*',
        '!' + _path.src + '/slides/_partials',
    ]).pipe(
        tap(function (file, t) {
            arr.push(path.basename(file.path))
        })
    )
}

export function createIndex(done) {
    let str =
        `<!DOCTYPE html><head><meta charset="utf-8"><title>
        ${data.project_title}
        </title></head><body style="margin: 0; padding: 0;">
        <iframe src="./slide_0/index.html" frameborder="0" width="2000" height="1200"></iframe>
    </body></html>`;
    writeFileSync(_path.dist + '/index.html', str)
    done()
}
