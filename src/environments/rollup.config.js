const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const globals = require('rollup-plugin-node-globals');
const builtins = require('rollup-plugin-node-builtins');
const json = require('rollup-plugin-json');
const replace = require('rollup-plugin-post-replace');

const isProd  = (process.env.IONIC_ENV === 'prod');
console.log("is it prod?? ", isProd);

const rollupConfig = {

  entry: process.env.IONIC_APP_ENTRY_POINT,
  /**
   * sourceMap: If true, a separate sourcemap file will
   * be created.
   */
  sourceMap: process.env.IONIC_GENERATE_SOURCE_MAP ? true : false,

  /**
   * format: The format of the generated bundle
   */
  format: 'iife',

  /**
   * dest: the output filename for the bundle in the buildDir
   */
  dest: process.env.IONIC_OUTPUT_JS_FILE_NAME,

  useStrict: false,

  plugins: [
    builtins(),
    commonjs(),
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js']
    }),
    globals(),
    json(),
    replace({
      exclude: 'node_modules/**',
      values: {
        '/environments/environment.dev' : ( isProd ? '/environments/environment.prod' : '/environments/environment.dev'),
      }
    })]

};

module.exports = rollupConfig;
