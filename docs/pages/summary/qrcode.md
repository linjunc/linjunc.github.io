# 如何优雅的在 H5 网页中实现扫码功能

![image-20211130114038729](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211130114038729.png)

> 📢 大家好，我是小丞同学，一名**大二的前端爱好者**
>
> 📢 这篇文章将来讲讲如何在微信公众号页面中接入官方扫码 SDK
>
> 📢 非常感谢你的阅读，不对的地方欢迎指正 🙏
>
> 📢 **愿你忠于自己，热爱生活**

最近在做的项目中需要实现一个**扫码录入**的功能，具体效果就是在点击扫码按钮后调取摄像头，扫描条形码将解码后的数据填入到输入框中。相信这个功能在日常的手机使用中，是非常常用的，下面来看看我是如何一步一步~~踩坑~~**实现**的吧

## 💡 内容抢先看

1. 采用 `Quagga` 库实现遇到的问题和瓶颈
2. 接入微信 SDK 的踩坑指北
3. 最终解决方案

![实现扫码](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/%E5%AE%9E%E7%8E%B0%E6%89%AB%E7%A0%81.png)

## 一、扫码初探 Quagga

第一次接触到扫码的业务，一切都是全新的，也不知道从哪里开始，先到各个社区搜索了一下

![image-20211130121124068](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211130121124068.png)

当时的搜索词大概是这样，得到结果就是利用 `HTML5` 中提供的 `API` 去实现，然后又看到了 `Quagga`，`barCode` 等库，在 `npm` 上查看了官方描述后，我觉得 `Quagga` 这个库可能更符合这个项目的需求，因此对 `Quagga` 进行了一番研究 [Quagga](https://www.npmjs.com/package/quagga)

![image-20211130121818613](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211130121818613.png)

这个库的使用并不难，首先需要引入 `Quagga` 这个库

```shell
yarn add quagga
```

由于我是在 `React` 项目下开发的，因此我们需要在 `return` 的 `JSX` 内 添加一个 `DOM` 节点，用来定制摄像头打开摄像头影像的投放区域

![image-20211130122444485](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211130122444485.png)

代码中的 `yourElement`  节点就是用来做摄像头的影像投放的

接下来，需要开始使用 `Quagga` ，大概就是调一下方法，配置一下解码方式，扫码区域，然后就能唤起摄像头，进行扫码，再处理一下扫码结果。由于初学，对它具体的代码书写还不是很熟悉，因此看老外敲了一晚的代码，并在一个大佬的 `github` 仓库内，找到了一个开源的扫码录入项目 👇👇👇

![image-20211130122823986](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211130122823986.png)

看了看它的实现代码，然后开始了我的踩坑

首先我们需要初始化 `Quagga`

需要定制一下我们的解码方式，对于我们需要扫描的码是什么类型的，可以找个检测网站测一下，我的是 `Code39` 类型的

```js
Quagga.init({
  inputStream: {
    name: "Live",
    type: "LiveStream", // 方式
    constraints: {
      width: '790',
      height: '490'
    }, // 解码区域
    numberOfWorkers: navigator.hardwareConcurrency,
    target: document.querySelector('#barcodeScan') // 影像输出到的节点
  },
  locate: true,
  decoder: {
    readers: ["code_39_reader"] // 解码方式
  }
}, function (err) {
  if (err) {
    return 
  }
  Quagga.start() // 开启
})
Quagga.onDetected(this.onDetect)
```

当成功扫码后会调用 `onDetected` 方法，这就有点像生命周期一样，都是定义好的，我们可以在这个函数里接收到返回来的 `result` 获取到 `codeResult` 扫描结果

```js
onDetect(res){
  // console.log(res.codeResult.code)
  Quagga.stop()
  Quagga.offProcessed()
  console.log(res.codeResult);
}
```

然后我们就可以开始疯狂的扫码，测试，经过了一晚上的测试，我发现它并不能像别人视频中那样流畅准确的进行解码，基本上输出的结果没几个是对的上的，因此此路行不通，开始萌生了放弃的想法，后来发现可以直接调取微信的扫码功能，来实现我们的需求，因此开始了微信 SDK 踩坑之路

![image-20211130123646800](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211130123646800.png)

## 二、大战微信 SDK

在经历了 `quagga` 的失利后，开始了捣鼓接入微信 `SDK` 来实现，

首先我们需要引入 `weixin-js-sdk` ，这样我们就可以使用一些 `wx` 官方 `API`，比如这里需要使用到 `scanQRcode` 

在这里我们调用这个 `API`，它接收一个配置对象，具体可以看[官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/scan/wx.scanCode.html)

比较重要的就是 `needResult` 它决定扫码的结果由谁来处理，如果是 0 ，则由微信处理，例如扫取一个快递码，它在扫描结束后会跳转到对应的页面去，这不是我们想要的，因此设置为 1，会直接返回扫描的结果，我们可以在 `success` 回调中获取到这个结果 `resultStr` ，这个 `resultStr` 是一个数组，第一项是扫码的类型，第二项是解码后的值，因此我们处理一下

```js
wx.scanQRCode({
    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
    success: function (res) {
        let result = res.resultStr.split(',')[1]; // 当needResult 为 1 时，扫码返回的结果
    },
    fail: function (err) {
        console.log('error');
        console.log(err);
    }
})
```

这样我们一个简单的扫码功能就写好了，真是很方便，只需要绑定到事件处理回调即可被调用。真的是这么简单吗？

由于我们使用的是微信开放能力，我们需要进行配置，采用官方提供的 `wx.config`

需要配置我们的 `appId`，以及一个签名还需要配置我们需要使用的 `API`

```js
wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature,// 必填，签名
    jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表
});
```

签名这些配置项，需要后台哥哥返回，我们需要向后端传递我们当前的 `url`，用来生成掐灭

注意：一定是需要动态的，写死了会有 `bug`

这样我们调用接口，后端返回几个参数即可

```js
const data = await getWxKey({ url: window.location.href.split('#')[0] })
```

这里有几个需要注意的问题

1. 调取微信 `API` 需要使用 `access_token` 这个需要后端去获取，怎么解决我也不清楚，应该是通过 微信公众号的 `addId` 去申请的
2. 向后端传递的 `url` ，是需要通过**动态获取**的，不然可能会有 `invalid signature` 签名错误的情况

在代码层面上，我们能做的就是这些了，前端的代码逻辑没有很多，都是 `API` 调用，完整代码如下

```js
const openCamera = async () => {
    const data = await getWxKey({ url: window.location.href.split('#')[0] })
    const { appId, timestamp, nonceStr, jsKey: signature } = data.data
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature,// 必填，签名
        jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表
    });
    wx.ready(() => {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                let result = res.resultStr.split(',')[1]; // 当needResult 为 1 时，扫码返回的结果
                form.setFieldsValue({ orderNumber: result })
            },
            fail: function (err) {
                console.log(err);
            }
        })
    })
}
```

但是写到这里，我们的扫码功能仍然是不可用的，我们还需要在微信公众平台来配置我们的接口域名，不然得到的会是 👇👇👇

![71e5dd759e7980b07e6e4a9567b07e8](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/71e5dd759e7980b07e6e4a9567b07e8.jpg)

我们需要在微信公众平台配置 `JS` 接口安全域名

![image-20211130131801904](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211130131801904.png)

这样我们的问题就能迎刃而解，在配置安全域名的时候，注意访问的域名不要启动代理，不然会绑定不成功

---

至此我们的需求得以完成，文章可能看起来很容易，但是实际操作起来会用很多各种各样的问题，希望这篇文章能够帮助到有类似需求的你

小tips：遇到问题的时候可以尝试在微信交流平台找答案，或者可以查看官方文档

> 最后，可能在很多地方讲诉的不够清晰，请见谅
>
> 💌 如果文章有什么错误的地方，或者有什么疑问，欢迎留言，也欢迎私信交流