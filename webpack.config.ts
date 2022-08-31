import { join } from 'path';
import { Configuration, BannerPlugin } from 'webpack';
//@ts-ignore
import { version } from './package.json';
const isDevelopment = process.env.NODE_ENV === 'development'

const config: (env: any, argv: any) => Configuration = function (env, argv) {
  return {
    // mode: undefined/*  node-env会覆盖mode */
    target: 'web',
    entry: {
      simple: isDevelopment ? './example/index.ts' : './src/index.ts',
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name].min.js',
      library: {
        // export: 'default',
        name: 'simple',
        type: 'umd',
        umdNamedDefine: true,
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
        banner: `simple2k13.js <cw cw2k13@gmail.com> version：${version}`
      })
    ]
  }
}
export default config;