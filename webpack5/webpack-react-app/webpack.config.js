const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const ruleForStyles = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
}

const ruleForJavaScript = {
    test: /\.js$/,
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic' // 'classic'
                }
            ]
        ]
    }
}

const rules = [
    ruleForJavaScript,
    ruleForStyles
]

module.exports = (env, argv) => {
    const {mode} = argv
    const isProduction = mode === 'production'

    return {
        // entry: './src/index.js',
        output: {
            filename: isProduction ? '[name].[contenthash].js' : 'main.js',
            path: path.resolve(__dirname, 'build')
        },
        plugins: [
            new HtmlWebpackPlugin({ template: 'src/index.html' })
        ],
        module: { rules },
        devServer: {
            open: true, // abre el navegador
            port: 3000,
            compress: true
        },
        devtool: 'source-map'
    }
}