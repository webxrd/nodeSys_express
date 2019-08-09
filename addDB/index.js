const MongoClient = require("mongodb").MongoClient;
const dbURL = 'mongodb://127.0.0.1:27017/';
const dbAll = require('./图片/imgAll');
console.log(dbAll.length);
let dbName = 'imgdb';// 数据库名字
MongoClient.connect(dbURL,{useNewUrlParser: true},function(err,client){
    if(err){
        console.log('数据库连接失败！');
        throw err;
    }else{
        console.log('数据库连接成功！');
    }
    const db = client.db(dbName);// 用户管理，数据库
    let proArr = [];// Promise数组
    for (let colData of dbAll) {
        proArr.push(insetPromise(db, colData));
    }
    Promise.all(proArr).then((res)=>{
        console.log('所有的集合已经全部插入在：' + dbName + '数据库');
        console.log(res);
        client.close();// 关闭连接
    }).catch((err)=>{
        console.log('Promise.all打印错误');
        console.log(err);
        client.close();// 关闭连接
    });
    // 关闭数据库和客户端
});
function insetPromise(db, colData) {
    return new Promise(function (resolve, reject) {
        let colName = colData.colName;// 集合名字
        let col = db.collection(colName);// 集合
        col.insertMany(colData.list,function (err,data) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            console.log('本次在'+colName+'插入'+data.insertedCount+'个对象');
            resolve({colName:colName, count: data.insertedCount});// 返回成功的集合名和里面数据个数
        });
    })
}