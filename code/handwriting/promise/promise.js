class MyPromise {
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED = 'rejected'

    constructor(func) {
        this.PromiseState = MyPromise.PENDING
        /** resolve reject 的传参 */
        this.PromiseResult = null
        this.onFulfilledCallbacks = [] // 保存成功的回调
        this.onRejectedCallbacks = [] // 保存失败的回调
        try {
            func(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(result) {
        if (this.PromiseState === MyPromise.PENDING) {
            this.PromiseState = MyPromise.FULFILLED
            this.PromiseResult = result
        }
        // 在执行 resolve 的时候，逐个执行数组里的函数
        this.onFulfilledCallbacks.forEach(callback => {
            callback(result)
        })
    }
    reject(reason) {
        if (this.PromiseState === MyPromise.PENDING) {
            this.PromiseState = MyPromise.REJECTED
            this.PromiseResult = reason
        }
        // 在执行 reject 的时候，逐个执行数组里的函数
        this.onRejectedCallbacks.forEach(callback => {
            callback(reason)
        })
    }
    then(onFulfilled, onRejected) {
        const promise2 = new MyPromise((resolve, reject) => {
            if (this.PromiseState === MyPromise.FULFILLED) {
                setTimeout(() => {
                    try {
                        if (typeof onFulfilled !== 'function') {
                            //  2.2.7.3 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
                            resolve(this.PromiseResult)
                        } else {
                            let x = onFulfilled(this.PromiseResult)
                            resolvePromise(promise2, x, resolve, reject)
                        }
                    } catch (e) {
                        reject(e) // 捕获前面onFulfilled中抛出的异常
                    }
                })
            } else if (this.PromiseState === MyPromise.REJECTED) {
                setTimeout(() => {
                    try {
                        if (typeof onRejected !== 'function') {
                            // 2.2.7.4 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因
                            reject(this.PromiseResult)
                        } else {
                            let x = onRejected(this.PromiseResult)
                            resolvePromise(promise2, x, resolve, reject)
                        }
                    } catch (e) {
                        reject(e)
                    }
                })
                // 实现链式调用，还在 pending 的时候，暂时保存两个回调
            } else if (this.PromiseState === MyPromise.PENDING) {
                // 要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            if (typeof onFulfilled === 'function') {
                                //  2.2.7.3 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
                                resolve(onFulfilled)
                            } else {
                                let x = onFulfilled(this.PromiseResult)
                                resolvePromise(promise2, x, resolve, reject)
                            }
                        } catch (e) {
                            reject(e) // 捕获前面onFulfilled中抛出的异常
                        }
                    })
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            if (typeof onRejected === 'function') {
                                reject(this.PromiseResult)
                            } else {
                                let x = onRejected(this.PromiseResult)
                                resolvePromise(promise2, x, resolve, reject)
                            }
                        } catch (e) {
                            reject(e)
                        }

                    })
                })
            }
        })
        return promise2
    }
}


/**
 * 对resolve()、reject() 进行改造增强 针对resolve()和reject()中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled或onRejected的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        // 2.3.1 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
        throw new TypeError('Chaining cycle detected for promise')
    }
    if (x instanceof MyPromise) {
        // 2.3.2 如果 x 为 Promise ，则使 promise 接受 x 的状态
        x.then(y => {
            resolvePromise(promise2, y, resolve, reject)
        }, reject)
    } else if (x !== null && ((typeof x === 'object' || (typeof x === 'function')))) {
        // 2.3.3 如果 x 为对象或函数
        try {
            // 2.3.3.1 把 x.then 赋值给 then
            var then = x.then
        } catch (e) {
            // 2.3.3.2 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
            return reject(e)
        }

        /**
         * 2.3.3.3 
         * 如果 then 是函数，将 x 作为函数的作用域 this 调用之。
         * 传递两个回调函数作为参数，
         * 第一个参数叫做 `resolvePromise` ，第二个参数叫做 `rejectPromise`
         */
        if (typeof then === 'function') {
            // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            let called = false // 避免多次调用
            try {
                then.call(
                    x,
                    // 2.3.3.3.1 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
                    y => {
                        if (called) return
                        called = true
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    // 2.3.3.3.2 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                    r => {
                        if (called) return
                        called = true
                        reject(r)
                    }
                )
            } catch (e) {
                /**
                 * 2.3.3.3.4 如果调用 then 方法抛出了异常 e
                 * 2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
                 */
                if (called) return
                called = true

                /**
                 * 2.3.3.3.4.2 否则以 e 为据因拒绝 promise
                 */
                reject(e)
            }
        } else {
            // 2.3.3.4 如果 then 不是函数，以 x 为参数执行 promise
            resolve(x)
        }
    } else {
        // 2.3.4 如果 x 不为对象或者函数，以 x 为参数执行 promise
        return resolve(x)
    }
}
const promise = new Promise((resolve, reject) => {
    resolve(100)
})
const p1 = promise.then(value => {
    console.log(value)
    return p1
})
