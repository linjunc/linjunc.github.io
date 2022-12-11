const imgList = [...document.querySelectorAll('img')];
const length = imgList.length;

// const imgLazyLoad = (() => {
//     let count = 0;
//     return () => {
//         const deleteIndexList = [];
//         imgList.forEach((img, index) => {
//             const rect = img.getBoundingClientRect()
//             if(rect.top < window.innerHeight) {
//                 img.src = img.dataset.src
//                 deleteIndexList.push(index)
//                 count++;
//                 if(count === length) {
//                     document.removeEventListener('scroll', imgLazyLoad)
//                 }
//             }
//         })
//         imgList = imgList.filter((_, index) => !deleteIndexList.includes(index));
//     }
// })()

const imgLazyLoad = () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.intersectionRatio > 0) {
                entry.target.src = entry.target.dataset.src
                observer.unobserve(entry.target)
            }
        })
    })
    imgList.forEach(img => {
        observer.observe(img)
    })
}

function myNew (constructor, ...args) {
    const newObj = {}

    newObj.__proto__ = constructor.prototype
    const result = constructor.apply(newObj, args)
    return result instanceof Object ? result : newObj
}