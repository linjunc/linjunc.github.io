# HTTP 协议相关面试题

## 常见的 HTTP 请求方法

- `GET` 方法：用于向服务器获取数据。只读取数据，不更改任何数据。相同的参数返回的结果相同
- `POST` 方法：提交一个实体（payload），用于创建新的实体和修改现有的实体。会更改状态或引起其他的副作用
- `PUT` 方法：用新的实体替换指定的资源。PUT 请求中发送的数据完全替换了指定的资源，并且如果指定的资源不存在，则创建一个新的资源。
- `DELETE`：删除指定的资源。DELETE 请求负责删除指定的资源
- `PATCH`：通过局部修改的方式更新指定的资源。PATCH 请求类似于 PUT 请求，但是它**只更新指定资源的某些部分，而不是完全替换。**
- `HEAD`：与 GET 请求相同，但不返回响应正文。HEAD 请求可以**检查服务器是否支持指定的资源类型**、检查文件是否存在以及获取与资源有关的元数据
- `OPTIONS`：列出对指定资源所支持的请求方法、标头和其他信息。OPTIONS 请求可用于**确定服务器支持哪些请求方法**，或者客户端可以在不实际执行操作的情况下测试服务器性能或配置。

## get 和 post 的区别

:::tip
首先它们的**应用场景**不同，get 请求一般用于访问服务器资源，而 post 请求一般用于向服务器提交数据。本质的区别就是 post 会修改服务器的数据，而 get 不会修改服务器的数据。

同时 get 请求的**数据**会被放在 url 中，而 post 请求的数据会被放在请求体中。也因此 get 请求发送数据的**长度**有限制，同时**安全性**也会比 post 请求要差一些。

而且浏览器一般会**缓存** get 请求的数据，而不会缓存 post 请求的数据。

最后在网络层面，get 请求会产生一个 TCP 数据包，而 post 请求会产生**两个 TCP 数据包**，先发送 header 服务器响应 100 后，再发送 data
:::

- **应用场景不同**：get 请求不会对服务器的资源产生影响，而 post 请求会对服务器的资源产生影响，比如说 post 请求会修改服务器的数据，而 get 请求不会修改服务器的数据。
- **数据传递方式也不同**：get 请求的数据会被放在 url 中，而 post 请求的数据会被放在请求体中。
- **请求长度不同**：浏览器对 url 的长度有限制，因此 get 请求发送数据的长度有限制，而 post 请求没有这个限制。
- **缓存不同**：浏览器一般会缓存 get 请求的数据，而不会缓存 post 请求的数据。
  - 可以在请求头中添加 `Cache-Control: no-cache` 来禁止浏览器缓存 get 请求的数据
  - 也可以通过在 url 中添加随机数来禁止浏览器缓存 get 请求的数据
- **安全性不同**：get 请求的数据会被放在 url 中，因此 get 请求的数据不安全，而 post 请求的数据会被放在请求体中，因此 post 请求的数据相对安全一些。
- post 支持更多的数据类型的数据
- **产生 TCP 数据包数量不同**：get 请求会产生一个 TCP 数据包，而 post 请求会产生**两个 TCP 数据包**。
  - GET 请求，浏览器会把 HTTP header 和 data 一并发送出去，服务器响应 200（返回数据）
  - POST 请求，浏览器先发送 header，服务器响应 100 continue，浏览器再发送 data，服务器响应 200 ok（返回数据）
    - 第一次将 header 发送，确认服务器和网络都可以接收数据，才会发送 data

## post 和 put 的区别

:::tip
put 请求是**幂等的**，用于**更新数据**，而 post 请求不是幂等的，用于**添加数据**
:::

- put 向服务器发送数据，不会增加数据的种类，无论发送多少次，都只会修改数据，可以理解为更新数据
- post 向服务器发送数据，会增加数据的种类，每次发送都会增加一条数据，可以理解为添加数据

## （追问）那么用 put 请求来添加数据会有什么问题吗？

:::tip
PUT 请求本质是一个**幂等请求**，也就是多次发送相同的数据，服务端的响应应该是一样。那么用来添加数据就会造成不一致，同时也有可能 PUT 添加的数据已经存在，就会更新数据，造成**资源冲突**的问题

而且用 PUT 请求来添加数据，也**不符合 HTTP 协议的语义**，就比如你用 GET 请求来修改数据，这样也是不符合语义的，而且 GET 还有可能会被**浏览器缓存**。
:::

- **幂等性问题**：PUT 请求是幂等操作，也就是重复进行多次，并不会产生任何影响，具有替换更新的特性，也就是说请求到达服务器后必须保证数据一致性。
- **资源冲突问题**：如果使用 PUT 请求添加的数据已经存在，则需要按照 PUT 请求中提供的数据进行替换，这可能会导致数据不一致。如果在 PUT 请求的场景下添加数据，需要考虑通过不同的方式进行数据添加并返回对应的状态码
- **安全性问题**：使用 PUT 请求添加数据时，需要注意对客户端所提交的数据进行校验，以保证数据的完整性和安全性。

## 对 Accept 系列字段了解多少？

:::tip
在向服务器发出请求时，可以使用 Accept 请求头来告诉服务器，客户端希望接收什么类型的响应数据。服务器会**根据 Accept 请求头的值来决定返回什么类型的响应数据**。

比如 指定 HTML 还是 XML 格式，可以使用 Accept: text/html 或者 Accept: text/xml 来指定，如果不指定，则默认返回 HTML 格式的数据。

如果希望使用字符集来指**定响应数据的编码格式**，可以使用 Accept-Charset 字段，比如 Accept-Charset: utf-8，如果不指定，则默认使用 ISO-8859-1 字符集。

如果希望使用语言来指定**响应数据的语言**，可以使用 Accept-Language 字段，比如 Accept-Language: en，如果不指定，则默认使用 en-US 语言。

如果希望使用编码来指定**响应数据的编码格式**，可以使用 Accept-Encoding 字段，比如 Accept-Encoding: gzip，如果不指定，则默认使用 identity 编码。

:::

![](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgtwo/20230319141720.png)

## 常见的 content-type 有哪些？

1. `application/x-www-form-urlencoded` 按照 `key=value&key=value` 进行编码

2. `multipart/form-data` 通常用表单上传文件

3. `application/json` 服务器消息主体是**序列化的 JSON 字符串**

4. `text/xml` 主要提交xml格式数据

## 对于定长和不定长的数据，HTTP 是怎么传输的？

:::tip
如果是定长数据，则可以通过设置 `Content-Length` 头部来告诉服务器要发送的数据长度，并且在发送完指定长度的数据后，**服务器可以直接断开连接**。这样避免了服务器等待数据传输完毕后才关闭连接，从而节省了服务器资源。

如果是不定长的数据，可以通过 Transfer-Encoding: chunked 来告诉服务器采用**分块传输给客户端**，这样做的好处是在传输大文件时可以实时传输，避免了一次性传输大文件带来的数据阻塞和等待时间过长的问题
:::

对于定长的比较的简单，发送的时候设置 `Content-Length` 头部，接收的时候读取 `Content-Length` 头部，然后读取指定长度的数据就可以了。

需要介绍一下不定长的包体传输

```json
Transfer-Encoding: chunked
```

表示分块传输数据，设置这个字段后，会自动产生两个效果

1. 忽略 Content-Length 字段
2. 基于长连接连续传输数据

```json
chunk长度(16进制的数)
第一个chunk的内容
chunk长度(16进制的数)
第二个chunk的内容
......
0
```

最后有一个**空行**！

## HTTP 如何处理大文件的传输？

:::tip
第一种可以使用**分块传输**，使用 Transfer-Encoding: chunked 头部告诉服务端，将文件分成多个块，每个块发送前会将大小发送给客户端，客户端进行拼接，直到接收所有块。

还可以使用**断点续传**的方式，这个方案依赖于 Range，可以将大文件分成多个块，客户端可以再请求时通过 Range 头部，来指定获取文件的某一部分，从而实现断点续传，这样也可以避免网络不稳定导致传输中断

最简单的还可以使用**CDN 进行加速**，使用 CDN 可以提高大文件传输效率

:::

## （追问）分块传输的 chunked 大小由什么决定？

:::tip
块的大小是可以根据**传输数据的具体情况和网络状况**进行调整的。
:::

chunked 的大小由服务器决定，一般是根据**网络环境来决定的**，比如网络环境不好，可以设置较小的 chunked 大小，这样可以保证数据传输的稳定性，如果网络环境好，可以设置较大的 chunked 大小，这样可以提高传输效率。

## （追问）在分块传输中，如果某个 chunk 传输失败了，如何处理？

当发生中断或者数据丢失时，接收方可以通过发送一个带有 `Range` 或者 `If-Range` 字段的 HTTP 请求来**获取缺失的数据块**。

其中 `Range` 字段可以指定请求所需的数据块的范围

`If-Range` 字段则可以指定**缺失数据块的版本号或数据校验值**，以便发送方能够了解接收方需要的数据块的情况。

```js
xhr.onerror = function () {
    // 下载出错，利用历史下载数据重新启动下载任务
    var lastByte = xhr.response.length;
    console.log('Download interrupted, restarting from byte ' + lastByte);
    xhr.open('GET', 'http://your-download-url.com', true);
    xhr.setRequestHeader('Range', 'bytes=' + lastByte + '-');

    xhr.send();
};

// 开始分块传输任务
xhr.open('GET', 'http://your-download-url.com', true);
xhr.setRequestHeader('Range', 'bytes=0-1023'); // 设置下载范围为前1024字节
xhr.send();
```

主要利用 onerror 事件来检测下载中断点，然后重新发送请求，设置 Range 头部，指定从哪个字节开始下载。

## （追问）如何实现断点续传呢？

断点续传指的是再文件传输过程中，由于传输中断，再次请求资源时，可以从中断处继续传输，而不是重新传输整个文件。

再 HTTP 中，断点续传一般通过 Range 头部来实现：

1. 客户端发送 GET 请求，增加 Range 头部，指定需要请求哪一部分的资源，比如
   1. `Range: bytes=0-499` 表示请求 0 到 499 字节的数据
2. 服务器再收到带有 Range 头部的 GET 请求后，会解析头部内容，从文件指定位置开始传送数据
3. 服务器传送指定范围内的数据给客户端，然后在响应头部中增加 `Content-Range` 字段，指定服务器发送的数据内容范围
   1. 如 `Content-Range: bytes 0-9999/20000`，则表示当前传输了0-9999共10000个字节，文件总大小为20000个字节。
4. 客户端在接收到响应后，将收到的**数据添加到本地缓存**中，然后通过开启**多线程**实现同时请求其他数据块的传输，并将每次请求收到的数据块进行拼接，最终获得完整的文件内容。

**Range 字段拆解**

而对于客户端而言，它需要指定请求哪一部分，通过Range这个请求头字段确定，格式为 `bytes=x-y`。接下来就来讨论一下这个 Range 的书写格式:

- `0-499` 表示从开始到第 499 个字节。
- `500-` 表示从第 500 字节到文件终点。
- `-100` 表示文件的最后100个字节。

服务器收到请求之后，首先验证范围是否合法，如果越界了那么返回 **416 错误码**，否则读取相应片段，返回 **206状态码**。

同时，服务器需要添加 `Content-Range` 字段，这个字段的格式根据请求头中 Range 字段的不同而有所差异。

具体来说，请求单段数据和请求多段数据，响应头是不一样的。

```json
// 单段数据
Range: bytes=0-9
// 多段数据
Range: bytes=0-9, 30-39
```

**单段数据**

```json
HTTP/1.1 206 Partial Content
Content-Length: 10
Accept-Ranges: bytes
Content-Range: bytes 0-9/100

i am xxxxx
```

**多段数据**

```json
HTTP/1.1 206 Partial Content
Content-Type: multipart/byteranges; boundary=00000010101
Content-Length: 189
Connection: keep-alive
Accept-Ranges: bytes


--00000010101
Content-Type: text/plain
Content-Range: bytes 0-9/96

i am xxxxx
--00000010101
Content-Type: text/plain
Content-Range: bytes 20-29/96

eex jspy e
--00000010101--
```

这个时候出现了一个非常关键的字段 `Content-Type: multipart/byteranges;boundary=00000010101`，它代表了信息量是这样的:

- 请求一定是多段数据请求
- 响应体中的分隔符是 `00000010101`

## （追问）多线程下载的原理是什么？怎么实现呢？

:::tip
将一个大文件**分割成若干个小块**，在**不同的线程中分别下载不同的小块数据**，以缩短文件下载的时间。**每个线程都独立下载一部分数据**，当所有线程下载完成后，将所有小块数据**合并**成一个完整的文件，从而实现多线程下载。
:::

1. 将要下载的文件**分成若干个小块**，以便分别在不同的线程中下载。

2. 创建线程池，根据需要下载的文件块数开启相应数量的线程。线程数和线程池大小的选择对下载速度和系统资源等都有一定的影响，需要根据实际情况进行调整。

3. 在每个线程中使用 HTTP 协议向服务器发起下载请求并获取数据。在请求中需要**指定下载开始和结束的位置**，以便只下载需要的文件块。

4. 将每个线程下载得到的文件块数据**写入本地文件中，保证分块数据写入正确的位置**，避免数据重复或者数据顺序错误等问题。

5. 在所有线程下载完成后，将所有下载的文件块数据**合并成一个完整的文件**，从而得到完整的文件。

重要：文件分块的大小设置为相同大小或者**根据网络状况动态调整。**

代码可以参考下面的示例：

- 在 UI 线程中，创建 Worker 对象，调用 worker.js 脚本下载数据。

```js
// UI 线程部分代码
// 创建 Worker 对象，调用 worker.js 脚本下载数据
const worker = new Worker('worker.js');
worker.postMessage({
  url: 'http://www.example.com/large_file.zip',
  start: 0,
  end: 1024 * 1024 * 10,
});
// 接收来自 Worker 线程的消息并更新 UI
worker.onmessage = (e) => {
  const { percent } = e.data;
  progressElement.style.width = `${percent}%`;
};
```

worker.js 代码，接收到 UI 线程的消息后，向服务器发送 HTTP 请求，下载数据。

```js
// Worker 线程部分代码
self.addEventListener('message', (e) => {
  const { url, start, end } = e.data;
  // 利用 XMLHttpRequest 或者 Fetch API 向服务器请求数据并下载
  // 将得到的数据片段发送给 UI 线程
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.setRequestHeader('Range', `bytes=${start}-${end}`);
  xhr.responseType = 'blob';
  xhr.onload = () => {
    const blob = xhr.response;
    const reader = new FileReader();
    reader.onloadend = () => {
      const buffer = reader.result;
      self.postMessage({ buffer });
    };
    reader.readAsArrayBuffer(blob);
  };
  xhr.send();
});
```

## 介绍一下 options 请求

:::tip
`options` 请求用来获取服务器支持的 HTTP 方法，同时也可以用来判断服务器是否支持跨域请求，是否有权限访问资源等。

:::

它的 HTTP 报头包括以下字段：

`Access-Control-Request-Method`: 获取所请求 URL 支持的 HTTP 方法
`Access-Control-Request-Headers`: 获取所请求 URL 支持的 HTTP 头

HTTP 请求头可能是这样

```json
OPTIONS /api/user HTTP/1.1
Host: example.com
Access-Control-Request-Method: GET
Access-Control-Request-Headers: X-Requested-With
```

响应头是这样

```json
HTTP/1.1 200 OK
Allow: GET, POST, PUT
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Requested-With
```

服务器响应表明 API 支持 GET、POST 和 PUT 请求方法，可能支持 `X-Requested-With` 头（如果请求中存在该头，则允许跨域访问该资源）。

## HTTP 1.0 和 HTTP 1.1 之间有哪些区别

- **持久链接**：`HTTP 1.1` 支持持久连接，可以使客户端和服务端之间的连接保持打开状态，使多个 HTTP 请求复用同一个 TCP 连接，从而可以在同一连接上发送多个请求和响应，**减少每个请求的连接建立和关闭时间**，提高了性能
- **支持压缩**：`HTTP 1.1` 支持使用 gzip、deflate 和 compress 等压缩算法对请求和响应数据进行压缩，减少传输的数据量，提高传输效率
- **缓存控制**：`HTTP 1.1` 引入了新的缓存机制，包括在**客户端和服务器端指定缓存有效时间的首部字段**。`Etag`、`If-none-match` `Last-Modified`、`If-Modified-Since` 等
- **新增 Host 头部**：`HTTP1.1` 必须使用 Host 首部，以便能够支持多个虚拟主机。
- **范围请求**：`HTTP 1.1` 在请求头引入 range 头域，允许客户端请求服务器只返回资源的一部分，而不是整个资源，**返回码是 206**，便于开发者自由选择充分利用带宽
  - Range请求头有以下两种格式：

  - `Range: bytes=[start]-[end]`表示请求资源的起始字节和结束字节的位置，start和end都是可选的，默认是整个资源。
  - `Range: bytes=[start]-`表示从资源的起始字节位置到末尾的所有字节。

- **支持多种媒体类型**：`HTTP1.1` 引入了新的 MIME 媒体类型，如 `application/xml`、`application/json` 等，能够支持更多的数据格式和内容类型。

那么 HTTP 1.0 存在什么问题呢，为什么推出 HTTP1.1 呢？

## HTTP 1.0 存在什么问题呢？为什么需要升级 1.1 版本？

主要存在以下的问题

1. `HTTP1.0` **每次请求都需要建立新的 TCP 连接**，导致性能的浪费，因为连接的建立和释放都需要时间和计算资源，而每次只进行少量的数据传输，浪费连接浪费资源
2. `HTTP1.0` 没有长连接 `keep-alive` 的机制，每个请求结束后连接立即关闭，从而再次传输数据时需要再次建立连接，这种情况下多次连接的建立和释放会增加网络负载，导致请求的延迟和处理时间延长。
3. `HTTP1.0` 缺乏对虚拟主机的支持，**同一个 IP 地址下的多个站点共享一个资源**容易出现混乱，并且会使服务器的资源利用率降低，同时也会增加DNS服务器的负载。
4. `HTTP1.0` 传输的数据**没有分块传输的功能**，如果传输的数据量比较大，传输时间比较长，那么客户端需要在传输完整个数据之后才能处理响应，这会导致等待时间过长。
5. `HTTP1.0` 限制最大请求头长度为 1024字节，而最大响应头长度为 256字节，这个长度限制会导致传输的多余信息不能及时被截取，从而影响性能。

`HTTP1.1` 协议能够解决这些问题，通过持久连接、分块传输、虚拟主机的支持等机制，提供了更高效的数据传输方式，同时还支持对安全的加强，提高了网络质量。

同时 `HTTP/1.1` 中没有指定头部长度的具体限制，**但建议不要超过8KB**。这是因为较长的头部可能会导致网络延迟，浪费带宽并增加服务器负担。
