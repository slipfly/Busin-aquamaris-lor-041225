import gulp from 'gulp';
import uglify from 'gulp-uglify';
import gulpBabel from 'gulp-babel';
import fs from 'fs';
import cheerio from 'gulp-cheerio';
import * as babel from '@babel/core';

import {path} from './config.mjs';

export function babelCompile() {
    return gulp.src([`${path.dist}/**/*.html`]).pipe(
        cheerio(($, file) => {
            $('script:not([src])').each((index, el) => {
                const code = el.firstChild.data;
                const babelTrans = babel.transformSync(code, {
                    presets: ['@babel/preset-env'],
                });
                $(el).text(`
                    ${babelTrans.code}
                `);
            });
            const pathArr = file.path.split('/');
            const distIdx = pathArr.findIndex(el => el === 'dist');
            const transformedPathArr = pathArr.slice(distIdx);
            transformedPathArr.shift();
            const newPath = transformedPathArr.join('/');
            fs.writeFileSync(`output/${newPath}`, $.html(), 'utf-8');
        })
    );
}

export function babelCompileJsFiles() {
    return gulp
        .src([`${path.dist}/**/e-nav.js`, `${path.dist}/**/main.js`])
        .pipe(
            gulpBabel({
                presets: ['@babel/preset-env'],
            })
        )
        .pipe(uglify())
        .pipe(gulp.dest('output'));
}

export function copy() {
    return gulp
        .src([
            `${path.dist}/*/**`,
            `!${path.dist}/**/e-nav.js`,
            `!${path.dist}/**/main.js`,
            `!${path.dist}/**/*.html`,
        ])
        .pipe(gulp.dest('output'));
}
