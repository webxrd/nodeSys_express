let {col_zhuangshihua} = require("../mongo/index");

async function pro() {
    return new Promise(function (resolve, reject) {
        col_zhuangshihua.aggregate([
            {$limit: 5}
        ],function(err,doc){
            if(err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(doc);
            console.log(doc);// 返回最终查询到的数据
        })
    })
}
const api = {
    get:[
        {
            path: '/zhuangshihua',
            fun:async function (request, response) {
                let a = await pro();
                response.json(a)
            }
        }
    ],
    post:[
        {
            path:'/zhuangshihua',
            fun:async function (request, response) {
                response.response.body = {data:[
                        {'name':'abc',age:'314'},
                        {'name':'qwe',age:'222'},
                        {'name':'afd',age:'333'}
                    ]}
            }
        }
    ],
};
module.exports = api;
