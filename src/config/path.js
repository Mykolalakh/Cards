// Получаем имя папки проекта 
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`; // путь к папке с результатом
const srcFolder = `./src`; // путь к папке с исходниками 
const startFolder = `./`;

export const path = {
    build:{
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${startFolder}/`, 
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        files: `${buildFolder}/files/`,
    },
    src:{
        js: `${srcFolder}/js/*.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
         svg: `${srcFolder}/img/**/*.svg`,
        scss: `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.html`, // путь к добавленному файлу index.html // хочу получать только те html файлыб что находятся непосредственно в папке src
        files: `${srcFolder}/files/**/*.*`, // путь к файлам которые хочу скопировать
    },
    watch:{
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,// хочу наблюдать за html файлами что находятся и в папке srcб и в других её папках
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
        files: `${srcFolder}/files/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    startFolder: startFolder,
}