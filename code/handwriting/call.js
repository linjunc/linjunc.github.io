Function.prototype.myCall = function(context = window, ...args) {
    if(typeof this !== 'function') {
        console.log('type error');
    }
    // 把函数存入上下文中
    const key = Symbol('key');
    context[key] = this;
    // 然后调用函数 将返回值存起来
    const result = context[key](...args);
    delete context[key];
    return result;
}

Function.prototype.myApply = function(context = window, arr) {
    if(typeof this !== 'function') {
        console.log('type error');
    }
    // 把函数存入上下文中
    const key = Symbol('key');
    context[key] = this;
    // 然后调用函数 将返回值存起来
    const result = context[key](...arr);
    delete context[key];
    return result;
}

Function.prototype.myBind = function(context = window, ...outerArgs) {
    if(typeof this !== 'function') {
        console.error('typeError')
    }
    const _this = this
    return function fn(...innerArgs) { 
        const finalArgs = [...outerArgs, ...innerArgs]
        if(_this.prototype) {
            // 需要防止这个 prototype 的修改导致 self.prototype 被修改
            // 直接赋值写法会覆盖原型其他属性
            this.prototype = Object.create(_this.prototype);
            this.prototype.constructor = _this;
        }
        // 判断是不是被 new 出来的
        if(this instanceof Fn) {
            return new _this(...finalArgs)
        }
        return _this.apply(context, [...finalArgs]); // 返回改变了 this 的函数
     }
}