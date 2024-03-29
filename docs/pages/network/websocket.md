# WebSocket 相关面试题

## 你可以说说你对 Websocket 的理解吗？

:::tip
WebSocket 它是一种在客户端和服务器之间**建立持久连接**的协议，它在单个 TCP 连接上实现全双工通信，实现了高效率的双向通信。

在传统的 HTTP 协议中都是一种请求和响应的模式，只有客户端发送请求后，服务器才能返回响应的结果，这种对于实时性要求高的场景就很不利，而 WebSocket 可以保持连接状态，避免了频繁的请求和响应操作。

它最大的特点是**服务器可以向客户端主动推动消息，客户端也可以向服务器端发送消息**

:::

## （追问）WebSocket 的特点又哪些呢？

- 支持双向通信，实时性很强
- 可以发送文本和二进制数据
- 建立在 TCP 协议之上，服务端的实现比较容易
- 数据格式比较轻量，性能开销小，通信高效
- 没有同源限制，客户端可以与任意服务器通信
- 协议标识符是 ws（如果加密，则为 wss），服务器网址就是 URL
- 与 HTTP 协议有着不错的兼容性，默认端口是 80 和 443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器

## （追问）即时通讯的实现方式有哪些？

短轮询、长轮询、SSE、WebSocket

## （追问）说说它们的实现思路？

**短轮询**：客户端每隔一段时间向浏览器发送 HTTP 请求，服务器端收到请求后，不论是否有数据更新，都直接进行响应。这种方式实现的的即时通讯，其实是一种**间隔性的轮询**，因此叫做短轮询。

它的缺点也非常明显，这种方式需要不断的建立 HTTP 连接，严重浪费服务器端和客户端资源。

**长轮询**：客户端向服务器端发送 HTTP 请求，服务器端收到请求后，不会立即返回响应，而是**将请求挂起**，在服务器端有更新的时候进行响应，或者在达到一定时间后进行返回。

相比之下，长轮询的方式减少了 HTTP 请求的次数，但是连接挂起也会导致资源的浪费

**SSE**：服务器使用流信息向服务器推送信息。严格来说，HTTP 协议无法实现服务器主动推送信息。但是如果**服务器向客户端声明，需要发送流数据**。也就是说，发送的不是一次性的数据包，而是一个数据流，会不断的发送，这时，客户端不会关闭连接，会等着服务器发过来新的数据流。

相比于短轮询和长轮询来说避免建立过多的 HTTP 请求，相比之下更加节约资源

**WebSocket**：与传统的 HTTP 协议不同，该协议允许由服务器主动向客户端推送信息。它是全双工通信协议，可以互发信息，而 SSE 的方式是单向通信的，只能由服务器端向客户端推送信息，如果客户端需要发送信息就是属于下一个 http 请求了。

## 怎么判断协议是不是 WebSocket？

`WebSocket` 使用 `ws` 或 `wss` 的统一资源标志符，通过判断 header 中是否包含 `Connection: Upgrade` 和 `Upgrade: WebSocket` 来判断当前是否需要升级到 `Websocket` 协议，同时还有一些 `Version` 的 header，当服务器同意升级 `Websocket` 后会返回 101 的响应码

```js
Upgrade: websocket

Connection: Upgrade
```

```js
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==

Sec-WebSocket-Protocol: chat, superchat

Sec-WebSocket-Version: 13
```

- 首先，`Sec-WebSocket-Key` 是一个Base64 encode的值，这个是浏览器随机生成的，告诉服务器：泥煤，不要忽悠窝，我要验证尼是不是真的是 Websocket 助理。
- 然后，`Sec_WebSocket-Protocol` 是一个用户定义的字符串，用来区分同URL下，不同的服务所需要的协议。简单理解：今晚我要服务 A，别搞错啦~
- 最后，`Sec-WebSocket-Version` 是告诉服务器所使用的 `Websocket Draft`（协议版本），在最初的时候，Websocket 协议还在 Draft 阶段，各种奇奇怪怪的协议都有，而且还有很多期奇奇怪怪不同的东西，什么 Firefox 和 Chrome 用的不是一个版本之类的，当初 Websocket 协议太多可是一个大难题。。不过现在还好，已经定下来啦大家都使用的一个东西 ：服务员，我要的是13岁的噢→_→

## HTTP 和 WebSocket 的区别

:::tip
首先第一点是 HTTP 是**无状态协议**，每次请求和响应之间不会保存任何的信息，而 WebSocket 是有状态的，连接一旦建立，客户端和服务器之间的通信可以一直保持，直到连接关闭。

第二点是 HTTP 基于请求和响应的方式，而 WebSocket 支持**双向通信**，客户端和服务器之间可以同时发送信息

第三点 HTTP 的**连接是短暂的**，每次请求完成后都会关闭，而 WebSocket 使用长连接，连接一旦建立就可以一直保持，发送多次数据，减少网络传输和时间开销

第四点 HTTP 每次请求都需要**建立 TCP 连接**，而 WebSocket 只需要建立一次 TCP 连接，后续的通信都是基于这个连接，减少了建立连接的时间开销

:::

## （追问）HTTP 也有长连接，为什么不使用呢，它和 WebSocket 有什么区别呢？

:::tip
**确实 HTTP 也实现了长连接，但是 HTTP 的长连接指的是 TCP 连接不断开，后续有 HTTP 请求还是会利用这个 TCP 连接，但是这个连接的保持没有规定的时间，同时不是说 HTTP 请求后还能接收服务端数据，只是在发送 HTTP 请求和响应的时候公用一个 TCP 连接，而 WebSocket 则完全不需要 HTTP 请求后，服务端才能发送数据，因为它们的连接一直没有断开。**

---
确实是，HTTP 中有 keep-alive 的机制来保持连接，但是它的实现方式是在请求头中加入 `Connection: keep-alive` 来保持连接，而 WebSocket 是在握手阶段就将连接升级为长连接，这样就避免了每次请求都要加入 `Connection: keep-alive` 的请求头。

因此可以看出，HTTP 实现的长连接**每次都需要发送报文头部**，而 WebSocket 则不需要发送报文头部，可以直接发送消息，这样就大大减少了数据传输量，提高了传输效率。

其实意思就是说：HTTP 的长连接是保持了 TCP 连接，可以发送多个 HTTP 请求，减少了握手次数。

同时，WebSocket 支持双向通信，而 HTTP 长连接通信是单向的。

:::

HTTP1.1 的连接**默认使用长连接**

即在一定的期限内保持链接，客户端会需要在短时间内向服务端请求大量的资源，保持 TCP 连接不断开。客户端与服务器通信，必须要有客户端发起然后服务器返回结果。客户端是主动的，服务器是被动的。

在一个 TCP 连接上可以传输多个 `Request/Response` 消息对，所以本质上还是 `Request/Response` 消息对，仍然会造成资源的浪费、实时性不强等问题。

如果不是持续连接，即短连接，那么每个资源都要建立一个新的连接，HTTP 底层使用的是 TCP，那么每次都要使用三次握手建立 TCP 连接，即每一个 request 对应一个 response，将造成极大的资源浪费。

## WebSocket 的握手过程

:::tip
WebSocket 的握手过程使用的是 HTTP 协议，首先客户端会向服务端发送一个 HTTP 请求（握手包），必须是 GET 方法，HTTP 版本不能低于 1.1，必须**包含了需要升级 WebSocket 请求的头部信息，Upgrade 和 Connection 等**，服务端接收到请求后，会验证请求是否合法，返回 HTTP 响应，其中包含了 WebSocket-Accept 的字段，用于确认服务器是否支持 WebSocket 协议，并对连接请求进行验证，验证通过，那么就会升级协议，之后的通信就是基于 WebSocket 协议了。
:::

1. 客户端向服务端**发送 HTTP 请求报文**。报文中必须包含一些特殊的头部信息，例如 Host、Upgrade、Connection、`Sec-WebSocket-Key` 和 `Sec-WebSocket-Version` 等。其中，`Sec-WebSocket-Key` 是一个随机字符串，用于验证客户端的身份。

2. 服务端接收到客户端的请求后，判断该请求**是否是有效的 WebSocket 请求**。如果请求不合法，则返回 400 Bad Request 响应报文。否则，服务端向客户端返回一个 HTTP 响应报文。响应报文中必须包含 Upgrade、Connection、`Sec-WebSocket-Accept` 和 `Sec-WebSocket-Version` 字段，其中：

- `Upgrade`：值必须为 "websocket"，表示客户端请求升级到 WebSocket 协议。

- `Connection`：值必须为 "`Upgrade`"，表示客户端请求升级连接。

- `Sec-WebSocket-Accept`：该字段的值是由服务端生成的，用于验证客户端的身份是否合法。

- `Sec-WebSocket-Version`：该字段的值是一个整数，表示支持的 WebSocket 版本号。如果服务端不支持客户端请求的版本，则会返回一个 426 Upgrade Required 响应报文。

3. 客户端接收到服务端的响应后，首先要验证响应报文的状态码**是否为 101 Switching Protocols**。如果状态码不是这个值，则表示握手失败。否则，客户端需要验证响应报文中的 `Sec-WebSocket-Accept` 字段值是否正确。具体地，客户端需要将其自己保存的 GUID（Globally Unique Identifier）字符串和之前发送的随机字符串 `Sec-WebSocket-Key` 拼接在一起，计算 SHA1 摘要，然后将结果转换为 BASE64 编码。最终结果应该和服务端返回的 `Sec-WebSocket-Accept` 字段值相同。

4. 如果客户端验证成功，表示 WebSocket 连接已经**建立成功**。此时，客户端和服务端可以开始进行数据传输。在数据传输过程中，客户端和服务端之间互相发送数据帧（Frame），每个数据帧包含了一个消息的一部分或全部内容。同时，也可以使用 Ping/Pong 消息来检测连接状态。当连接不再需要时，客户端或服务端可以发送 Close 消息来关闭连接。

## （追问）你刚刚提到的验证是指什么，是如何验证的？

:::tip
在 WebSocket 握手中，客户端会向服务器发送一个 HTTP 请求，请求头中包含了一些信息，其中就包括了一个随机生成的字符串，即 `Sec-WebSocket-Key`。服务器收到这个请求后，会根据一定的规则对这个字符串进行处理，以验证连接请求的合法性。

具体来说，服务器会将 `Sec-WebSocket-Key` 和一个固定的字符串（"258EAFA5-E914-47DA-95CA-C5AB0DC85B11"）拼接在一起，然后对这个字符串进行 SHA-1 摘要计算，并进行 base64 编码，得到一个新的字符串，即 Sec-WebSocket-Accept。服务器会将这个字符串作为响应头中的一个字段返回给客户端。

客户端收到服务器的响应后，会检查其中是否存在 `Sec-WebSocket-Accept` 字段，并且会用相同的方法计算出自己的 `Sec-WebSocket-Accept` 值。如果两者相等，说明连接请求是合法的，握手成功。此时，服务器和客户端就可以使用 WebSocket 协议进行实时通信了。

简单来说，`Sec-WebSocket-Key` 是一个随机字符串，用于确保客户端发送的连接请求是合法的；而 `Sec-WebSocket-Accept` 则是服务器计算出的响应头字段，用于确认服务器是否支持 WebSocket 协议，并对连接请求进行验证。
:::

`Sec-WebSocket-Key` 并**不是用来保证安全性的**，只是用来验证是否是合法的 WebSocket 请求。如果想要保证安全性，可以使用 SSL/TLS 协议对 WebSocket 连接进行加密。

## WebSocket 的一些应用场景和优缺点

WebSocket 的特性决定了它的使用场景，用于一些实时性和双向通信低延迟的场景，比如实时通信在线聊天、在线游戏、视频会议等。

它的优点也很明显

1. 实时性好，服务端可以主动推送数据
2. 节省带宽：WebSocket 使用长连接，可以减少建立和断开连接的开销
3. 开发成本低：不需要学习新的协议，因为类似 HTTP 接口
4. 支持跨域

缺点就兼容性、稳定性、和安全问题吧

## WebSocket 协议的 API 如何在 JavaScript 中实现

提供 WebSocket 对象，用于创建和管理 WebSocket 连接。

```js
// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});
```

## WebSocket 的生命周期及其与 HTTP 协议的关系

:::tip
WebSocket 的生命周期包括握手阶段、连接阶段和关闭阶段。在握手阶段，客户端向服务端发送一个 HTTP 请求，请求头中包含了 Upgrade 和 Connection 字段，告诉服务端要升级协议并保持连接。服务端收到请求后，返回一个 HTTP 响应，响应头中包含了 Upgrade 和 Connection 字段，告诉客户端已经升级协议并保持连接。在数据传输阶段，客户端和服务端可以互相发送数据。在关闭阶段，任何一方都可以向另一方发送关闭帧来关闭连接。
:::

## （追问）发送关闭帧具体怎么实现呢？

:::tip
首先客户端向服务端发送一个 WebSocket **关闭请求**，包含了协议版本、序列号以及关闭代码、**1000 是正常关闭，1001 是客户端请求关闭**，然后服务端接收到客户端的 WebSocket 关闭请求后，会发送一个 WebSocket 关闭响应给客户端，**响应也有一个关闭代码**，2000 是正常关闭，2001 是服务器错误

一旦客户端接收到服务器的 WebSocket 的关闭响应，客户端就会发送以恶搞 HTTP 关闭响应给服务器，服务器接收到 HTTP 关闭响应后，就会结束。
:::

1000 表示正常关闭，1001 表示客户端请求关闭，1010 表示服务器请求关闭，1013 表示客户端不支持当前版本等。

## WebSocket 消息传输的优化

:::tip
可以加入心跳机制，客户端每隔一段时间向服务端发送一个特有的心跳消息，每次服务端收到消息后只需将消息返回，此时，若两者还保持连接，则客户端就会收到消息，若没收到，则说明连接断开，此时客户端就要自动重连。

第二点可以做断线重连，客户端与服务端断开连接后，服务端没有关闭，客户端需要重新连接服务端，通过多通道管理来实现
:::

```js
// 断线重连
socket.onclose = () => {  
  console.log("Connection closed.");  
  setTimeout(() => {  
    socket.connect();  
  }, 1000);  
};
```

## WebSocket 与 服务器推送的区别是什么？

:::tip
WebSocket 连接，实现了双向通信。WebSocket 连接是持久的，即连接不会中断，而是一直存在。服务端依赖**客户端请求的基础上**，服务端主动推送其他数据。
:::

服务端推送为了解决在请求资源需要串行解析的问题，服务端推送可以预测主请求的依赖资源，在响应主请求的同时，主动并发推送依赖到客户端，客户端解析主请求响应后，可以无延迟的从本地缓存中获取依赖资源，

![](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgtwo/20230402151431.png)

## WebSocket 的特点有哪些？与传统请求和响应相比有何优势？

## 如何在服务器端实现 WebSocket？基于 Node.js 的实现方式是什么？

在服务端监听 connection，然后客户端通过 connect 来连接

```js
const net = require('net');  
const WebSocket = require('websocket');

const server = net.createServer();  
server.on('connection', function connection(ws, req) {  
  ws.on('message', function message(message) {  
    console.log('Received message: ' + message);  
  });  
  ws.send('Hello, WebSocket!');  
});

server.listen(3000, function () {  
  console.log('Server is listening on port 3000');  
});  
```

## 多通道的工作原理是什么？

在服务端维持 backendMap 和 frontendMap，在创建 backend 通信通道时，将 backend 通道的 id 存在 backendMap 中，会映射一些 backend 的信息，在创建 frontend 通信通道时，会通过 id 获取出相对应的 backend 通道，一个连接，它们的 backend 和 frontend 应该是一样的，而且 backend 应该先打开，再打开 frontend，这样才能保证通信的正常进行。在拿到 backend 后会将两者建立连接。

在架构上，是存在 Channel 和 ChannelMultiplex 两个，ChannelMultiplex 用来消费 Channel，用于管理 frontend 和 backend 通道。
