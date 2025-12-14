import gulp from 'gulp'
const {src, series, dest} = gulp
import rename from 'gulp-rename'
import terser from 'gulp-terser'
import gulpSourcemap from 'gulp-sourcemaps'
const {init, write} = gulpSourcemap
import concat from 'gulp-concat'

import {path as _path} from './config.mjs'
import {osPath} from '../constants.mjs'

export function slideJs() {
    return src([_path.src + '/slides/**/*.js'], {base: '.'})
        .pipe(terser())
        .pipe(
            rename(function (path) {
                path.dirname = path.dirname.split(osPath).pop()
                path.basename = 'slide.min'
                path.extname = '.js'
            })
        )
        .pipe(dest(_path.dist))
}

export function libsJs() {
    return src([
        _path.src + '/shared/libs/js/**/*.js',
        '!' + _path.src + '/shared/libs/js/branches.js',
    ])
        .pipe(init())
        .pipe(terser())
        .pipe(concat('libs.min.js'))
        .pipe(write())
        .pipe(rename('libs.min.js'))
        .pipe(dest(_path.dist + '/shared'))
}

export function otherJs() {
    return src([_path.src + '/shared/libs/js/**/branches.js']).pipe(
        dest(_path.dist + '/shared')
    )
}

export function sharedJs() {
    return src([
        _path.src + '/shared/js/**/*.js',
        _path.src + '/shared/js/*.js',
        '!' + _path.src + '/shared/libs/js/**/*.js',
    ])
        .pipe(rename('app.min.js'))
        .pipe(dest(_path.dist + '/shared'))
}

export const jsSeries = series(slideJs, otherJs, libsJs, sharedJs)
