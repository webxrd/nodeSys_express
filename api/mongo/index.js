/* 数据库出口——包含了所有集合 */
const col_liqiu = require('./img_col_js/col_liqiu');// 立秋
const col_qixi = require('./img_col_js/col_qixi');//七夕
const col_zhuangshihua = require('./img_col_js/col_zhuangshihua');// 装饰画
const col_huace = require('./img_col_js/col_huace');// 画册

const db = {
    col_liqiu,
    col_qixi,
    col_zhuangshihua,
    col_huace
};
module.exports = db;

