import gulp from 'gulp'
const {src, dest} = gulp
import imagemin from 'gulp-imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminOptipng from 'imagemin-optipng'

import {path} from './config.mjs'

// File types
const type = {}
type.img = '.{jpeg,jpg,png,gif,svg,cur,ico}'
type.font = '.{eot,ttf,otf,woff,woff2,svg}'
type.video = '.{mp4,ogv,webm}'
type.audio = '.{wav,mp3}'
type.pdf = '.pdf'

export function copyAssets(cb) {
    // Shared assets
    src(
        [
            path.src + '/shared/images/**/*' + type.img,
            path.src + '/shared/fonts/**/*' + type.font,
            path.src + '/shared/video/**/*' + type.video,
            path.src + '/shared/pdf/*' + type.pdf,
        ],
        {base: path.src}
    )
        .pipe(
            imagemin([
                imageminMozjpeg({quality: 85, progressive: true}),
                imageminOptipng({optimizationLevel: 5}),
            ])
        )
        .pipe(dest(path.dist))
    // Slide assets
    src([path.src + '/slides/**/*' + type.img], {
        base: path.src + '/slides',
    })
        .pipe(
            imagemin([
                imageminMozjpeg({quality: 85, progressive: true}),
                imageminOptipng({optimizationLevel: 5}),
            ])
        )
        .pipe(dest(path.dist))
    cb()
}
