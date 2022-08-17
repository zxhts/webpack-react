const { isPlainObject, isFunction } = require('lodash');
const arr = [
    // codrova RN-H5 消息通道
  { className: 'CordovaMessageChannel', method: 'handleMessageFromRN' }, //设置回调
  { className: 'CordovaMessageChannel', method: 'remove' }, //删除回调，需要callbackId
  { className: 'CordovaMessageChannel', method: 'sendMessageToRN' }, //向通道发送消息

  // 获取常用信息
  { className: 'Config', method: 'getConfig' },
]


const res = arr.reduce((cordova, api) => {
    const { method, className } = api;
    cordova[className] = cordova[className] || {};
    cordova[className][method] = `this is ${className} ${method}`;
    return cordova
}, {})


// console.log(res);

const obj = {
  name: "111",
  age: 18,
  address: {
    aa: 'ww',
    bb: () => {'aa'}
  }
}

const foo = () => {
  this.a =1
}

console.log(isPlainObject(obj))
console.log(isPlainObject(foo))







