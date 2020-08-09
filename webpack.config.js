const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextWebpackPlugin=require('extract-text-webpack-plugin');
const PurifyCSSPlugin=require('purifycss-webpack');
const glob=require('glob');
const CopyWebpackPlugin=require('copy-webpack-plugin');

module.exports={
    mode:'development',     //开发环境 production生产环境
    entry:{
        index:'./src/index.js',     //要打包的文件的路径
        index2:'./src/index2.js'
    },
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'[name]'.js,
        publicPath:'http://127.0.0.1:8080'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                // use:['style-loader','css-loader']
                use:ExtractTextWebpackPlugin.extract({
                    fallback:'style-loader',
                    use:[{
                        loader:'css-loader',
                        options:{importLoader:1}
                    },"postcss-loader"]
                })
            },{
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:500,
                            outputPath:'img/'
                        }
                    }
                ]
            },{
                test:/\.(htm|html)$/,
                loader:'html-withimg-loader'
            },{
                test:/\.scss$/,
                // use:['style-loader','css-loader','sass-loader']
                use:ExtractTextWebpackPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader']
                })
            },{
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            'env','react'
                        ]
                    }
                },
                exclude:/node_modules/
            }
        ]
    },
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
        // new HtmlWebpackPlugin({
        //     filename:'index2.html',
        //     chunks:['index2'],
        //     title:'index2--title',
        //     minify:{
        //         removeAttributeQuotes:true, //是否移除属性中的双引号
        //         collapseWhitespace:true,    //是否折叠空白
        //     },
        //     hash:true,  //哈希值
        //     template:'./src/index2.html'     //要打包的文件
        // })
        new ExtractTextWebpackPlugin('css/index.css'),
        new PurifyCSSPlugin({
            paths:glob.sync(path.join(__dirname,'src/*.html')),
        }),
        // 注释打包
        new webpack.BannerPlugin('注释打包'),
        // 不需要导入jquery库就可以直接使用jquery 用即打包
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        new CopyWebpackPlugin([{
            from:__dirname+'/src/public',
            to:'./public'
        }])
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