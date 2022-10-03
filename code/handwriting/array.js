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

function flatDeep(arr, d = 1) {
    return d > 0
        ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
        : arr.slice()
}

const arr = [1, [2, [3, 4, 5]]]

console.log(flatten(arr));