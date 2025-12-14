import gulp from 'gulp'
const {src, dest} = gulp
import pug from 'gulp-pug'
import rename from 'gulp-rename'

import {path as _path} from './config.mjs'
import data from '../../src/data/data.json' with {type: 'json'}

export function compileTemplates(cb) {
    const modals = {}
    const options = {
        ignorePartials: true,
        batch: [_path.src + '/slides/_partials'],
        helpers: {
            inc: function (index) {
                index++
                index++
                return index
            },
        },
    }
    return src([
        _path.src + '/slides/**/*.pug',
        '!' + _path.src + '/slides/_**/*.pug',
        '!' + _path.src + '/slides/_**.pug',
    ])
        .pipe(pug({data, modals}, options))
        .pipe(
            rename(function (path) {
                path.dirname += ''
                path.basename = 'index'
                path.extname = '.html'
            })
        )
        .pipe(dest(_path.dist))
}
