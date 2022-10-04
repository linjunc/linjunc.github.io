// 递归
// function flatten(arr) {
//     let result = [];
//     for(let i = 0; i < arr.length; i++) {
//         if(Array.isArray(arr[i])) {
//             result = result.concat(flatten(arr[i]));
//         }else {
//             result.push(arr[i]);
//         }
//     }
//     return result;
// }

// 迭代
// function flatten(arr) {
//     return arr.reduce((prev, next) => {
//         return prev.concat(Array.isArray(next) ? flatten(next) : next);
//     }, []);
// }

// 扩展运算符
// function flatten(arr) {
//     while(arr.some(item => Array.isArray(item)) {
//         arr = [].concat(...arr)
//     }
// }

// split toString
// function flatten(arr) {
//     return arr.toString().split(',')
// }

// flat
function flatten(arr) {
    return arr.flat(Infinity)
}

// 可选层数

// function flatDeep(arr, d = 1) {
//     return d > 0
//         ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
//         : arr.slice()
// }

function flat(arr, depth) {
    if (!arr || depth < 0) return arr;
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flat(next, depth - 1) : next)
    }, [])
}

const arr = [1, [2, [3, [4, 5, [6]], 5]]]

console.log(flat(arr));


// 数组去重

function distinct(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] === arr[i]) {
                arr.splice(j, 1)
                j--; // 数组长度变了
            }
        }
    }
    return arr;
}

// filter 和 indexOf
function distinct(a, b) {
    const arr = a.concat(b)
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index;
    })
}

// Set
const array = [1, 2, 2, 3, 1]
const res = [...new Set(array)];

// Map
function uniqueArray(arr) {
    const map = new Map()
    const res = []
    for (let i = 0; i < arr.length; i++) {
        if (!map.get(arr[i])) {
            res.push(arr[i])
            map.set(arr[i], true)
        }
    }
    return res
}

// Object 对象
function distinct(arr) {
    const obj = {}
    return arr.filter(item =>
        obj.hasOwnProperty(typeof item + item)
            ? false
            : (obj[typeof item + item] = true) // 存储有的值
    )
}

// sort
function unique(arr) {
    arr = arr.sort()
    let pointer = 0
    while (arr[pointer]) {
        if (arr[pointer] != arr[pointer + 1]) { // 不相等，指针下移
            pointe++
        } else {
            arr.splice(pointer + 1, 1)
        }
    }
    return arr
}

// flat

// function flat(arr, depth) {
//     if(!arr || depth < 0) return arr;
//     return arr.reduce((prev, next) => {
//         return prev.concat(Array.isArray(next) ? flat(next, depth - 1) : next)
//     })
// }


// push

Array.prototype.push = function () {
    for (let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length // 返回长度
}

// filter

Array.prototype.filter = function (fn) {
    if (typeof fn !== 'function') {
        console.error('type Error')
    }
    const res = []
    for (let i = 0; i < this.length; i++) {
        fn(this[i] && res.push(this[i]))
    }
    return res
}

// map

Array.prototype.map = function (cb, context) {
    const arr = Array.prototype.slice.call(this)
    const res = []
    for (let i = 0; i < arr.length; i++) {
        res.push(cb.call(context, arr[i], i, this))
    }
    return res
}

const fun = () => {
    for (let i = 0; i < arr.length; i++) {
        if (n % i == 0) {
            return
        }
    }
    printf('')
}