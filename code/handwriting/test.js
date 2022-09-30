// 去重
// function unique(arr) {
//     return arr.filter((item, index, array) => array.indexOf(item) === index)
// }

// console.log(unique([1, 2, 1, 3, 4]))

// const unique = arr => [...new Set(arr)]

// 扁平化
// const arr = [1, [2, [3]]]

// console.log(arr.flat(2)) // [ 1, 2, 3 ]

// function flatten (arr) {
//     let result = []
//     const len = arr.length
//     for(let i = 0; i < len; i++) {
//         if(Array.isArray(arr[i])) {
//             result = result.concat(flatten(arr[i]));
//         }else {
//             result.push(arr[i]);
//         }
//     }
//     return result
// }

// function flatten (arr) {
//     while(arr.some(item => Array.isArray(item))) {
//         arr = [].concat(...arr);
//     }
//     return arr;
// }
// console.log(flatten(arr))

// 浅拷贝
// function shallowCopy (obj) {
//     if(obj !== 'object') return
//     const newObj = obj instanceof Array ? [] : {}

//     for(const key in obj) {
//         if(obj.hasOwnProperty(key)) {
//             newObj[key] = obj[key]
//         }
//     }
//     return newObj
// }

// 深拷贝

// function deepClone(obj) {
//     if(typeof obj !== 'object') return
//     const newObj = obj instanceof Array ? [] : {}
//     for(const key in obj) {
//         if(obj.hasOwnProperty(key)) {
//             newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
//         }
//     }
// }

// 2.0
function deepClone(target, hash = new WeakMap()) {
    if(target === null) return target
    if(target instanceof Date) return new Date(target)
    if(target instanceof RegExp) return new RegExp(target)
    if(target instanceof HTMLElement) return target
    if(typeof target !== 'object') return target

    if(hash.get(target)) return hash.get(target)
    const cloneTarget = new target.constructor()
    hash.set(target, cloneTarget)
    Reflect.ownKeys(target).forEach(key => {
        cloneTarget[key] = deepClone(target[key], hash)
    })
    return cloneTarget
}
// 复杂版深克隆



// 模板字符串
function render(template, data) {
    const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
    if (reg.test(template)) { // 判断模板里是否有模板字符串
        const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
        template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
        return render(template, data); // 递归的渲染并返回渲染后的结构
    }
    return template; // 如果模板没有模板字符串直接返回
}
const template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
const person = {
    name: 'ljc',
    age: 21
}
console.log(render(template, person)); // 我是ljc，年龄21，性别undefined

// 柯里化
function curry(fn) {
    const judge = (...args) => {
        if(args.length === fn.length) return fn(...args);
        return (...arg) => judge(...args, ...arg)
    }
    return judge
}
function add(a, b, c) {
    return a + b + c
}
let addCurry = curry(add)
console.log(addCurry(1)(2)(3))


function myInstance(left, right) {
    // 获取对象原型
    let proto = Object.getPrototypeOf(left)
    while(true) {
        // 到原型链的尽头，返回 false
        if(!proto) return false;
        if(proto === right.prototype) return true;
        proto = Object.getPrototypeOf(proto)
    }
}

Object.myAssign = function(target, ...source) {
    if(target === null) {
        throw new TypeError("Error")
    }
    const res = Object(target)
    source.forEach((obj) => {
        if(obj !== null) {
            for(const key in obj) {
                if(obj.hasOwnProperty(key)) {
                    res[key] = obj[key]
                }
            }
        }
    })
    return res;
}