// function debounce(func, wait, immediate) {
//     let timeout, result;
//     const debounced = function() {
//         const context = this;
//         const args = arguments;
//         if(timeout) clearTimeout(timeout);
//         if(immediate) {
//             let callNow = !timeout 
//             timeout = setTimeout(function() {
//                 timeout = null;
//             }, wait);
//             if(callNow) result = func.apply(context, args);
//         }else {
//             timeout = setTimeout(function() {
//                 func.apply(context, args);
//             }, wait);
//         }
//         return result;
//     }
//     debounced.cancel = function() {
//         clearTimeout(timeout);
//         timeout = null;
//     }
//     return debounced;
// }

// const debounce = (fn, wait = 50) => {
//     let timer = null;
//     return function(...args) {
//         if(timer) {
//             clearTimeout(timer);
//             timer = null;
//         }
//         timer = setTimeout(() => {
//             fn.apply(this, args);
//         }, wait);
//     }
// }

// const throttle = (fn, wait = 50) => {
//     let lastTime = 0;
//     return function(...args) {
//         let now = +new Date() // 获取当前的时间戳
//         if(now - lastTime > wait) {
//             lastTime = now
//             fn.apply(this, args)
//         }
//     }
// }

// const throttle = (fn, wait = 50) => {
//     let timeout;
//     return function () {
//         context = this
//         args = arguments
//         if(!timeout) {
//             timeout = setTimeout(function() {
//                 timeout = null
//                 fn.apply(context, args)
//             }, wait)
//         }
//     }
// }

// 第四版
function throttle(func, wait, options = {}) {
    let timeout, context, args;
    let previous = 0;

    let later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    let throttled = function() {
        let now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 如果没有剩余的时间了或者你改了系统时间
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };
    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    }
    return throttled;
}
