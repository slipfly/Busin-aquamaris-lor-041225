import gulp from 'gulp'
const {src, series, dest} = gulp
import rename from 'gulp-rename'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import cleanCSS from 'gulp-clean-css'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'

import {path as _path} from './config.mjs'
import {osPath} from '../constants.mjs'

const sass = gulpSass(dartSass)

// Fixes missing bs error
let browserSync = false

export function slideCss(done) {
    const stream = src([_path.src + '/slides/**/*.scss'], { base: '.' })
        .pipe(postcss([autoprefixer()]))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(
            rename(function (path) {
                path.dirname = path.dirname.split(osPath).pop()
                path.basename = 'slide.min'
                path.extname = '.css'
            })
        )
        .pipe(dest(_path.dist))

    if (browserSync && typeof browserSync.stream === 'function') {
        return stream.pipe(browserSync.stream())
    }

    return stream
}


export function libsCss(done) {
    const stream = src([_path.src + '/shared/libs/css/**/*.css'])
        .pipe(cleanCSS())
        .pipe(postcss([autoprefixer()]))
        .pipe(rename('libs.min.css'))
        .pipe(dest(_path.dist + '/shared'))
    
    if (browserSync && typeof browserSync.stream === 'function') {
        return stream.pipe(browserSync.stream())
    }

    return stream
}

export function libsCssSf(done) {
    const stream = src([_path.src + '/shared/libs/css/*.css'], {
        base: `${_path.src}/shared/libs/`,
    })
        .pipe(cleanCSS())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest(_path.dist))
        
    if (browserSync && typeof browserSync.stream === 'function') {
        return stream.pipe(browserSync.stream())
    }

    return stream
}

export function sharedCss(done) {
    const stream = src([_path.src + '/shared/scss/**/*.scss'])
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('app.min.css'))
        .pipe(dest(_path.dist + '/shared'))
        
        
    if (browserSync && typeof browserSync.stream === 'function') {
        return stream.pipe(browserSync.stream())
    }

    return stream
}

export function connect(bs, done) {
    browserSync = bs || false
}

export const cssSeries = series(slideCss, libsCss, sharedCss)
