function myNew() {
    const newObj = Object.create(null);
    // 获取参数的第一位
    const constructor = Array.prototype.slice.call(arguments)
    const result = null
    // 判断是不是函数
    if(typeof constructor !== 'function') {
        console.error('type error');
        return;
    }
    // 创建一个空对象，对象原型为构造函数的 prototype 对象
    newObj.__proto__ = constructor.prototype
    // 将 this 指向新建对象并调用
    result = constructor.apply(newObj, arguments)
    // 返回对象
    return result instanceof Object ? result : newObj;
}