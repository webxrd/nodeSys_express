/*立秋*/
const {Schema, model} = require('../mongoose');// 引入数据库实例

let schema = new Schema({
    imgUrl: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
    link: {
        type: String,
        default: '',
    },
    list: {
        type: Array,
        default: '',
    },
});
let col = new model('Liqiu',schema,'liqiu');// 获取集合实例
module.exports = col;
