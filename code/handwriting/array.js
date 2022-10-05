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
    if (!arr || depth < 0) return arr
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flat(next, depth - 1) : next)
    }, [])
}

const arr = [1, [2, [3, [4, 5, [6]], 5]]]

console.log(flat(arr))


// 数组去重

function distinct(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] === arr[i]) {
                arr.splice(j, 1)
                j-- // 数组长度变了
            }
        }
    }
    return arr
}

// filter 和 indexOf
function distinct(a, b) {
    const arr = a.concat(b)
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index
    })
}

// Set
const array = [1, 2, 2, 3, 1]
const res = [...new Set(array)]

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
        this[this.length] = arguments[i]
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

// reduce

Array.prototype.myReduce = function (fn, initVal) {
    let result = initVal, i = 0
    if (typeof initVal === 'undefined') {
        result = this[i]
        i++
    }
    // this 是一个数组
    while (i < this.length) {
        result = fn(result, this[i])
    }
    return result
}

// splice
const sliceDeleteElements = (array, startIndex, deleteCount, deleteArr) => {
    for (let i = 0; i < deleteCount; i++) {
        const index = startIndex + i
        if (index in array) {
            let current = array[index]
            deleteArr[i] = current
        }
    }
}

const movePostElements = (array, startIndex, len, deleteCount, addElements) => {
    if (deleteCount === addElements.length) {
        return
    } else if (deleteCount > addElements.length) {
        // 删除的元素比新增的元素多，那么后面的元素整体向前挪动
        // 一共需要挪动 len - startIndex - deleteCount 个元素
        for (let i = startIndex + deleteCount; i < len; i++) {
            let fromIndex = i
            let toIndex = i - (deleteCount - addElements.length) // 目标位置
            if (fromIndex in array) {
                array[toIndex] = array[fromIndex]
            } else {
                delete array[toIndex]
            }
        }
        // 注意注意！这里我们把后面的元素向前挪，相当于数组长度减小了，需要删除冗余元素
        // 目前长度为 len + addElements - deleteCount
        for (let i = len - 1; i >= len + addElements.length - deleteCount; i--) {
            delete array[i]
        }
    } else if (deleteCount < addElements.length) {
        // 删除的元素比新增的元素少，那么后面的元素整体向后挪动
        for (let i = len - 1; i >= startIndex + deleteCount; i--) {
            let fromIndex = i
            let toIndex = i + (addElements.length - deleteCount)
            if (fromIndex in array) {
                array[toIndex] = array[fromIndex]
            } else {
                delete array[toIndex]
            }
        }
    }
}


const computeStartIndex = (startIndex, len) => {
    // 处理索引负数的情况
    if (startIndex < 0) {
        return startIndex + len > 0 ? startIndex + len : 0
    }
    return startIndex >= len ? len : startIndex
}

const computeDeleteCount = (startIndex, len, deleteCount, argumentsLen) => {
    // 删除数目没有传，默认删除startIndex及后面所有的
    if (argumentsLen === 1)
        return len - startIndex
    // 删除数目过小
    if (deleteCount < 0)
        return 0
    // 删除数目过大
    if (deleteCount > len - deleteCount)
        return len - startIndex
    return deleteCount
}


Array.prototype._splice = function (start, deleteCount, ...addElements) {
    const argumentsLen = arguments.length
    const array = Object(this)
    const len = array.length
    const deleteArr = new Array(deleteCount) // 删除的数组，也就是要返回的东西

    startIndex = computeStartIndex(start, len)
    deleteCount = computeDeleteCount(startIndex, len, deleteCount, argumentsLen)


    // 判断 sealed 对象和 frozen 对象, 即 密封对象 和 冻结对象
    if (Object.isSealed(array) && deleteCount !== addElements.length) {
        throw new TypeError('the object is a sealed Object')
    } else if (Object.isFrozen(array) && (deleteCount > 0 || addElements.length > 0)) {
        throw new TypeError('the object is frozen object')
    }

    // 拷贝删除的元素
    sliceDeleteElements(array, startIndex, deleteCount, deleteArr)
    // 移动删除元素后面的元素
    movePostElements(array, startIndex, len, deleteCount, addElements)
    // 插入新元素
    for (let i = 0; i < addElements.length; i++) {
        array[startIndex + i] = addElements[i]
    }

    array.length = len - deleteCount + addElements.length

    return deleteArr
}

// String

function sIndexOf(str, searchStr, fromIndex = 0) {
    const regex = new RegExp(`${searchStr}`, 'ig');
    regex.lastIndex = fromIndex
    const result = regex.exec(str)
    return result ? result.index : -1
}

function aIndexOf(arr, elem, fromIndex = 0) {
    if(!elem) return -1
    for(let i = fromIndex; i < arr.length; i++) {
        if(arr[i] === elem) return i
    }
    return -1
}

function indexOf(items, elem, fromIndex = 0) {
    const isArray = Array.isArray(items)
    const isString = Object.prototype.toString.call(items) === '[object String]'
    if(!isArray && !isString) throw new SyntaxError()
    if(isArray) return aIndexOf(items, elem, fromIndex)
    return sIndexOf(items, elem, fromIndex) 
}

/* *
 * 1.计算多个区间的交集
 *   区间用长度为2的数字数组表示，如[2, 5]表示区间2到5（包括2和5）；
 *   区间不限定方向，如[5, 2]等同于[2, 5]；
 *   实现`getIntersection 函数`
 *   可接收多个区间，并返回所有区间的交集（用区间表示），如空集用null表示
 * 示例：
 *   getIntersection([5, 2], [4, 9], [3, 6]); // [4, 5]
 *   getIntersection([1, 7], [8, 9]); // null
 */

function getIntersection(...arr) {
    if(!arr || !arr.length) return null;
    // 排序数组
    arr.forEach(item => {
        item.sort((a, b) => a - b)
    })
    // 排序数组的数组
    arr.sort((a, b) => a[0] - b[0])
    const res = [...arr[0]]
    for(let i = 1; i < arr.length; i++) {
        if(res[1] < arr[i][0]) return null

        if(res[0] <= arr[i][0]) {
            res[0] = Math.max(res[0], arr[i][0])
            res[1] = Math.min(res[1], arr[i][1])
        }
    }
    return res;
}
// console.log(getIntersection([5, 2], [4, 9], [3, 6]));
// console.log(getIntersection([1, 7], [8, 9]));


const a = [1, 2, 3, 4, 5];
const b = [2, 4, 6, 8, 10];
// 交集
const c = a.filter(v => b.indexOf(v) > -1)
// 差集
const d = a.filter(v => !b.includes(v))
// 补集
const e = a.filter(v => !b.includes(v)).concat(b.filter(v => !a.includes(v)))
// 并集
const f = a.concat(b.filter(v => !a.includes(v)))

console.log(c, d, e, f);

const t = new Array(100).fill(1).map((_, k) => k + 1)
const y = Array.from(new Array(100), (_, k) => k + 1)