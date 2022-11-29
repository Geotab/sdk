const webpack = require('webpack');
const path = require('path');
const argv = require('yargs').argv;

const config = {
    entry: '/src/software/api/react-loader.jsx',
    devtool: 'source-map',
    mode: 'development',
    optimization: {
        minimize: false
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'software/api/runner-bundle.js'
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-react', '@babel/preset-env' ]
                    }
                }
            }
        ]
    }
};

if (argv?.prod || process.env.NODE_ENV === 'production') {
    config.optimization.minimize = true;
    config.mode = 'production';
    delete config.devtool;
}

module.exports = config;
