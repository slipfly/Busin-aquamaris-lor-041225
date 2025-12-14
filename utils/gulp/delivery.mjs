import gulp from 'gulp'
const {series, src} = gulp
import {deleteAsync as del} from 'del'
import vinylPaths from 'vinyl-paths'
import zip from 'gulp-zip'
import tap from 'gulp-tap'
import {path as _path} from './config.mjs'

/*
 * Tasks
 */
import {thumbnailsSeries} from './thumbnails.mjs'

import data from '../../src/data/data.json' with {type: 'json'}

export function cleanDelivery(done) {
    const s = src('./delivery/*', {read: false}).pipe(vinylPaths(del))
    console.log('done? cleanDelivery')
    done()
    return s
}

export function zipDelivery(done) {
    const s = src(['./dist/*', '!./dist/index.html']).pipe(
        tap(function (file, t) {
            const fileName = file.relative
            let destFilename =
                fileName !== 'shared'
                    ? fileName
                    : data.project_title.replace(/ /g, '_').toLowerCase() + 
                    '_shared'
            src(['./dist/' + fileName + '/**/*'])
                .pipe(zip(destFilename + '.zip'))
                .pipe(gulp.dest('./delivery'))
        })
    )
    done()
    return s
}

/*
 * Tasks
 */
export const deliverySeries = series(
    thumbnailsSeries,
    cleanDelivery,
    zipDelivery
)
