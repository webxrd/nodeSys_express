const path = require('path');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const jwt = require(path.join(__dirname,'tools/jwt'));
let api = require('./api/index');
// 设置静态资源目录
app.use(express.static(path.join(__dirname,'public')));
// 中间件，设置响应头
app.all('*',function (request,response,next) {
    console.log('request.headers');
    console.log(request.headers);
    console.log('request.url');
    console.log(request.url);
    console.log('request.body');
    console.log(request.body);
    response.header("Access-Control-Allow-Origin", "http://localhost:63341");//允许访问本服务器的地址
    response.header("Access-Control-Allow-Credentials", "true");
    // result.header("Access-Control-Allow-Origin", "*");//允许访问本服务器的地址
    response.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");//允许访问本服务器的请求头
    response.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");//允许访问本服务器的请求方法
    response.header("X-Powered-By",' 3.2.1');//x - power - by是HTTP响应头之一。X表示标头是扩展标头，即，不符合HTTP标准d。power - by:告诉HTTP客户机请求/响应是由哪个引擎处理的。
    response.header("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");

    if (request.headers.origin === 'http://localhost:63341') {
        if (request.session.uName) {
            console.log(request.session.uName);
        }else {
            request.session.uName = 'aaaaaaaaaaaaaaaaaa';
        }
        next()
    }
});

console.log('api____api____api____api____api____api____');
console.log(api);
// // 遍历添加接口
for (let file of api) {
    for (let method in file) {
        let funList = file[method];// 接口数组
        for (let objItem of funList) {// objItem每条接口对象，包含path和fun
            app[method](objItem.path, objItem.fun);
        }
    }
}

app.post('/login',function (req,res) {
    console.log('login_____req.body');
    console.log(req.body);
    var token = jwt.encrypt({username:'abc'},'120');
    res.json({code:200,data:{permissions:[1,2,3],role:1,token:token,uid:1}});
});
app.on('error',function (err) {
    console.log('app.on___error');
    console.log(err);
});
// 监听app服务开启。只执行一次
app.listen(5000,function (err) {
    if (err){
        console.log('连接5000失败！');
        throw err
    }
    console.log('连接成功！http://127.0.0.1:5000')
});