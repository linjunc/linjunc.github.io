import{_ as p,c as l,b as s,d as n,w as o,e,a as t,r as c,o as r}from"./app.9206e91c.js";const b=JSON.parse('{"title":"React \u5165\u95E8\u5B66\u4E60\uFF08\u5341\u56DB\uFF09-- redux \u57FA\u672C\u4F7F\u7528","description":"\u5728\u6211\u4EEC\u4E4B\u524D\u5199\u7684\u6848\u4F8B\u5F53\u4E2D\uFF0C\u4F8B\u5982\uFF1Atodolist \u6848\u4F8B\uFF0CGitHub \u641C\u7D22\u6848\u4F8B\u5F53\u4E2D\uFF0C\u6211\u4EEC\u5BF9\u4E8E\u72B6\u6001\u7684\u7BA1\u7406\uFF0C\u90FD\u663E\u5F97\u529B\u4E0D\u4ECE\u5FC3\uFF0Credux\u53EF\u4EE5\u5E2E\u52A9\u6211\u4EEC\u505A\u96C6\u4E2D\u5F0F\u72B6\u6001\u7BA1\u7406","frontmatter":{"title":"React \u5165\u95E8\u5B66\u4E60\uFF08\u5341\u56DB\uFF09-- redux \u57FA\u672C\u4F7F\u7528","date":"2021-09-09T14:32:25.000Z","id":1635582745,"tags":["react","redux"],"categories":["React\u5165\u95E8\u5B66\u4E60"],"keywords":"react,redux,\u5C0F\u4E1E\u540C\u5B66","description":"\u5728\u6211\u4EEC\u4E4B\u524D\u5199\u7684\u6848\u4F8B\u5F53\u4E2D\uFF0C\u4F8B\u5982\uFF1Atodolist \u6848\u4F8B\uFF0CGitHub \u641C\u7D22\u6848\u4F8B\u5F53\u4E2D\uFF0C\u6211\u4EEC\u5BF9\u4E8E\u72B6\u6001\u7684\u7BA1\u7406\uFF0C\u90FD\u663E\u5F97\u529B\u4E0D\u4ECE\u5FC3\uFF0Credux\u53EF\u4EE5\u5E2E\u52A9\u6211\u4EEC\u505A\u96C6\u4E2D\u5F0F\u72B6\u6001\u7BA1\u7406"},"headers":[{"level":2,"title":"\u5F15\u8A00","slug":"\u5F15\u8A00"},{"level":2,"title":"1. \u4EC0\u4E48\u60C5\u51B5\u4F7F\u7528 Redux \uFF1F","slug":"_1-\u4EC0\u4E48\u60C5\u51B5\u4F7F\u7528-redux-\uFF1F"},{"level":2,"title":"2. Redux \u7684\u5DE5\u4F5C\u6D41\u7A0B","slug":"_2-redux-\u7684\u5DE5\u4F5C\u6D41\u7A0B"},{"level":2,"title":"3. Redux \u4E09\u4E2A\u6838\u5FC3\u6982\u5FF5","slug":"_3-redux-\u4E09\u4E2A\u6838\u5FC3\u6982\u5FF5"},{"level":2,"title":"4. \u521B\u5EFA constant \u6587\u4EF6","slug":"_4-\u521B\u5EFA-constant-\u6587\u4EF6"},{"level":2,"title":"5. \u5B9E\u73B0\u5F02\u6B65 action","slug":"_5-\u5B9E\u73B0\u5F02\u6B65-action"},{"level":2,"title":"6. Redux \u4E09\u5927\u539F\u5219","slug":"_6-redux-\u4E09\u5927\u539F\u5219"},{"level":3,"title":"\u7B2C\u4E00\u4E2A\u539F\u5219","slug":"\u7B2C\u4E00\u4E2A\u539F\u5219"},{"level":3,"title":"\u7B2C\u4E8C\u4E2A\u539F\u5219","slug":"\u7B2C\u4E8C\u4E2A\u539F\u5219"},{"level":3,"title":"\u7B2C\u4E09\u4E2A\u539F\u5219","slug":"\u7B2C\u4E09\u4E2A\u539F\u5219"},{"level":2,"title":"\u53C2\u8003\u8D44\u6599","slug":"\u53C2\u8003\u8D44\u6599"}],"relativePath":"pages/react/primary/redux.md"}'),y={name:"pages/react/primary/redux.md"},d=s("p",null,[s("img",{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/redux%E5%9F%BA%E7%A1%80.gif",alt:"redux\u57FA\u7840"})],-1),F=e("\u{1F4E2} \u5927\u5BB6\u597D\uFF0C\u6211\u662F\u5C0F\u4E1E\u540C\u5B66\uFF0C\u4E00\u540D"),i=s("strong",null,"\u5927\u4E8C\u7684\u524D\u7AEF\u7231\u597D\u8005",-1),D=s("p",null,"\u{1F4E2} \u8FD9\u7BC7\u6587\u7AE0\u662F\u5B66\u4E60 Redux \u7684\u5B66\u4E60\u7B14\u8BB0",-1),A=s("p",null,"\u{1F4E2} \u975E\u5E38\u611F\u8C22\u4F60\u7684\u9605\u8BFB\uFF0C\u4E0D\u5BF9\u7684\u5730\u65B9\u6B22\u8FCE\u6307\u6B63 \u{1F64F}",-1),C=e("\u{1F4E2} "),u=s("strong",null,"\u613F\u4F60\u5FE0\u4E8E\u81EA\u5DF1\uFF0C\u70ED\u7231\u751F\u6D3B",-1),h=t(`<h2 id="\u5F15\u8A00" tabindex="-1">\u5F15\u8A00 <a class="header-anchor" href="#\u5F15\u8A00" aria-hidden="true">#</a></h2><p>\u5728\u4E86\u89E3\u4E86 Antd \u7EC4\u4EF6\u5E93\u4E4B\u540E\uFF0C\u6211\u4EEC\u73B0\u5728\u5F00\u59CB\u5B66\u4E60\u4E86 Redux \uFF0C\u5728\u6211\u4EEC\u4E4B\u524D\u5199\u7684\u6848\u4F8B\u5F53\u4E2D\uFF0C\u4F8B\u5982\uFF1Atodolist \u6848\u4F8B\uFF0CGitHub \u641C\u7D22\u6848\u4F8B\u5F53\u4E2D\uFF0C\u6211\u4EEC\u5BF9\u4E8E\u72B6\u6001\u7684\u7BA1\u7406\uFF0C\u90FD\u662F\u901A\u8FC7 state \u6765\u5B9E\u73B0\u7684\uFF0C\u6BD4\u5982\uFF0C\u6211\u4EEC\u5728\u7ED9\u5144\u5F1F\u7EC4\u4EF6\u4F20\u9012\u6570\u636E\u65F6\uFF0C\u9700\u8981\u5148\u5C06\u6570\u636E\u4F20\u9012\u7ED9\u7236\u7EC4\u4EF6\uFF0C\u518D\u7531\u7236\u7EC4\u4EF6\u8F6C\u53D1 \u7ED9\u5B83\u7684\u5B50\u7EC4\u4EF6\u3002\u8FD9\u4E2A\u8FC7\u7A0B\u5341\u5206\u7684\u590D\u6742\uFF0C\u540E\u6765\u6211\u4EEC\u53C8\u5B66\u4E60\u4E86<strong>\u6D88\u606F\u7684\u53D1\u5E03\u8BA2\u9605</strong>\uFF0C\u6211\u4EEC\u901A\u8FC7 <strong>pubsub</strong> \u5E93\uFF0C\u5B9E\u73B0\u4E86\u6D88\u606F\u7684\u8F6C\u53D1\uFF0C\u76F4\u63A5\u5C06\u6570\u636E\u53D1\u5E03\uFF0C\u7531\u5144\u5F1F\u7EC4\u4EF6\u8BA2\u9605\uFF0C\u5B9E\u73B0\u4E86\u5144\u5F1F\u7EC4\u4EF6\u95F4\u7684\u6570\u636E\u4F20\u9012\u3002\u4F46\u662F\uFF0C\u968F\u7740\u6211\u4EEC\u7684\u9700\u6C42\u4E0D\u65AD\u5730\u63D0\u5347\uFF0C\u6211\u4EEC\u9700\u8981\u8FDB\u884C\u66F4\u52A0\u590D\u6742\u7684\u6570\u636E\u4F20\u9012\uFF0C\u66F4\u591A\u5C42\u6B21\u7684\u6570\u636E\u4EA4\u6362\u3002<strong>\u56E0\u6B64\u6211\u4EEC\u4E3A\u4F55\u4E0D\u53EF\u4EE5\u5C06\u6240\u6709\u7684\u6570\u636E\u4EA4\u7ED9\u4E00\u4E2A\u4E2D\u8F6C\u7AD9\uFF0C\u8FD9\u4E2A\u4E2D\u8F6C\u7AD9\u72EC\u7ACB\u4E8E\u6240\u6709\u7684\u7EC4\u4EF6\u4E4B\u5916\uFF0C\u7531\u8FD9\u4E2A\u4E2D\u8F6C\u7AD9\u6765\u8FDB\u884C\u6570\u636E\u7684\u5206\u53D1\uFF0C\u8FD9\u6837\u4E0D\u7BA1\u54EA\u4E2A\u7EC4\u4EF6\u9700\u8981\u6570\u636E\uFF0C\u6211\u4EEC\u90FD\u53EF\u4EE5\u5F88\u8F7B\u6613\u7684\u7ED9\u4ED6\u6D3E\u53D1\u3002</strong></p><p>\u800C\u6709\u8FD9\u4E48\u4E00\u4E2A\u5E93\u5C31\u53EF\u4EE5\u5E2E\u52A9\u6211\u4EEC\u6765\u5B9E\u73B0\uFF0C\u90A3\u5C31\u662F Redux \uFF0C\u5B83\u53EF\u4EE5\u5E2E\u52A9\u6211\u4EEC\u5B9E\u73B0\u96C6\u4E2D\u5F0F\u72B6\u6001\u7BA1\u7406</p><h2 id="_1-\u4EC0\u4E48\u60C5\u51B5\u4F7F\u7528-redux-\uFF1F" tabindex="-1">1. \u4EC0\u4E48\u60C5\u51B5\u4F7F\u7528 Redux \uFF1F <a class="header-anchor" href="#_1-\u4EC0\u4E48\u60C5\u51B5\u4F7F\u7528-redux-\uFF1F" aria-hidden="true">#</a></h2><p>\u9996\u5148\uFF0C\u6211\u4EEC\u5148\u660E\u6670 <code>Redux</code> \u7684\u4F5C\u7528 \uFF0C\u5B9E\u73B0\u96C6\u4E2D\u5F0F\u72B6\u6001\u7BA1\u7406\u3002</p><p><code>Redux</code> \u9002\u7528\u4E8E\u591A\u4EA4\u4E92\u3001\u591A\u6570\u636E\u6E90\u7684\u573A\u666F\u3002\u7B80\u5355\u7406\u89E3\u5C31\u662F<strong>\u590D\u6742</strong></p><p>\u4ECE\u7EC4\u4EF6\u89D2\u5EA6\u53BB\u8003\u8651\u7684\u8BDD\uFF0C\u5F53\u6211\u4EEC\u6709\u4EE5\u4E0B\u7684\u5E94\u7528\u573A\u666F\u65F6\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5C1D\u8BD5\u91C7\u7528 <code>Redux</code> \u6765\u5B9E\u73B0</p><ol><li>\u67D0\u4E2A\u7EC4\u4EF6\u7684\u72B6\u6001\u9700\u8981\u5171\u4EAB\u65F6</li><li>\u4E00\u4E2A\u7EC4\u4EF6\u9700\u8981\u6539\u53D8\u5176\u4ED6\u7EC4\u4EF6\u7684\u72B6\u6001\u65F6</li><li>\u4E00\u4E2A\u7EC4\u4EF6\u9700\u8981\u6539\u53D8\u5168\u5C40\u7684\u72B6\u6001\u65F6</li></ol><p>\u9664\u6B64\u4E4B\u5916\uFF0C\u8FD8\u6709\u5F88\u591A\u60C5\u51B5\u90FD\u9700\u8981\u4F7F\u7528 Redux \u6765\u5B9E\u73B0\uFF08\u8FD8\u6CA1\u6709\u5B66 hook\uFF0C\u6216\u8BB8\u8FD8\u6709\u66F4\u597D\u7684\u65B9\u6CD5\uFF09</p><p><img src="https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210909194446988.png" alt="image-20210909194446988"></p><p>\uFF08\u4ECE\u6398\u53CB\u7684\u6587\u7AE0\u91CC\u622A\u7684\u56FE\uFF09</p><p>\u8FD9\u5F20\u56FE\uFF0C\u975E\u5E38\u5F62\u8C61\u7684\u5C06\u7EAF React \u548C \u91C7\u7528 Redux \u7684\u533A\u522B\u4F53\u73B0\u4E86\u51FA\u6765</p><h2 id="_2-redux-\u7684\u5DE5\u4F5C\u6D41\u7A0B" tabindex="-1">2. Redux \u7684\u5DE5\u4F5C\u6D41\u7A0B <a class="header-anchor" href="#_2-redux-\u7684\u5DE5\u4F5C\u6D41\u7A0B" aria-hidden="true">#</a></h2><p><img src="https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210909194900532.png" alt="image-20210909194900532"></p><p>\u9996\u5148\u7EC4\u4EF6\u4F1A\u5728 Redux \u4E2D\u6D3E\u53D1\u4E00\u4E2A <code>action</code> \u65B9\u6CD5\uFF0C\u901A\u8FC7\u8C03\u7528 <code>store.dispatch</code> \u65B9\u6CD5\uFF0C\u5C06 <code>action</code> \u5BF9\u8C61\u6D3E\u53D1\u7ED9 <code>store</code> \uFF0C\u5F53 <code>store</code> \u63A5\u6536\u5230 <code>action</code> \u5BF9\u8C61\u65F6\uFF0C\u4F1A\u5C06\u5148\u524D\u7684 <code>state</code> \u4E0E\u4F20\u6765\u7684 <code>action</code> \u4E00\u540C\u53D1\u9001\u7ED9 <code>reducer</code> \uFF0C<code>reducer</code> \u5728\u63A5\u6536\u5230\u6570\u636E\u540E\uFF0C\u8FDB\u884C\u6570\u636E\u7684\u66F4\u6539\uFF0C\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u72B6\u6001\u7ED9 <code>store</code> \uFF0C\u6700\u540E\u7531 <code>store</code> \u66F4\u6539 <code>state</code></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/12/16e5fd1597faec4d~tplv-t2oaga2asx-watermark.awebp" alt="img"></p><p>\uFF08\u56FE\u6765\u81EA\u6398\u91D1\u793E\u533A\uFF0C\u4FB5\u5220\uFF09</p><h2 id="_3-redux-\u4E09\u4E2A\u6838\u5FC3\u6982\u5FF5" tabindex="-1">3. Redux \u4E09\u4E2A\u6838\u5FC3\u6982\u5FF5 <a class="header-anchor" href="#_3-redux-\u4E09\u4E2A\u6838\u5FC3\u6982\u5FF5" aria-hidden="true">#</a></h2><h4 id="_1-store" tabindex="-1">1. store <a class="header-anchor" href="#_1-store" aria-hidden="true">#</a></h4><p><code>store</code> \u662F Redux \u7684\u6838\u5FC3\uFF0C\u53EF\u4EE5\u7406\u89E3\u4E3A\u662F Redux \u7684\u6570\u636E\u4E2D\u53F0\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5C06\u4EFB\u4F55\u6211\u4EEC\u60F3\u8981\u5B58\u653E\u7684\u6570\u636E\u653E\u5728 <code>store</code> \u4E2D\uFF0C\u5728\u6211\u4EEC\u9700\u8981\u4F7F\u7528\u8FD9\u4E9B\u6570\u636E\u65F6\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4ECE\u4E2D\u53D6\u51FA\u76F8\u5E94\u7684\u6570\u636E\u3002\u56E0\u6B64\u6211\u4EEC\u9700\u8981\u5148\u521B\u5EFA\u4E00\u4E2A <code>store</code> \uFF0C\u5728 Redux \u4E2D\u53EF\u4EE5\u4F7F\u7528 <code>createStore</code> API \u6765\u521B\u5EFA\u4E00\u4E2A <code>store</code></p><p>\u5728\u751F\u4EA7\u4E2D\uFF0C\u6211\u4EEC\u9700\u8981\u5728 <code>src</code> \u76EE\u5F55\u4E0B\u7684 <code>redux</code> \u6587\u4EF6\u5939\u4E2D\u65B0\u589E\u4E00\u4E2A <code>store.js</code> \u6587\u4EF6\uFF0C\u5728\u8FD9\u4E2A\u6587\u4EF6\u4E2D\uFF0C\u521B\u5EFA\u4E00\u4E2A <code>store</code> \u5BF9\u8C61\uFF0C\u5E76\u66B4\u9732\u5B83</p><p>\u56E0\u6B64\u6211\u4EEC\u9700\u8981\u4ECE <code>redux</code> \u4E2D\u66B4\u9732\u4E24\u4E2A\u65B9\u6CD5</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">createStore</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">applyMiddleware</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">redux</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><p>\u5E76\u5F15\u5165\u4E3A count \u7EC4\u4EF6\u670D\u52A1\u7684 reducer</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> countReducer </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./count_reducer</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><p>\u6700\u540E\u8C03\u7528 <code>createStore</code> \u65B9\u6CD5\u6765\u66B4\u9732 <code>store</code></p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createStore</span><span style="color:#A6ACCD;">(countReducer</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">applyMiddleware</span><span style="color:#A6ACCD;">(thunk))</span></span>
<span class="line"></span></code></pre></div><p>\u8FD9\u91CC\u91C7\u7528\u4E86\u4E2D\u95F4\u4EF6\uFF0C\u672C\u6587\u5E94\u8BE5\u4E0D\u4F1A\u5199\u5230~</p><p>\u5728 <code>store</code> \u5BF9\u8C61\u4E0B\u6709\u4E00\u4E9B\u5E38\u7528\u7684\u5185\u7F6E\u65B9\u6CD5</p><p>\u83B7\u53D6\u5F53\u524D\u65F6\u523B\u7684 <code>store</code> \uFF0C\u6211\u4EEC\u53EF\u4EE5\u91C7\u7528 <code>getStore</code> \u65B9\u6CD5</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> state </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> store</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getState</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>\u5728\u524D\u9762\u6211\u4EEC\u7684\u6D41\u7A0B\u56FE\u4E2D\uFF0C\u6211\u4EEC\u9700\u8981\u901A\u8FC7 <code>store</code> \u4E2D\u7684 <code>dispatch</code> \u65B9\u6CD5\u6765\u6D3E\u751F\u4E00\u4E2A <code>action</code> \u5BF9\u8C61\u7ED9 <code>store</code></p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">store</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">dispatch</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">action\u5BF9\u8C61</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>\u6700\u540E\u8FD8\u6709\u4E00\u4E2A <code>subscribe</code> \u65B9\u6CD5\uFF0C\u8FD9\u4E2A\u65B9\u6CD5\u53EF\u4EE5\u5E2E\u52A9\u6211\u4EEC\u8BA2\u9605 <code>store</code> \u7684\u6539\u53D8\uFF0C\u53EA\u8981 <code>store</code> \u53D1\u751F\u6539\u53D8\uFF0C\u8FD9\u4E2A\u65B9\u6CD5\u7684\u56DE\u8C03\u5C31\u4F1A\u6267\u884C</p><p>\u4E3A\u4E86\u76D1\u542C\u6570\u636E\u7684\u66F4\u65B0\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5C06 <code>subscribe</code> \u65B9\u6CD5\u7ED1\u5B9A\u5728\u7EC4\u4EF6\u6302\u8F7D\u5B8C\u6BD5\u751F\u547D\u5468\u671F\u51FD\u6570\u4E0A\uFF0C\u4F46\u662F\u8FD9\u6837\uFF0C\u5F53\u6211\u4EEC\u7684\u7EC4\u4EF6\u6570\u91CF\u5F88\u591A\u65F6\uFF0C\u4F1A\u6BD4\u8F83\u7684\u9EBB\u70E6\uFF0C\u56E0\u6B64\u6211\u4EEC\u53EF\u4EE5\u76F4\u63A5\u5C06 <code>subscribe</code> \u51FD\u6570\u7528\u6765\u76D1\u542C\u6574\u4E2A <code>App</code>\u7EC4\u4EF6\u7684\u53D8\u5316</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">store</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">subscribe</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">ReactDOM</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">render</span><span style="color:#F07178;">( </span><span style="color:#89DDFF;">&lt; </span><span style="color:#FFCB6B;">App</span><span style="color:#89DDFF;"> /&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">root</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h4 id="_2-action" tabindex="-1">2. action <a class="header-anchor" href="#_2-action" aria-hidden="true">#</a></h4><p><code>action</code> \u662F <code>store</code> \u4E2D\u552F\u4E00\u7684\u6570\u636E\u6765\u6E90\uFF0C\u4E00\u822C\u6765\u8BF4\uFF0C\u6211\u4EEC\u4F1A\u901A\u8FC7\u8C03\u7528 <code>store.dispatch</code> \u5C06 action \u4F20\u5230 store</p><p>\u6211\u4EEC\u9700\u8981\u4F20\u9012\u7684 <code>action</code> \u662F\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u5B83\u5FC5\u987B\u8981\u6709\u4E00\u4E2A <code>type</code> \u503C</p><p>\u4F8B\u5982\uFF0C\u8FD9\u91CC\u6211\u4EEC\u66B4\u9732\u4E86\u4E00\u4E2A\u7528\u4E8E\u8FD4\u56DE\u4E00\u4E2A <code>action</code> \u5BF9\u8C61\u7684\u65B9\u6CD5</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> createIncrementAction </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> data </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> INCREMENT</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    data</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>\u6211\u4EEC\u8C03\u7528\u5B83\u65F6\uFF0C\u4F1A\u8FD4\u56DE\u4E00\u4E2A <code>action</code> \u5BF9\u8C61</p><h4 id="_3-reducer" tabindex="-1">3. reducer <a class="header-anchor" href="#_3-reducer" aria-hidden="true">#</a></h4><p>\u5728 Reducer \u4E2D\uFF0C\u6211\u4EEC\u9700\u8981\u6307\u5B9A\u72B6\u6001\u7684\u64CD\u4F5C\u7C7B\u578B\uFF0C\u8981\u505A\u600E\u6837\u7684\u6570\u636E\u66F4\u65B0\uFF0C\u56E0\u6B64\u8FD9\u4E2A\u7C7B\u578B\u662F\u5FC5\u8981\u7684\u3002</p><p>reducer \u4F1A\u6839\u636E action \u7684\u6307\u793A\uFF0C\u5BF9 state \u8FDB\u884C\u5BF9\u5E94\u7684\u64CD\u4F5C\uFF0C\u7136\u540E\u8FD4\u56DE\u64CD\u4F5C\u540E\u7684 state</p><p>\u5982\u4E0B\uFF0C\u6211\u4EEC\u5BF9\u63A5\u6536\u7684 action \u4E2D\u4F20\u6765\u7684 type \u8FDB\u884C\u5224\u65AD</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">countReducer</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">preState </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> initState</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> action</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">type</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">data</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">action</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">switch</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">type</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">case</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">INCREMENT</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">preState</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">case</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">DECREMENT</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">preState</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">preState</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u66F4\u6539\u6570\u636E\uFF0C\u8FD4\u56DE\u65B0\u7684\u72B6\u6001</p><h2 id="_4-\u521B\u5EFA-constant-\u6587\u4EF6" tabindex="-1">4. \u521B\u5EFA constant \u6587\u4EF6 <a class="header-anchor" href="#_4-\u521B\u5EFA-constant-\u6587\u4EF6" aria-hidden="true">#</a></h2><p>\u5728\u6211\u4EEC\u6B63\u5E38\u7684\u7F16\u7801\u4E2D\uFF0C\u6709\u53EF\u80FD\u4F1A\u51FA\u73B0\u62FC\u5199\u9519\u8BEF\u7684\u60C5\u51B5\uFF0C\u4F46\u662F\u6211\u4EEC\u4F1A\u53D1\u73B0\uFF0C\u62FC\u5199\u9519\u8BEF\u4E86\u4E0D\u4E00\u5B9A\u4F1A\u62A5\u9519\uFF0C\u56E0\u6B64\u5C31\u4F1A\u6BD4\u8F83\u96BE\u641E\u3002</p><p>\u6211\u4EEC\u53EF\u4EE5\u5728 <code>redux</code> \u76EE\u5F55\u4E0B\uFF0C\u521B\u5EFA\u4E00\u4E2A <code>constant</code> \u6587\u4EF6\uFF0C\u8FD9\u4E2A\u6587\u4EF6\u7528\u4E8E\u5B9A\u4E49\u6211\u4EEC\u4EE3\u7801\u4E2D\u5E38\u7528\u7684\u4E00\u4E9B\u53D8\u91CF\uFF0C\u4F8B\u5982</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> INCREMENT </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">increment</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> DECREMENT </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">decrement</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><p>\u5C06\u8FD9\u4E24\u4E2A\u5355\u8BCD\u5199\u5728 <code>constant</code> \u6587\u4EF6\u4E2D\uFF0C\u5E76\u5BF9\u5916\u66B4\u9732\uFF0C\u5F53\u6211\u4EEC\u9700\u8981\u4F7F\u7528\u65F6\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5F15\u5165\u8FD9\u4E2A\u6587\u4EF6\uFF0C\u5E76\u76F4\u63A5\u4F7F\u7528\u5B83\u7684\u540D\u79F0\u5373\u53EF</p><p>\u76F4\u63A5\u4F7F\u7528 <code>INCREMENT</code> \u5373\u53EF</p><h2 id="_5-\u5B9E\u73B0\u5F02\u6B65-action" tabindex="-1">5. \u5B9E\u73B0\u5F02\u6B65 action <a class="header-anchor" href="#_5-\u5B9E\u73B0\u5F02\u6B65-action" aria-hidden="true">#</a></h2><p>\u4E00\u5F00\u59CB\uFF0C\u6211\u4EEC\u76F4\u63A5\u8C03\u7528\u4E00\u4E2A\u5F02\u6B65\u51FD\u6570\uFF0C\u8FD9\u867D\u7136\u6CA1\u6709\u4EC0\u4E48\u95EE\u9898\uFF0C\u4F46\u662F\u96BE\u9053 redux \u5C31\u4E0D\u53EF\u4EE5\u5B9E\u73B0\u4E86\u5417\uFF1F</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#82AAFF;">incrementAsync</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">selectNumber</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">count</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">setTimeout</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setState</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> count</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">count</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">500</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u6211\u4EEC\u53EF\u4EE5\u5148\u5C1D\u8BD5\u5C06\u5B83\u5C01\u88C5\u5230 <code>action</code> \u5BF9\u8C61\u4E2D\u8C03\u7528</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> createIncrementAsyncAction </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> time</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// \u65E0\u9700\u5F15\u5165 store \uFF0C\u5728\u8C03\u7528\u7684\u65F6\u5019\u662F\u7531 store \u8C03\u7528\u7684</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">dispatch</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">setTimeout</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#82AAFF;">dispatch</span><span style="color:#F07178;">(</span><span style="color:#82AAFF;">createIncrementAction</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">time</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u5F53\u6211\u4EEC\u70B9\u51FB\u5F02\u6B65\u52A0\u64CD\u4F5C\u65F6\uFF0C\u6211\u4EEC\u4F1A\u8C03\u7528\u8FD9\u4E2A\u51FD\u6570\uFF0C\u5728\u8FD9\u4E2A\u51FD\u6570\u91CC\u63A5\u6536\u4E00\u4E2A\u5EF6\u65F6\u52A0\u7684\u65F6\u95F4\uFF0C\u8FD8\u6709action\u6240\u9700\u7684\u6570\u636E\uFF0C\u548C\u539F\u5148\u7684\u533A\u522B\u53EA\u5728\u4E8E\u8FD4\u56DE\u7684\u65F6\u4E00\u4E2A\u5B9A\u65F6\u5668\u51FD\u6570</p><p>\u4F46\u662F\u5982\u679C\u4EC5\u4EC5\u8FD9\u6837\uFF0C\u5F88\u663E\u7136\u662F\u4F1A\u62A5\u9519\u7684\uFF0C\u5B83\u9ED8\u8BA4\u9700\u8981\u63A5\u6536\u4E00\u4E2A\u5BF9\u8C61</p><p>\u5982\u679C\u6211\u4EEC\u9700\u8981\u5B9E\u73B0\u4F20\u5165\u51FD\u6570\uFF0C\u90A3\u6211\u4EEC\u5C31\u9700\u8981\u544A\u8BC9\uFF1A\u4F60\u53EA\u9700\u8981\u9ED8\u9ED8\u7684\u5E2E\u6211\u6267\u884C\u4EE5\u4E0B\u8FD9\u4E2A\u51FD\u6570\u5C31\u597D\uFF01</p><p>\u8FD9\u65F6\u6211\u4EEC\u5C31\u9700\u8981\u5F15\u5165\u4E2D\u95F4\u4EF6\uFF0C\u5728\u539F\u751F\u7684 <code>redux</code> \u4E2D\u66B4\u9732\u51FA <code>applyMiddleware</code> \u4E2D\u95F4\u4EF6\u6267\u884C\u51FD\u6570\uFF0C\u5E76\u5F15\u5165 <code>redux-thunk</code> \u4E2D\u95F4\u4EF6\uFF08\u9700\u8981\u624B\u52A8\u4E0B\u8F7D\uFF09</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> thunk </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">redux-thunk</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><p>\u901A\u8FC7\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4F20\u9012\u4E0B\u53BB\u5C31\u53EF\u4EE5\u4E86</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createStore</span><span style="color:#A6ACCD;">(countReducer</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">applyMiddleware</span><span style="color:#A6ACCD;">(thunk))</span></span>
<span class="line"></span></code></pre></div><p>\u6CE8\u610F\uFF1A\u5F02\u6B65 action \u4E0D\u662F\u5FC5\u987B\u8981\u5199\u7684\uFF0C\u5B8C\u5168\u53EF\u4EE5\u81EA\u5DF1\u7B49\u5F85\u5F02\u6B65\u4EFB\u52A1\u7684\u7ED3\u679C\u540E\u518D\u53BB\u5206\u53D1\u540C\u6B65action</p><h2 id="_6-redux-\u4E09\u5927\u539F\u5219" tabindex="-1">6. Redux \u4E09\u5927\u539F\u5219 <a class="header-anchor" href="#_6-redux-\u4E09\u5927\u539F\u5219" aria-hidden="true">#</a></h2><p>\u7406\u89E3\u597D Redux \u6709\u52A9\u4E8E\u6211\u4EEC\u66F4\u597D\u7684\u7406\u89E3\u63A5\u4E0B\u6765\u7684 React -Redux</p><h3 id="\u7B2C\u4E00\u4E2A\u539F\u5219" tabindex="-1">\u7B2C\u4E00\u4E2A\u539F\u5219 <a class="header-anchor" href="#\u7B2C\u4E00\u4E2A\u539F\u5219" aria-hidden="true">#</a></h3><p><strong>\u5355\u5411\u6570\u636E\u6D41</strong>\uFF1A\u6574\u4E2A Redux \u4E2D\uFF0C\u6570\u636E\u6D41\u5411\u662F\u5355\u5411\u7684</p><p>UI \u7EC4\u4EF6 ---&gt; action ---&gt; store ---&gt; reducer ---&gt; store</p><h3 id="\u7B2C\u4E8C\u4E2A\u539F\u5219" tabindex="-1">\u7B2C\u4E8C\u4E2A\u539F\u5219 <a class="header-anchor" href="#\u7B2C\u4E8C\u4E2A\u539F\u5219" aria-hidden="true">#</a></h3><p><strong>state \u53EA\u8BFB</strong>\uFF1A\u5728 Redux \u4E2D\u4E0D\u80FD\u901A\u8FC7\u76F4\u63A5\u6539\u53D8 state \uFF0C\u6765\u63A7\u5236\u72B6\u6001\u7684\u6539\u53D8\uFF0C\u5982\u679C\u60F3\u8981\u6539\u53D8 state \uFF0C\u5219\u9700\u8981\u89E6\u53D1\u4E00\u6B21 action\u3002\u901A\u8FC7 action \u6267\u884C reducer</p><h3 id="\u7B2C\u4E09\u4E2A\u539F\u5219" tabindex="-1">\u7B2C\u4E09\u4E2A\u539F\u5219 <a class="header-anchor" href="#\u7B2C\u4E09\u4E2A\u539F\u5219" aria-hidden="true">#</a></h3><p><strong>\u7EAF\u51FD\u6570\u6267\u884C</strong>\uFF1A\u6BCF\u4E00\u4E2Areducer \u90FD\u662F\u4E00\u4E2A\u7EAF\u51FD\u6570\uFF0C\u4E0D\u4F1A\u6709\u4EFB\u4F55\u526F\u4F5C\u7528\uFF0C\u8FD4\u56DE\u662F\u4E00\u4E2A\u65B0\u7684 state\uFF0Cstate \u6539\u53D8\u4F1A\u89E6\u53D1 store \u4E2D\u7684 subscribe</p><h2 id="\u53C2\u8003\u8D44\u6599" tabindex="-1">\u53C2\u8003\u8D44\u6599 <a class="header-anchor" href="#\u53C2\u8003\u8D44\u6599" aria-hidden="true">#</a></h2><p><a href="https://juejin.cn/post/6844903998139400200" target="_blank" rel="noopener noreferrer">Redux + React-router \u7684\u5165\u95E8\u{1F4D6}\u548C\u914D\u7F6E\u{1F469}\u{1F3FE}\u200D\u{1F4BB}\u6559\u7A0B</a></p><p>\u5C0F\u518C\uFF1A<a href="https://juejin.cn/book/6945998773818490884" target="_blank" rel="noopener noreferrer">React \u8FDB\u9636\u5B9E\u8DF5\u6307\u5357</a></p><hr><blockquote><p>\u975E\u5E38\u611F\u8C22\u60A8\u7684\u9605\u8BFB\uFF0C\u6B22\u8FCE\u63D0\u51FA\u4F60\u7684\u610F\u89C1\uFF0C\u6709\u4EC0\u4E48\u95EE\u9898\u6B22\u8FCE\u6307\u51FA\uFF0C\u8C22\u8C22\uFF01\u{1F388}</p></blockquote>`,81);function g(x,_,f,m,R,v){const a=c("font");return r(),l("div",null,[d,s("blockquote",null,[s("p",null,[F,n(a,{color:"#2e86de"},{default:o(()=>[i]),_:1})]),D,A,s("p",null,[C,n(a,{color:"#f368e0"},{default:o(()=>[u]),_:1})])]),h])}var j=p(y,[["render",g]]);export{b as __pageData,j as default};
