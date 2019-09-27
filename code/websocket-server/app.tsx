
//导入nodejs-websocket 包
const ws1 = require("nodejs-websocket");

const PORT1 = 3000;//3000端口

//创建一个server
//如何处理请求
//每次只要有用户连接，create函数就会执行一次，就会为当前用户创建一个connect对象
const server1 = ws1.createServer(connect => {
    console.log("有用户连接上来了");
    //每当接受到用户传递过来的数据，这个text事件就会被触发；
    connect.on("text", data => {
        console.log("接受到用户的数据", data);
        //给用户返回一个响应的数据，方法：sendText or send
        connect.send(data.toUpperCase() + "!!"); 


    });

    //只要websocket连接断开了，close事件就会触发
    connect.on("close", () => {
        console.log("连接断开了");
    })

    //注册close事件是，要注册error事件，因为close时，会报错
    connect.on("error", () => {
        console.log("连接异常");
    })
})

server1.listen(PORT1, () => {
    console.log("websocket 启动成功！")
})