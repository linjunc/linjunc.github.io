class MyPromise {
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED = 'rejected'

    constructor(func) {
        this.PromiseState = MyPromise.PENDING
        /** resolve reject 的传参 */
        this.PromiseResult = null
        func(this.resolve.bind(this), this.reject.bind(this))
    }

    resolve(result) {
        if (this.PromiseState === MyPromise.PENDING) {
            this.PromiseState = MyPromise.FULFILLED
            this.PromiseResult = result
        }
    }
    reject(reason) {
        if (this.PromiseState === MyPromise.PENDING) {
            this.PromiseState = MyPromise.REJECTED
            this.PromiseResult = reason
        }
    }
    then(onFulfilled, onRejected) {
        if (this.PromiseState === MyPromise.FULFILLED) {
            onFulfilled(this.PromiseResult)
        }
        if (this.PromiseState === MyPromise.REJECTED) {
            onRejected(this.PromiseResult)
        }
    }
}
const promise1 = new MyPromise((resolve, reject) => {
    resolve('这次一定')
    reject('下次一定')
})
promise1.then(
    result => {
        console.log(result)
    },
    reason => {
        console.log(reason.message)
    }
)
