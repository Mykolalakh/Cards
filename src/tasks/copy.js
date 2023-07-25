// Создаём функцию которая будет выполнять коркретную задачу
export const copy = () => {
    return app.gulp.src(app.path.src.files) // глобальня переменная/ ищем галп/ методб который получает доступ к файлам и папкам по указаному пути 
    .pipe(app.gulp.dest(app.path.build.files))
}