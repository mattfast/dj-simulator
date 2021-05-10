const path = require('path');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const buildPath = './build/';

module.exports = {
    entry: ['./src/app.js'],
    output: {
        path: path.join(__dirname, buildPath),
        filename: '[name].[hash].js',
        publicPath: `/${pkg.repository}/`,
    },
    target: 'web',
    devtool: 'source-map',
    /*stats: {
        warnings: false
    },*/
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: path.resolve(__dirname, './node_modules/'),
            },
            {
                test: /\.(jpe?g|png|gif|svg|tga|gltf|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg|bin)$/i,
                use: 'file-loader',
                exclude: path.resolve(__dirname, './node_modules/'),
            },
            {
                test: /\.(vert|frag|glsl|shader|txt)$/i,
                use: 'raw-loader',
                exclude: path.resolve(__dirname, './node_modules/'),
            },
            {
                type: 'javascript/auto',
                test: /\.(json)/,
                exclude: path.resolve(__dirname, './node_modules/'),
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            lights$: path.resolve(__dirname, 'src/components/lights'),
            objects$: path.resolve(__dirname, 'src/components/objects'),
            scenes$: path.resolve(__dirname, 'src/components/scenes'),
            audio$: path.resolve(__dirname, 'src/components/audio'),
            textures$: path.resolve(__dirname, 'src/components/textures')
        },
    },
    plugins: [
        new HtmlWebpackPlugin({ title: pkg.title, favicon: 'src/favicon.ico' }),
        new CopyPlugin([
            {
                from: './node_modules/three/examples/fonts/helvetiker_regular.typeface.json',
                to: 'helvetiker_regular.typeface.json'
            },
        ]),
    ],
};
