const typeOf = (obj) => {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

// test

console.log(typeOf([])) // 'array'
console.log(typeOf({})) // 'object'