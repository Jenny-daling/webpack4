const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
    mode:'development',     //开发环境 production生产环境
    entry:{
        index:'./src/index.js',     //要打包的文件的路径
        index2:'./src/index2.js'
    },
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'[name]'.js
    },
    module:{},
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename:'index1.html',
            chunks:['index'],
            title:'index1--title',
            minify:{
                removeAttributeQuotes:true, //是否移除属性中的双引号
                collapseWhitespace:true,    //是否折叠空白
            },
            hash:true,  //哈希值
            template:'./src/index1.html'     //要打包的文件
        }),
        new HtmlWebpackPlugin({
            filename:'index2.html',
            chunks:['index2'],
            title:'index2--title',
            minify:{
                removeAttributeQuotes:true, //是否移除属性中的双引号
                collapseWhitespace:true,    //是否折叠空白
            },
            hash:true,  //哈希值
            template:'./src/index2.html'     //要打包的文件
        })
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'./dist'),
        host:'127.0.0.1',
        port:'8081',
        compress:true,
        open:true,
        hot:true
    }

};