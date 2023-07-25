import webpack from "webpack-stream";
// import minifyjs from "gulp-js-minify"


export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "JS",
            message: "Error: <%= error.message %>"
        })
    ))
    .pipe(webpack({
        mode: app.isBuil ? 'production' : 'development',
        output: {
            filename: 'app.min.js'
        }
    }))
    // .pipe(concat('scripts.min.js')) //обєднує
    // .pipe(minifyjs())
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
}