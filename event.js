// var events = require('events');

// var eventEmitter = new events.EventEmitter();

// eventEmitter.on('some_event', function(){
//     console.log('some_event occured.');
// });

// setTimeout(function(){
//     eventEmitter.emit('some_event');
// }, 1000);

// var events = require('events'); 
// var emitter = new events.EventEm
// itter(); 
// emitter.on('someEvent', function(arg1, arg2) { 
//     console.log('listener1', arg1, arg2); 
// }); 
// emitter.on('someEvent', function(arg1, arg2) { 
//  console.log('listener2', arg1, arg2); 
// }); 
// emitter.emit('someEvent', 'byvoid', 1991); 

// // 引入 events 模块
// var events = require('events');
// // 创建 eventEmitter 对象
// var eventEmitter = new events.EventEmitter();

// // 创建事件处理程序
// var connectHandler = function connected() {
//    console.log('连接成功。');
  
// //    // 触发 data_received 事件 
// //    eventEmitter.emit('data_received');
// }

// // 绑定 connection 事件处理程序
// eventEmitter.on('connection', connectHandler);
 
// // 使用匿名函数绑定 data_received 事件
// eventEmitter.on('data_received', function(){
//    console.log('数据接收成功。');
// });

// // 触发 connection 事件 
// eventEmitter.emit('connection');
// eventEmitter.emit('data_received');

// console.log("程序执行完毕。");


// //error事件
// var events = require('events'); 
// var emitter = new events.EventEmitter(); 
// emitter.on('error', function(){
//     console.log('错误')
// })
// emitter.emit('error'); 

// var fs = require("fs");
// var data = 'W3Cschool教程官网地址：www.w3cschool.cn';

// // 创建一个可以写入的流，写入到文件 output.txt 中
// var writerStream = fs.createWriteStream('output.txt');

// // 使用 utf8 编码写入数据
// writerStream.write(data,'UTF-8');

// // 标记文件末尾
// writerStream.end(function(){
//     console.log('no more data!')
// });

// // 处理流事件 --> data, end, and error
// writerStream.on('finish', function() {
//     console.log("写入完成。");
// });

// writerStream.on('error', function(err){
//    console.log(err.stack);
// });

// console.log("程序执行完毕");

var fs = require("fs");
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
  
console.log("文件压缩完成。");

var fs = require("fs");
var zlib = require('zlib');

// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));
  
console.log("文件解压完成。");