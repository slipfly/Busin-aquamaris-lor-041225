import gulp from 'gulp'
const {watch, series} = gulp
import browserSync from 'browser-sync'

import {compileTemplates} from './templates.mjs'
import {cssSeries, libsCss, connect as cssConnect} from './css.mjs'
import {jsSeries, libsJs, otherJs} from './js.mjs'
import {copyAssets} from './assets.mjs'

import {path as config} from './config.mjs'

browserSync.create()

// File types
const type = {}
type.img = '.{jpeg,jpg,png,gif,svg,cur,ico}'
type.font = '.{eot,ttf,otf,woff,woff2,svg}'
type.video = '.{mp4,ogv,webm}'
type.audio = '.{wav,mp3}'

function reload(cb) {
    browserSync.reload()
    cb()
}

// Reconnect CSS tasks to browsersync for streaming
function connect(cb) {
    cssConnect(browserSync)
    cb()
}

export function serve() {
    // initialize browsersync
    browserSync.init({
        server: {
            baseDir: [config.dist],
        },
    })
    // Watch handelbar files + compile to HTML
    watch(config.src + '/slides/**/*.pug', series(compileTemplates, reload))
    // Watch JS app files + compile
    watch(config.src + '/slides/**/*.js', series(jsSeries, reload))
    watch(config.src + '/shared/js/**/*.js', series(jsSeries, reload))
    // Watch JS lib files + compile
    watch(
        config.src + '/shared/libs/js/**/*.js',
        series(libsJs, otherJs, reload)
    )
    // Watch CSS files (changes streamed from task)
    watch(config.src + '/**/*.scss', series(connect, cssSeries))
    // Watch CSS lib files + compile
    watch(config.src + '/shared/libs/css/**/*.css', series(connect, libsCss))
    // Watch image asset changes (and copy)
    watch(config.src + '/**/*' + type.img, series(connect, copyAssets))
}
