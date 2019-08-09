const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/imgdb',{ useNewUrlParser: true });
const Schema = mongoose.Schema;// 获取 Schema模式构造函数
const model = mongoose.model;// 获取 model模型构造函数
// 构造mode模型实例，相当于collection集合。此实例可以调用find/insert/remove/update
module.exports = {Schema,model};


