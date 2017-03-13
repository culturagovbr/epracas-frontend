const gulp = require("gulp");
const notify = require("gulp-notify");
const source = require("vinyl-source-stream");
const browserify = require("browserify");
const babelify = require("babelify");
const assign = require("lodash.assign");
const ngAnnotate = require("browserify-ngannotate");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");
const templateCache = require("gulp-angular-templatecache");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const historyFB = require("connect-history-api-fallback");
const merge = require("merge-stream");
const preprocess = require("gulp-preprocess");
const preprocessify = require("preprocessify");
const continuousConcat = require("gulp-continuous-concat");
const config = require("konfig")({ path: "." });
const cssnano = require("gulp-cssnano");
const htmlmin = require("gulp-htmlmin");
const bro = require("gulp-bro");
const gzip = require("gulp-gzip");

// Where our files are located
const paths = {
  jsFiles: "src/js/**/*.js",
  viewFiles: "src/js/**/*.html",
  assetsFiles: "src/assets/**",
  cssFiles: {
    app: "src/css/*.css",
    material: "./node_modules/angular-material/angular-material.css",
    steppers: "./node_modules/material-steppers/dist/material-steppers.css",
    bootstrapCalendar: "./node_modules/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.css",
    // materialize: "./node_modules/materialize-css/dist/css/materialize.min.css",
  },
  buildDest: "./build/",
  distDest: "./dist/",
  // fonts: "./fonts/",
};


const interceptErrors = function (error) {
  const args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>",
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit("end");
};


gulp.task("browserify", ["views"], () => {
  return gulp.src("./src/js/app.js")
    .pipe(bro({
      transform: [
        babelify.configure({ presets: ["es2015"] }),
        ngAnnotate,
        ["preprocessify", {
          includeExtensions: [".js"],
          context: {
            IDCULTURA_URL: config.app.idcultura_url,
            IDCULTURA_CLIENTID: config.app.idcultura_clientId,
            EPRACAS_API_URL: config.app.epracas_api_url,
          },
        }],
      ],
    }))
    // .pipe(source("main.js"))
    .pipe(rename("main.js"))
    .pipe(gulp.dest(paths.buildDest));
});

// gulp.task("browserify", ["views"], function() {
//   return browserify("./src/js/app.js")
//     .transform(babelify, {presets: ["es2015"]})
//     .transform(ngAnnotate)
//     .transform(preprocessify, {
//       includeExtensions: [".js"],
//       context: {
//         IDCULTURA_URL: config.app.idcultura_url,
//         IDCULTURA_CLIENTID: config.app.idcultura_clientId,
//         EPRACAS_API_URL: config.app.epracas_api_url,
//       },
//     })
//     .bundle()
//     .on("error", interceptErrors)
//   // Pass desired output filename to vinyl-source-stream
//     .pipe(source("main.js"))
//   // Start piping stream to tasks!
//     .pipe(gulp.dest(paths.buildDest));
// });

gulp.task("html", () => {
  return gulp.src("src/index.html")
    .on("error", interceptErrors)
    .pipe(preprocess({
      context: { PROD: config.app.prod },
    }))
    .pipe(gulp.dest(paths.buildDest));
});

gulp.task("views", () => {
  return gulp.src(paths.viewFiles)
    .pipe(preprocess())
    .pipe(templateCache({
      concat: continuousConcat,
      standalone: true,
    }))
    .on("error", interceptErrors)
    .pipe(rename("app.templates.js"))
    .pipe(gulp.dest("./src/js/config/"));
});

gulp.task("angular-bootstrap-calendarCss", () => {
  gulp.src(paths.cssFiles.bootstrapCalendar)
    .pipe(cssnano())
    .pipe(gulp.dest(`${paths.buildDest}css`))
});
// gulp.task("materialize-css", () => {
//   gulp.src(paths.cssFiles.materialize)
//     .pipe(cssnano())
//     .pipe(gulp.dest(`${paths.buildDest}css`))
// });
// gulp.task("fonts", () => {
//   gulp.src(paths.fonts)
//     .pipe(cssnano())
//     .pipe(gulp.dest(`${paths.buildDest}fonts`))
// });
gulp.task("materialCss", () => {
  gulp.src(paths.cssFiles.material)
    .pipe(cssnano())
    .pipe(gulp.dest(`${paths.buildDest}css`));
});

gulp.task("appCss", () => {
  gulp.src(paths.cssFiles.app)
    .pipe(cssnano())
    .pipe(gulp.dest(`${paths.buildDest}css`));
});

gulp.task("steppersCss", () => {
  gulp.src(paths.cssFiles.steppers)
    .pipe(cssnano())
    .pipe(gulp.dest(`${paths.buildDest}css`));
});

gulp.task("assets", () => {
  gulp.src(paths.assetsFiles)
    .pipe(gulp.dest(`${paths.buildDest}assets`));
});

// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task("build", ["html", "browserify", "angular-bootstrap-calendarCss", "materialCss", "appCss", "steppersCss", "assets"], () => {
  const html = gulp.src("build/index.html")
    .pipe(htmlmin())
    .pipe(gulp.dest(paths.distDest));

  const js = gulp.src("build/main.js")
    .pipe(preprocess())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gzip())
    .pipe(gulp.dest(paths.distDest));

  const css = gulp.src(`${paths.buildDest}css/**`)
    .pipe(cssnano())
    .pipe(gulp.dest(`${paths.distDest}/css/`));

  const assets = gulp.src(`${paths.buildDest}assets/**`)
    .pipe(gulp.dest(`${paths.distDest}/assets/`));

  return merge(html, js, css, assets);
});

gulp.task("default", ["html", "browserify", "angular-bootstrap-calendarCss", "materialCss", "appCss", "steppersCss", "assets"], () => {
  browserSync.init([`${paths.buildDest}/**/**.**`], {
    server: paths.buildDest,
    port: 4000,
    middleware: [historyFB()],
    notify: true,
    ui: {
      port: 4001,
    },
  });

  gulp.watch("src/index.html", ["html"]);
  gulp.watch(paths.viewFiles, ["views"]);
  gulp.watch(paths.jsFiles, ["browserify"]);
  gulp.watch(paths.cssFiles.app, ["appCss"]);
});
