// 原型链继承
// function Father() {
//     this.name = 'father' 
// }

// Father.prototype.say = () => {
//     console.log('I am Father')
// }

// function Son() {}

// Son.prototype = new Father()

// console.log(Son.prototype)

// 借助构造函数继承

// function Father() {
//     this.a = [1, 2, 3, 4]
// }

// function Son() {
//     Father.call(this)
// }
// let son1 = new Son()
// let son2 = new Son()
// son1.a.push(9)
// console.log(son1, son2)

// 组合继承

// function Father() {
//     this.a = [1, 2, 3, 4]
// }
// Father.prototype.say = function () {
//     console.log('I am Father')
// }

// function Son() {
//     Father.call(this)
// }
// Son.prototype = new Father()

// let son1 = new Son()
// let son2 = new Son()
// console.log(son1, son2)

// 寄生组合继承
function Father() {
    this.a = [1, 2, 3, 4]
}
Father.prototype.say = function () {
    console.log(111);
}
function Son() {
    Father.call(this)
}
Son.prototype = Object.create(Father)
let son1 = new Son()
let son2 = new Son()