import { Configuration } from 'webpack';

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
      extensions: ['.ts', '.js']
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
    plugins: []
  }
}
export default config;