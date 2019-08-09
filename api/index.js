
var fs = require('fs');
var files = fs.readdirSync(__dirname + '/api_all');

// 过滤出.js文件:
var js_files = files.filter((f)=>{
    return f.endsWith('.js');
});
let arr = [];// 所有require来的api数组
for (let file of js_files) {
    let fileObj = require('./api_all/' + file);
    arr.push(fileObj);
}
module.exports = arr;