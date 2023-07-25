//родключаем основной модуль
import gulp from "gulp";
//импорт путей
import {path} from "./src/config/path.js";
// импорт общих плагинов
import {plugins} from "./src/config/plugins.js";


//Передаем значения в глобальную переменную (тут будут сущности)
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

import {copy} from "./src/tasks/copy.js";
import {reset} from "./src/tasks/reset.js";
import {html} from "./src/tasks/html.js";
import {server} from "./src/tasks/server.js";
import {scss} from "./src/tasks/scss.js";
import {js} from "./src/tasks/js.js";
import {images} from "./src/tasks/images.js";
import {otfToTtf, ttfToWoff, fontsStyle} from "./src/tasks/fonts.js";

// import {zip} from "./gulp/tasks/zip.js";

function watcher() {
    gulp.watch(path.watch.files, copy);// путь к файлам за которыми нужно следить, действие которые нужно выполнить при изминении
   gulp.watch(path.watch.html, html);// html => gulp.series(html, ftp) для каждой задачи
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series( reset, mainTasks); // только в режиме продакшена 

export {dev}
export {build}
// export {deployZIP}
// export {deployFTP}

gulp.task ('default', dev);