import replace from "gulp-replace"; // Поиск и замена, редактирование файлов 
import plumber from "gulp-plumber"; // Обработка ошибок 
import notify from "gulp-notify"; // Сообщения
import browsersync from "browser-sync"; 
import newer from "gulp-newer";// Проверка обновления
import ifPlugin from "gulp-if";// Условное действие 

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin,
}