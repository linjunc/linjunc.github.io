const jsonp = ({ url, params, callbackName }) => {
    // 生成 url 链接
    const generateUrl = () => {
        let dataSrc = ''
        // get 请求拼接 params
        for(const key in params) {
            if(params.hasOwnProperty(key)) {
                dataSrc += `${key}=${params[key]}`
            }
        }
        dataSrc += `callback=${callbackName}`
        return `${url}?${dataSrc}`
    }
    return new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script')
        scriptElement.src = generateUrl()
        window.[callbackName] = data => {
            resolve(data)
            document.removeChild(scriptElement)
        }
    })
}

// AJAX
const request = function(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.setRequestHeader('CONTENT-TYPE', 'application/json');
        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return;
            if(xhr.status === 200 || xhr.status === 304) {
                resolve(xhr.responseText)
            }else {
                reject(new Error(xhr.responseText))
            }
        }
        xhr.send()
    })
}