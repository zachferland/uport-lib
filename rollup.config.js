import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import filesize from 'rollup-plugin-filesize';

export default {
  entry: 'src/index.js',
  dest: 'dist/uportlib.js',
  format: 'umd',
  moduleName: 'uportlib',
  sourceMap: true,
  plugins: [
    nodeResolve({
        module: true,
        jsnext: true,
        browser: true,
        main: true,
        extensions: [ '.js', '.json' ],
        preferBuiltins: false
    }),
    commonjs(
      {
      namedExports: {
        'node_modules/events/events.js': [ 'EventEmitter' ],
      }
    }
  ),
    babel({
      exclude: 'node_modules/**'
    }),
    builtins(),
    globals(),
    json(),
    filesize()
  ],
};
