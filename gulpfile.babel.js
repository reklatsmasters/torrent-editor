// generated on 2015-06-22 using generator-gulp-webapp 1.0.1
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';
import webpack from 'webpack';
import WebpackServer from 'webpack-dev-server';
import webpack_server_config from './webpack.config.dev';
import webpack_config from './webpack.config';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import bufferify from 'vinyl-buffer';
import babelify from 'babelify';
import bowerify from 'debowerify';
import proxy from 'http-proxy-middleware';
import {log} from "gulp-util";
import historyApiFallback from 'connect-history-api-fallback';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 2 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('styles:dist', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sass.sync({
      outputStyle: 'compact',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 2 version']}))
    .pipe(gulp.dest('.tmp/styles'))
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  },
  globals: {
    assert: false,
    expect: false,
    should: false
  }
};

gulp.task('lint', lint('app/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles:dist', 'webpack'], () => {
  const assets = $.useref.assets({ searchPath: ['.tmp', 'app', '.'] });
  const inject_opts = {
    starttag: '<!-- inject:analytics -->',
    transform: function (filePath, file) {
      return file.contents.toString('utf8')
    }
  }

  return gulp.src('app/*.html')
    .pipe(assets)
    //.pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.inject(gulp.src('analitics/*.html'), inject_opts)))
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, empty: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['wiredep', 'styles'], () => {
  var wpserver = new WebpackServer(webpack(webpack_server_config), {
    //contentBase: 'app',
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: "/assets/",
  })
  
  // assets server
  wpserver.listen(8081, 'localhost', function () {
    log('webpack dev server started on port 8081');
  });
  
  // api server
  $.nodemon({
    script: 'server/app.js',
    watch: ['server/*.js']
  })

  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      },
      middleware: [proxy('http://localhost:8081/assets'), proxy('http://localhost:8082/api'), historyApiFallback()]
    }
  });

  gulp.watch([
    'app/*.html',
    'app/images/**/*',
    //'.tmp/scripts/**/*',  // watch generated scripts
    //'.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  //gulp.watch('app/fonts/**/*', ['fonts']);
  //gulp.watch('app/scripts/**/*', ['webpack']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task("webpack", function(callback) {
  // run webpack
  webpack(webpack_config, function(err, stats) {
    if(err) { throw new $.util.PluginError("webpack", err); }
    $.util.log("[webpack]", stats.toString());
    callback();
  });
});

gulp.task('browser', () => {
  return browserify('./src/js/main.js')
    .transform(bowerify)
    .transform(babelify)
    .bundle()
    .pipe($.plumber())
    .pipe(source('app/scripts/main.js'))
    .pipe(bufferify())
    .pipe(uglify())
    .pipe(gulp.dest('app/scripts'))
  ;
});

gulp.task('build', ['html', 'images'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});