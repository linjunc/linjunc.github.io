// JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出
// class Scheduler {
//     // 允许同时执行的任务个数
//     concurrency = 2
//     // 当前 正在执行的任务个数
//     running = 0
//     // 任务队列
//     queue = new Set()

//     add(promiseCreator) {
//         if (this.queue.size >= this.concurrency) {
//             // 如果正在执行任务大于允许执行的任务，先存入任务队列，等待调度
//             const queueList = []
//             this.queue.forEach(item => queueList.push(item))
//             // promise 等待队列，通过 race
//             return Promise.race(queueList)
//                 .finally(() => {
//                     this.add(promiseCreator)
//                 })
//         }else {
//             const promise = promiseCreator()
//             this.queue.add(promise)
//             // promise 执行完后 被销毁
//             promise.finally(() => {
//                 this.queue.delete(promise)
//             })
//             return promise
//         }
//     }
// }
class Scheduler {
    concurrency = 2
    running = 0
    queue = []
    // 收集任务 注册调度任务
    add(task) {
        return new Promise(resolve => {
            this.queue.push({
                taskGenerator: task,
                resolve
            })
            this.schedule()
        })
    }
    // 异步调度
    schedule() {
        // 满足条件开始执行任务
        while (this.queue.length > 0 && this.running < this.concurrency) {
            // 队列中的第一个 开始执行
            const curTask = this.queue.shift()
            this.running += 1
            // 调用 promise 回调，微任务
            curTask.taskGenerator().then(result => {
                // 返回 
                this.running -= 1
                curTask.resolve(result)
                // 继续调度
                this.schedule()
            })
        }
    }
}
const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
})

const scheduler = new Scheduler()

const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')