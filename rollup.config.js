import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

let pkg = require('./package.json');

export default {
  entry: 'lib/index.js',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel(babelrc()),
  ],
  targets: [
    {
      dest: pkg['main'],
      format: 'umd',
      moduleName: 'BDSSpeechSynthesizer',
      sourceMap: false
    }
  ]
};
