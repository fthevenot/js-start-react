import webpack from "webpack"
import path from "path"

export default {
    debug: true, // Show debug information
    devtool: "cheap-module-eval-source-map", // Recommended value. See doc for more settings.
    noInfo: false, // Display a list of all the files being bundling.
    entry: [
        "eventsource-polyfill", // For hot reloading with IE.
        "webpack-hot-middleware/client", // Reload the entire web if hot reloading module fails.
        "./src/index" // This need to be specified on the last position of the array.
    ],
    target: "web",  // For web browser, not for node.
    output: {
        path: __dirname + "/dist",  // webpack is only working in memory and no files will be output here (this job is for the "npm run build" command)
        publicPath: "/",            // webpack need those settings to simulate the production behaviour.
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./src" // Source directory.
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // Enable replacement of modules without full reload.
        new webpack.NoErrorsPlugin() // Prevent errors from breaking the hot reloading and display error message on the browser.
    ],
    module: {
        loaders: [
            {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
            {test: /(\.css)$/, loaders: ['style', 'css']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    }
}