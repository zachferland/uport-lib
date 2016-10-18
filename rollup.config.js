import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import istanbul from 'rollup-plugin-istanbul';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import include from 'rollup-plugin-includepaths';


let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
  entry: 'src/index.js',
  plugins: [
    babel(babelrc()),
    // istanbul({
    //   exclude: ['test/**/*', 'node_modules/**/*']
    // }),
    include({ external: [], paths: [ 'node_modules/**' ] }),
    globals(),
    builtins(),
    // npm({
    //   main: true
    // }),
    commonjs({
      include: 'node_modules/**'
    }),
    nodeResolve({
      // use "module" field for ES6 module if possible
      module: true, // Default: true

      // use "jsnext:main" if possible
      // – see https://github.com/rollup/rollup/wiki/jsnext:main
      // jsnext: true,  // Default: false

      // – see https://github.com/rollup/rollup-plugin-commonjs
      main: true,  // Default: true

      // browser: true,  // Default: false

      // not all files you want to resolve are .js files
      extensions: [ '.js', '.json' ]  // Default: ['.js']

      // preferBuiltins: false  // Default: true

    })
  ],
  external: external,
  targets: [
    {
      dest: 'dist/uportlib.js',
      format: 'umd',
      moduleName: 'rollupStarterProject',
      sourceMap: true
    },
    {
      dest: pkg['jsnext:main'],
      format: 'es',
      sourceMap: true
    }
  ]
};
