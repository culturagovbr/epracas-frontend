var gulp          = require('gulp');
var notify        = require('gulp-notify');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var sourcemaps		= require('gulp-sourcemaps');
var historyFB     = require('connect-history-api-fallback');
var merge         = require('merge-stream');

// Where our files are located
var paths = {
	jsFiles: 'src/js/**/*.js',
	viewFiles: 'src/js/**/*.html',
	cssFiles: {
		app: 'src/assets/*.css',
		materialCss: './node_modules/angular-material/angular-material.css'
	},
};

var buildDest = "./build/";


var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};


gulp.task('browserify', ['views'], function() {
  return browserify('./src/js/app.js')
      .transform(babelify, {presets: ["es2015"]})
      .transform(ngAnnotate)
      .bundle()
      .on('error', interceptErrors)
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('main.js'))
      // Start piping stream to tasks!
      .pipe(gulp.dest(buildDest));
});

gulp.task('html', function() {
  return gulp.src("src/index.html")
      .on('error', interceptErrors)
      .pipe(gulp.dest(buildDest));
});

gulp.task('views', function() {
  return gulp.src(paths.viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename("app.templates.js"))
      .pipe(gulp.dest('./src/js/config/'));
});

gulp.task('materialCss', function() {
	gulp.src(paths.cssFiles.materialCss)
	.pipe(gulp.dest(buildDest + 'css'));
});

gulp.task('appCss', function() {
	gulp.src(paths.cssFiles.app)
	.pipe(gulp.dest(buildDest + 'css'));
});

// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['html', 'browserify'], function() {
  var html = gulp.src("build/index.html")
                 .pipe(gulp.dest('./dist/'));

  var js = gulp.src("build/main.js")
							 .pipe(sourcemaps.init({loadMaps:true}))
               .pipe(uglify())
							 .pipe(sourcemaps.write('./'))
               .pipe(gulp.dest('./dist/'));

  return merge(html,js);
});

gulp.task('default', ['html', 'browserify', 'materialCss', 'appCss'], function() {

  browserSync.init([buildDest + '/**/**.**'], {
    server: buildDest,
    port: 4000,
		middleware: [ historyFB() ],
    notify: true,
    ui: {
      port: 4001
    }
  });

  gulp.watch("src/index.html", ['html']);
  gulp.watch(paths.viewFiles, ['views']);
  gulp.watch(paths.jsFiles, ['browserify']);
	gulp.watch(paths.cssFiles.app, ['appCss']);
});
