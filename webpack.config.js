module.exports = {
    entry: "./src/AzSearch.tsx",
    output: {
        filename: "AzSearch.bundle.js",
        path: __dirname + "/dist",
        library: 'AzSearch',
        libraryTarget: "umd"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "redux": "Redux"
    },
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ],
    },
};