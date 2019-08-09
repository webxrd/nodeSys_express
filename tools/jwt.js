const jwt = require('jsonwebtoken');

const tools = {
    // 获取当前时间，格式2019-07-21T16:26:33
    getTime() {
        let date = new Date();
        let year = date.getFullYear().toString();// 年
        year = year.length === 1 ? "0" + year : year;
        let month = (date.getMonth() + 1).toString();// 月
        month = month.length === 1 ? "0" + month : month;
        let day = date.getDate().toString();// 日
        day = day.length === 1 ? "0" + day : day;
        let hours = date.getHours().toString();// 时
        hours = hours.length === 1 ? "0" + hours : hours;
        let minutes = date.getMinutes().toString();// 分
        minutes = minutes.length === 1 ? "0" + minutes : minutes;
        let seconds = date.getSeconds().toString();// 秒
        seconds = seconds.length === 1 ? "0" + seconds : seconds;
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
    },
    // 判断str是否时图片后缀
    isImg(str) {
        var regs = [/jpg/i, /jpeg/i, /png/i, /gif/i];
        let flag = true;
        for (let i in regs) {
            if (regs[i].test(str)) {
                flag = true;
                break;
            }
        }
        return flag;
    },
    // 返回Token
    encrypt: function (data, time) { //data加密数据，time过期时间
        return jwt.sign(data, 'myToken', {expiresIn: time})
    },
    // 解析Token
    decrypt: function (token) {
        try {
            let data = jwt.verify(token, 'myToken');
            return {
                token: true,
                username: data.username
            };
        } catch (e) {
            return {
                token: false,
                data: e
            }
        }
    }
};

module.exports = tools;