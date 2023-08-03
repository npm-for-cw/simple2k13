import { join } from 'path';
import { Configuration, BannerPlugin } from 'webpack';
//@ts-ignore
import { version } from './package.json';
import HtmlWebpackPlugin from 'html-webpack-plugin'

const isDevelopment = process.env.NODE_ENV === 'development'

const config: (env: any, argv: any) => Configuration = function (env, argv) {
  return {
    // mode: undefined/*  node-env会覆盖mode */
    target: 'web',
    entry: {
      simple: isDevelopment ? './example/index.ts' : './src/index.ts',
    },
    devtool: 'source-map',
    output: {
      path: __dirname + '/dist',
      filename: '[name].min.js',
      library: {
        export: 'default',
        name: 'simple',
        type: 'umd',
        umdNamedDefine: true,
      },
      environment: {
        // // The environment supports arrow functions ('() => { ... }').
        arrowFunction: false,
        // // The environment supports BigInt as literal (123n).
        // bigIntLiteral: false,
        // // The environment supports const and let for variable declarations.
        // const: true,
        // // The environment supports destructuring ('{ a, b } = obj').
        // destructuring: true,
        // // The environment supports an async import() function to import EcmaScript modules.
        // dynamicImport: false,
        // // The environment supports 'for of' iteration ('for (const x of array) { ... }').
        // forOf: true,
        // // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
        // module: false,
        // // The environment supports optional chaining ('obj?.a' or 'obj?.()').
        // optionalChaining: true,
        // // The environment supports template literals.
        // templateLiteral: true,
      },
      clean: true
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@src': join(__dirname, 'src'),
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ]
    },
    plugins: [
      new BannerPlugin({
        banner: `simple2k13.js <cw cw2k13as@gmail.com> version：${version}`
      }),
      isDevelopment ? new HtmlWebpackPlugin({
        template: './example/index.html',
        scriptLoading: 'blocking'
      }) : () => { }
    ]
  }
}
export default config;