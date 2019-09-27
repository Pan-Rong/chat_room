//导入nodejs-websocket 包
const ws3 = require("nodejs-websocket");

const PORT3 = 3000;//3000端口

//创建一个server
//如何处理请求
//每次只要有用户连接，create函数就会执行一次，就会为当前用户创建一个connect对象

/*
    分析：
    消息应该是个对象
    type:消息的类型： 0：表示进入聊天室的消息；
    1：表示用户离开聊天室的消息
    2： 正常聊天的消息
    msg: 消息的内容
    time: 聊天的具体事件
*/
let TYPE_ENTER = 1;
let TYPE_LEAVE = 2;
let TYPE_NORMAL = 3;

let count3 = 0;
const server3 = ws3.createServer(connect => {
    console.log("有用户连接上来了");

    count3++;
    connect.username = `用户${count3}`;

    broadcast3({
        type: TYPE_ENTER,
        msg: `${connect.username}进入了聊天室`,
        time: new Date().toLocaleTimeString()
    });

    //每当接受到用户传递过来的数据，这个text事件就会被触发；
    connect.on("text", data => {
        console.log("接受到用户的数据", data);
        //给用户返回一个响应的数据，方法：sendText or send
        // connect.send(data.toUpperCase() + "!!"); //connect.send给当前用户发消息；
        broadcast3({
            type: TYPE_NORMAL,
            msg: data,
            time: new Date().toLocaleTimeString()
        });

    });

    //只要websocket连接断开了，close事件就会触发
    connect.on("close", () => {
        console.log("连接断开了");
        count3--;
        broadcast3({
            type: TYPE_LEAVE,
            msg: `${connect.username}离开了聊天室`,
            time: new Date().toLocaleTimeString()
        })
    })

    //注册close事件是，要注册error事件，因为close时，会报错
    connect.on("error", () => {
        console.log("连接异常");
    })
})


//定义一个广播函数， 给所有的用户发送消息
function broadcast3 (msg) {
    //server3.connections; //表示所有的用户
    server3.connections.forEach(item => {
        item.send(JSON.stringify(msg));
    })
}


server3.listen(PORT3, () => {
    console.log("websocket 启动成功！")
})