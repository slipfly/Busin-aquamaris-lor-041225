import gulp from 'gulp'
const { task, series } = gulp

import { copyAssets } from './utils/gulp/assets.mjs'
import { serve } from './utils/gulp/serve.mjs'
import { createIndex, getList } from './utils/gulp/createIndex.mjs'
import { cleanDelivery, zipDelivery } from './utils/gulp/delivery.mjs'
import { thumbnailsSeries, sharedThumbsSeries } from './utils/gulp/thumbnails.mjs'
import { babelCompile, babelCompileJsFiles, copy } from './utils/gulp/babel.mjs'
import { compileTemplates } from './utils/gulp/templates.mjs'
import { cssSeries } from './utils/gulp/css.mjs'
import { jsSeries } from './utils/gulp/js.mjs'

task('thumbs', sharedThumbsSeries)
task('assets', series(
    copyAssets,
    compileTemplates,
    cssSeries,
    jsSeries,
))

task(
    'default',
    series(
        'assets',
        getList,
        createIndex,
        serve
    )
)

task(
    'delivery',
    series(thumbnailsSeries, cleanDelivery, zipDelivery)
)

task('compile', series(copy, babelCompileJsFiles, babelCompile))
