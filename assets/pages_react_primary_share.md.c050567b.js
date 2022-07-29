import{_ as s,c as n,o as a,a as o}from"./app.33e79bae.js";const i=JSON.parse('{"title":"React \u5165\u95E8\u5B66\u4E60\uFF08\u5341\u516D\uFF09-- \u6570\u636E\u5171\u4EAB","description":"\u5F15\u8A00 \u5728\u5199\u5B8C\u4E86\u57FA\u672C\u7684 Redux \u6848\u4F8B\u4E4B\u540E\uFF0C\u53EF\u4EE5\u5C1D\u8BD5\u4E00\u4E9B\u66F4\u5B9E\u6218\u6027\u7684\u64CD\u4F5C\uFF0C\u6BD4\u5982\u53EF\u4EE5\u8BD5\u8BD5\u591A\u7EC4\u4EF6\u95F4\u7684\u72B6\u6001\u4F20\u9012\uFF0C\u76F8\u4E92\u4E4B\u95F4\u7684\u4EA4\u4E92","frontmatter":{"title":"React \u5165\u95E8\u5B66\u4E60\uFF08\u5341\u516D\uFF09-- \u6570\u636E\u5171\u4EAB","date":"2021-09-11T10:36:38.000Z","id":1635582998,"tags":["react"],"categories":["React\u5165\u95E8\u5B66\u4E60"],"keywords":"react,\u6570\u636E\u5171\u4EAB,\u5C0F\u4E1E\u540C\u5B66","description":"\u5F15\u8A00 \u5728\u5199\u5B8C\u4E86\u57FA\u672C\u7684 Redux \u6848\u4F8B\u4E4B\u540E\uFF0C\u53EF\u4EE5\u5C1D\u8BD5\u4E00\u4E9B\u66F4\u5B9E\u6218\u6027\u7684\u64CD\u4F5C\uFF0C\u6BD4\u5982\u53EF\u4EE5\u8BD5\u8BD5\u591A\u7EC4\u4EF6\u95F4\u7684\u72B6\u6001\u4F20\u9012\uFF0C\u76F8\u4E92\u4E4B\u95F4\u7684\u4EA4\u4E92"},"headers":[{"level":2,"title":"\u5F15\u8A00","slug":"\u5F15\u8A00"},{"level":2,"title":"1. \u7F16\u5199 Person \u7EC4\u4EF6","slug":"_1-\u7F16\u5199-person-\u7EC4\u4EF6"},{"level":2,"title":"2. \u7F16\u5199 reducer","slug":"_2-\u7F16\u5199-reducer"},{"level":2,"title":"3. \u6253\u901A\u6570\u636E\u5171\u4EAB","slug":"_3-\u6253\u901A\u6570\u636E\u5171\u4EAB"},{"level":2,"title":"4. \u6700\u7EC8\u4F18\u5316","slug":"_4-\u6700\u7EC8\u4F18\u5316"},{"level":2,"title":"5. \u9879\u76EE\u6253\u5305","slug":"_5-\u9879\u76EE\u6253\u5305"}],"relativePath":"pages/react/primary/share.md"}'),p={name:"pages/react/primary/share.md"},l=o(`<p><img src="https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E6%95%B0%E6%8D%AE%E5%85%B1%E4%BA%AB.gif" alt="\u6570\u636E\u5171\u4EAB"></p><blockquote><p>\u{1F4E2} \u5927\u5BB6\u597D\uFF0C\u6211\u662F\u5C0F\u4E1E\u540C\u5B66\uFF0C\u4E00\u540D<div color="#2e86de"><strong>\u5927\u4E8C\u7684\u524D\u7AEF\u7231\u597D\u8005</strong></div></p><p>\u{1F4E2} \u8FD9\u7BC7\u6587\u7AE0\u662F\u5B66\u4E60 React-Redux \u6570\u636E\u5171\u4EAB \u7684\u5B66\u4E60\u7B14\u8BB0</p><p>\u{1F4E2} \u975E\u5E38\u611F\u8C22\u4F60\u7684\u9605\u8BFB\uFF0C\u4E0D\u5BF9\u7684\u5730\u65B9\u6B22\u8FCE\u6307\u6B63 \u{1F64F}</p><p>\u{1F4E2} <div color="#f368e0"><strong>\u613F\u4F60\u5FE0\u4E8E\u81EA\u5DF1\uFF0C\u70ED\u7231\u751F\u6D3B</strong></div></p></blockquote><h2 id="\u5F15\u8A00" tabindex="-1">\u5F15\u8A00 <a class="header-anchor" href="#\u5F15\u8A00" aria-hidden="true">#</a></h2><p>\u5728\u5199\u5B8C\u4E86\u57FA\u672C\u7684 Redux \u6848\u4F8B\u4E4B\u540E\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5C1D\u8BD5\u4E00\u4E9B\u66F4\u5B9E\u6218\u6027\u7684\u64CD\u4F5C\uFF0C\u6BD4\u5982\u6211\u4EEC\u53EF\u4EE5\u8BD5\u8BD5\u591A\u7EC4\u4EF6\u95F4\u7684\u72B6\u6001\u4F20\u9012\uFF0C\u76F8\u4E92\u4E4B\u95F4\u7684\u4EA4\u4E92</p><p><img src="https://ljcimg.oss-cn-beijing.aliyuncs.com/img/react-redux-demo.gif" alt="react-redux-demo"></p><p>\u5982\u4E0A\u52A8\u56FE\u6240\u793A\uFF0C\u6211\u4EEC\u60F3\u8981\u5B9E\u73B0\u4E0A\u9762\u7684\u6848\u4F8B\uFF0C\u91C7\u7528\u7EAF React \u6765\u5B9E\u73B0\u662F\u6BD4\u8F83\u56F0\u96BE\u7684\uFF0C\u6211\u4EEC\u9700\u8981<strong>\u5F88\u591A\u5C42\u7684\u6570\u636E\u4EA4\u6362</strong>\u624D\u80FD\u5B9E\u73B0\uFF0C\u4F46\u662F\u6211\u4EEC\u5982\u679C\u91C7\u7528 Redux \u6765\u5B9E\u73B0\u4F1A\u53D8\u5F97\u975E\u5E38\u7B80\u5355</p><p>\u56E0\u4E3A Redux <strong>\u6253\u901A\u4E86\u7EC4\u4EF6\u95F4\u7684\u9694\u9602</strong>\uFF0C\u6211\u4EEC\u53EF\u4EE5\u81EA\u7531\u7684\u8FDB\u884C\u6570\u636E\u4EA4\u6362\uFF0C\u6240\u6709\u5B58\u653E\u5728 <code>store</code> \u4E2D\u7684\u6570\u636E\u90FD\u53EF\u4EE5\u5B9E\u73B0\u5171\u4EAB\uFF0C\u90A3\u6211\u4EEC\u63A5\u4E0B\u6765\u770B\u770B\u5982\u4F55\u5B9E\u73B0\u7684\u5427~</p><h2 id="_1-\u7F16\u5199-person-\u7EC4\u4EF6" tabindex="-1">1. \u7F16\u5199 Person \u7EC4\u4EF6 <a class="header-anchor" href="#_1-\u7F16\u5199-person-\u7EC4\u4EF6" aria-hidden="true">#</a></h2><blockquote><p>\u4E0A\u9762\u7684 Count \u7EC4\u4EF6\uFF0C\u5DF2\u7ECF\u5728\u524D\u9762\u51E0\u7BC7\u5199\u8FC7\u4E86\uFF0C\u4F46\u662F\u6211\u6CA1\u6709\u8BB0\u5F55\u8BE6\u7EC6\u7684\u5B9E\u73B0\u8FC7\u7A0B\uFF0C\u53EA\u662F\u505A\u4E86\u4E00\u4E9B\u5C0F\u5C0F\u7684\u603B\u7ED3\uFF08\u6211\u6478\u9C7C\u4E86\uFF09</p></blockquote><p>\u4E0D\u7BA1\u5982\u4F55\uFF0C\u6211\u4EEC\u5148\u6765\u5B9E\u73B0\u4E00\u4E2A Person \u7EC4\u4EF6\u5427</p><p>\u9996\u5148\u6211\u4EEC\u9700\u8981\u5728 <code>containers</code> \u6587\u4EF6\u5939\u4E0B\u7F16\u5199 Person \u7EC4\u4EF6\u7684<strong>\u5BB9\u5668\u7EC4\u4EF6</strong></p><p>\u5982\u4F55\u7F16\u5199\u4E00\u4E2A\u5BB9\u5668\u7EC4\u4EF6\u5462\uFF1F\uFF08\u4E0A\u4E00\u7BC7\u4E5F\u8BB2\u8FC7\u4E86\uFF09</p><p>\u9996\u5148\u6211\u4EEC\u9700\u8981\u7F16\u5199 <code>index.jsx</code> \u6587\u4EF6\uFF0C\u5728\u8FD9\u4E2A\u6587\u4EF6\u91CC\u9762\u7F16\u5199 Person \u7EC4\u4EF6\u7684 <strong>UI \u7EC4\u4EF6</strong>\uFF0C\u5E76\u4F7F\u7528 <code>connect</code> \u51FD\u6570\u5C06\u5B83\u5305\u88C5\uFF0C<strong>\u6620\u5C04\u5B83\u7684\u72B6\u6001\u548C\u65B9\u6CD5</strong></p><h4 id="\u7F16\u5199-ui-\u7EC4\u4EF6\u67B6\u6784" tabindex="-1"><strong>\u7F16\u5199 UI \u7EC4\u4EF6\u67B6\u6784</strong> <a class="header-anchor" href="#\u7F16\u5199-ui-\u7EC4\u4EF6\u67B6\u6784" aria-hidden="true">#</a></h4><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h2</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">\u6211\u662F Person \u7EC4\u4EF6,\u4E0A\u65B9\u7EC4\u4EF6\u6C42\u548C\u4E3A:</span><span style="color:#89DDFF;">{this.</span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">countAll</span><span style="color:#89DDFF;">}&lt;/</span><span style="color:#F07178;">h2</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">ref</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">c </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">nameNode </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> c</span><span style="color:#89DDFF;">} </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">placeholder</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\u8F93\u5165\u540D\u5B57</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">ref</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">c </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">ageNode </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> c</span><span style="color:#89DDFF;">} </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">placeholder</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\u8F93\u5165\u5E74\u9F84</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">onClick</span><span style="color:#89DDFF;">={this.</span><span style="color:#A6ACCD;">addPerson</span><span style="color:#89DDFF;">}&gt;</span><span style="color:#A6ACCD;">\u6DFB\u52A0</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">ul</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">persons</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">li</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">key</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">}&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">--</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">age</span><span style="color:#89DDFF;">}&lt;/</span><span style="color:#F07178;">li</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">ul</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>\u6211\u4EEC\u53EF\u4EE5\u770B\u5230\u8FD9\u91CC\u91C7\u7528\u4E86 <code>ref</code> \u6765\u83B7\u53D6\u5230\u5F53\u524D\u4E8B\u4EF6\u89E6\u53D1\u7684\u8282\u70B9\uFF0C\u5E76\u901A\u8FC7 <code>this.addPerson</code> \u7684\u65B9\u5F0F\u7ED9\u6309\u94AE\u7ED1\u5B9A\u4E86\u4E00\u4E2A\u70B9\u51FB\u4E8B\u4EF6</p><h4 id="\u7F16\u5199\u70B9\u51FB\u4E8B\u4EF6\u56DE\u8C03" tabindex="-1"><strong>\u7F16\u5199\u70B9\u51FB\u4E8B\u4EF6\u56DE\u8C03</strong> <a class="header-anchor" href="#\u7F16\u5199\u70B9\u51FB\u4E8B\u4EF6\u56DE\u8C03" aria-hidden="true">#</a></h4><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#82AAFF;">addPerson</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">nameNode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">age</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">ageNode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">personObj</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> id</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">nanoid</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">age</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">personObj</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">nameNode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">ageNode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u5728\u8FD9\u91CC\u6211\u4EEC\u9700\u8981\u5904\u7406\u8F93\u5165\u6846\u4E2D\u7684\u6570\u636E\uFF0C\u5E76\u4E14\u5C06\u8FD9\u4E9B\u6570\u636E\u7528\u4E8E\u521B\u5EFA\u4E00\u4E2A <code>action</code> \u5BF9\u8C61\uFF0C\u4F20\u9012\u7ED9 <code>store</code> \u8FDB\u884C\u72B6\u6001\u7684\u66F4\u65B0</p><p>\u5728\u8FD9\u91CC\u6211\u4EEC\u9700\u8981\u56DE\u987E\u7684\u662F\uFF0C\u8FD9\u91CC\u6211\u4EEC\u4F7F\u7528\u4E86\u4E00\u4E2A <code>nanoid</code> \u5E93\uFF0C\u8FD9\u4E2A\u5E93\u6211\u4EEC\u4E4B\u524D\u4E5F\u6709\u4F7F\u7528\u8FC7</p><h5 id="\u4E0B\u8F7D\uFF0C\u5F15\u5165\uFF0C\u66B4\u9732" tabindex="-1"><strong>\u4E0B\u8F7D\uFF0C\u5F15\u5165\uFF0C\u66B4\u9732</strong> <a class="header-anchor" href="#\u4E0B\u8F7D\uFF0C\u5F15\u5165\uFF0C\u66B4\u9732" aria-hidden="true">#</a></h5><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nanoid</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nanoid</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><p>\u66B4\u9732\u7684 <code>nanoid</code> \u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u6211\u4EEC\u6BCF\u4E00\u6B21\u8C03\u7528\u65F6\uFF0C\u90FD\u4F1A\u8FD4\u56DE\u4E00\u4E2A\u4E0D\u91CD\u590D\u7684\u6570\uFF0C\u7528\u4E8E\u786E\u4FDD <code>id</code> \u7684\u552F\u4E00\u6027\uFF0C\u540C\u65F6\u5728\u540E\u9762\u7684 <code>map</code> \u904D\u5386\u7684\u8FC7\u7A0B\u4E2D\uFF0C\u6211\u4EEC\u5C06 <code>id</code> \u4F5C\u4E3A\u4E86 <code>key</code> \u503C\uFF0C\u8FD9\u6837\u4E5F\u786E\u4FDD\u4E86 <code>key</code> \u7684\u552F\u4E00\u6027\uFF0C\u5173\u4E8E <code>key</code> \u7684\u4F5C\u7528\uFF0C\u53EF\u4EE5\u770B\u770B <code>diffing</code> \u7B97\u6CD5\u7684\u6587\u7AE0</p><h4 id="\u72B6\u6001\u7BA1\u7406" tabindex="-1"><strong>\u72B6\u6001\u7BA1\u7406</strong> <a class="header-anchor" href="#\u72B6\u6001\u7BA1\u7406" aria-hidden="true">#</a></h4><p>\u5728\u8FD9\u91CC\u6211\u4EEC\u9700\u8981\u975E\u5E38\u719F\u7EC3\u7684\u91C7\u7528 <code>this.props.add</code> \u7684\u65B9\u5F0F\u6765\u66F4\u65B0\u72B6\u6001</p><p>\u90A3\u4E48\u5B83\u662F\u5982\u4F55\u5B9E\u73B0\u72B6\u6001\u66F4\u65B0\u7684\u5462\uFF1F\u6211\u4EEC\u6765\u770B\u770B</p><p>\u5728\u6211\u4EEC\u8C03\u7528 <code>connect</code> \u51FD\u6570\u65F6\uFF0C\u6211\u4EEC\u7B2C\u4E00\u6B21\u8C03\u7528\u65F6\u4F20\u5165\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\uFF0C\u5C31\u662F\u7528\u4E8E\u4F20\u9012\u65B9\u6CD5\u7684\uFF0C\u6211\u4EEC\u4F20\u9012\u4E86\u4E00\u4E2A <code>add</code> \u65B9\u6CD5</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">connect</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    state </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">persons</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">person</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">countAll</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span><span style="color:#676E95;font-style:italic;">//\u6620\u5C04\u72B6\u6001</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">add</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> createAddPersonAction </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">)(Person)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>\u5B83\u7684\u539F\u8BCD\u662F\uFF1A<strong>mapDispatchToProps</strong></p><p>\u6211\u7684\u7406\u89E3\u662F\uFF0C\u4F20\u5165\u7684\u4E1C\u897F\u4F1A\u88AB\u6620\u5C04\u6620\u5C04\u6210 <code>props</code> \u5BF9\u8C61\u4E0B\u7684\u65B9\u6CD5\uFF0C\u8FD9\u4E5F\u662F\u6211\u4EEC\u80FD\u591F\u5728 <code>props</code> \u4E0B\u8BBF\u95EE\u5230 <code>add</code> \u65B9\u6CD5\u7684\u539F\u56E0</p><blockquote><p>\u5BF9\u4E8E\u8FD9\u4E00\u5757 <code>connect</code> \uFF0C\u6211\u4EEC\u5FC5\u987B\u8981\u80FD\u591F\u5F62\u6210\u81EA\u5DF1\u7684\u7406\u89E3\uFF0C\u8FD9\u91CC\u975E\u5E38\u7684\u91CD\u8981\uFF0C\u5B83\u5B9E\u73B0\u4E86\u6570\u636E\u7684\u4EA4\u4E92\uFF0C\u4E0D\u81F3\u4E8E\u4E00\u4E2A\u7EC4\u4EF6\uFF0C\u800C\u662F\u5168\u90E8\u7EC4\u4EF6</p></blockquote><h4 id="\u6211\u662F\u5982\u4F55\u7406\u89E3\u7684\u5462\uFF1F" tabindex="-1"><strong>\u6211\u662F\u5982\u4F55\u7406\u89E3\u7684\u5462\uFF1F</strong> <a class="header-anchor" href="#\u6211\u662F\u5982\u4F55\u7406\u89E3\u7684\u5462\uFF1F" aria-hidden="true">#</a></h4><blockquote><p>\u60F3\u8C61\u4E00\u4E2A store \u4ED3\u5E93\uFF0C\u5728\u6211\u4EEC\u8FD9\u4E2A\u6848\u4F8B\u5F53\u4E2D\uFF0CCount \u7EC4\u4EF6\u9700\u8981\u5B58\u653E count \u503C\u5728 store \u4E2D\uFF0CPerson \u7EC4\u4EF6\u9700\u8981\u5B58\u653E\u65B0\u589E\u7528\u6237\u5BF9\u8C61\u5728 store \u4E2D\uFF0C\u6211\u4EEC\u8981\u628A\u8FD9\u4E24\u4E2A\u6570\u636E\u5B58\u653E\u5728\u4E00\u4E2A\u5BF9\u8C61\u5F53\u4E2D\u3002\u5F53\u67D0\u4E2A\u7EC4\u4EF6\u9700\u8981\u4F7F\u7528 store \u4E2D\u7684\u503C\u65F6\uFF0C\u53EF\u4EE5\u901A\u8FC7 connect \u4E2D\u7684\u4E24\u4E2A\u53C2\u6570\u6765\u83B7\u53D6\uFF0C\u4F8B\u5982\u8FD9\u91CC\u6211\u4EEC\u9700\u8981\u4F7F\u7528\u5230 Count \u7EC4\u4EF6\u7684\u503C\uFF0C\u53EF\u4EE5\u901A\u8FC7 <code>.count</code> \u6765\u4ECE store \u4E2D\u53D6\u503C\u3002</p></blockquote><p>\u4E5F\u5C31\u662F\u8BF4\uFF0C\u6240\u6709\u7684\u503C\u90FD\u5B58\u653E\u5728 store \u5F53\u4E2D\uFF0C\u901A\u8FC7\u70B9\u8FD0\u7B97\u7B26\u6765\u83B7\u53D6\uFF0C\u6240\u6709\u7684\u64CD\u4F5C store \u7684\u65B9\u6CD5\u90FD\u9700\u8981\u901A\u8FC7 action \u6765\u5B9E\u73B0\u3002<strong>\u5F53\u524D\u7EC4\u4EF6\u9700\u8981\u4F7F\u7528\u7684\u6570\u636E\u90FD\u9700\u8981\u5728 <code>connect</code> \u4E2D\u66B4\u9732</strong></p><h2 id="_2-\u7F16\u5199-reducer" tabindex="-1">2. \u7F16\u5199 reducer <a class="header-anchor" href="#_2-\u7F16\u5199-reducer" aria-hidden="true">#</a></h2><p>\u9996\u5148\uFF0C\u6211\u4EEC\u9700\u8981\u660E\u786E reducer \u7684\u4F5C\u7528\uFF0C\u5B83\u662F\u7528\u6765\u5E72\u4EC0\u4E48\u7684\uFF1F</p><p><strong>\u6839\u636E\u64CD\u4F5C\u7C7B\u578B\u6765\u6307\u5B9A\u72B6\u6001\u7684\u66F4\u65B0</strong></p><p>\u4E5F\u5C31\u662F\u8BF4\u5F53\u6211\u4EEC\u70B9\u51FB\u4E86<strong>\u6DFB\u52A0\u6309\u94AE</strong>\u540E\uFF0C\u4F1A\u5C06\u8F93\u5165\u6846\u4E2D\u7684\u6570\u636E\u6574\u5408\u6210\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u4F5C\u4E3A\u5F53\u524D action \u5BF9\u8C61\u7684 data \u4F20\u9012\u7ED9 reducer</p><p>\u6211\u4EEC\u53EF\u4EE5\u770B\u770B\u6211\u4EEC\u7F16\u5199\u7684 action \u6587\u4EF6\uFF0C\u548C\u6211\u4EEC\u60F3\u7684\u4E00\u6837</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ADD_PERSON</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../constant</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// \u521B\u5EFA\u4E00\u4E2A\u4EBA\u7684action \u5BF9\u8C61</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> createAddPersonAction </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">personObj</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> ADD_PERSON</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> personObj</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>\u5F53 reducer \u63A5\u6536\u5230 action \u5BF9\u8C61\u65F6\uFF0C\u4F1A\u5BF9 type \u8FDB\u884C\u5224\u65AD</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">personReducer</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">preState </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> initState</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> action</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">type</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">action</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">switch</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">type</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">case</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ADD_PERSON</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> [</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">,...</span><span style="color:#A6ACCD;">preState</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">preState</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u4E00\u822C\u90FD\u91C7\u7528 <code>switch</code> \u6765\u7F16\u5199</p><p><strong>\u8FD9\u91CC\u6709\u4E2A\u503C\u5F97\u6CE8\u610F\u7684\u5730\u65B9\u662F</strong>\uFF0C\u8FD9\u4E2A <code>personReducer</code> \u51FD\u6570\u662F\u4E00\u4E2A\u7EAF\u51FD\u6570\uFF0C\u4EC0\u4E48\u662F\u7EAF\u51FD\u6570\u5462\uFF1F\u8FD9\u4E2A\u662F\u9AD8\u9636\u51FD\u6570\u90E8\u5206\u7684\u77E5\u8BC6\u4E86\uFF0C\u7EAF<strong>\u51FD\u6570\u662F\u4E00\u4E2A\u4E0D\u6539\u53D8\u53C2\u6570\u7684\u51FD\u6570\uFF0C\u4E5F\u5C31\u662F\u8BF4\uFF0C\u4F20\u5165\u7684\u53C2\u6570\u662F\u4E0D\u80FD\u88AB\u6539\u53D8\u7684\u3002</strong></p><p>\u4E3A\u4EC0\u4E48\u8981\u63D0\u8FD9\u4E2A\u5462\uFF1F\u5728\u6211\u4EEC return \u65F6\uFF0C\u6709\u65F6\u5019\u4F1A\u60F3\u901A\u8FC7<strong>\u6570\u7EC4\u7684 API</strong> \u6765\u5728\u6570\u7EC4\u524D\u9762\u585E\u4E00\u4E2A\u503C\uFF0C\u4E0D\u4E5F\u53EF\u4EE5\u5417\uFF1F</p><p>\u4F46\u662F\u6211\u4EEC\u8981\u91C7\u7528 <code>unshirt</code> \u65B9\u6CD5\uFF0C\u8FD9\u4E2A\u65B9\u6CD5\u662F\u4F1A\u6539\u53D8\u539F\u6570\u7EC4\u7684\uFF0C\u4E5F\u5C31\u662F\u6211\u4EEC\u4F20\u5165\u7684\u53C2\u6570\u4F1A\u88AB\u6539\u53D8\uFF0C\u56E0\u6B64\u8FD9\u6837\u7684\u65B9\u6CD5\u662F\u4E0D\u53EF\u884C\u7684\uFF01</p><h2 id="_3-\u6253\u901A\u6570\u636E\u5171\u4EAB" tabindex="-1">3. \u6253\u901A\u6570\u636E\u5171\u4EAB <a class="header-anchor" href="#_3-\u6253\u901A\u6570\u636E\u5171\u4EAB" aria-hidden="true">#</a></h2><p>\u5199\u5230\u8FD9\u91CC\uFF0C\u6216\u8BB8\u5DF2\u7ECF\u5199\u5B8C\u4E86\uFF0C\u4F46\u662F\u6709\u4E9B\u7EC6\u8282\u8FD8\u662F\u9700\u8981\u6CE8\u610F\u4E00\u4E0B</p><p>\u91C7\u7528 Redux \u6765\u8FDB\u884C\u7EC4\u4EF6\u7684\u6570\u636E\u4EA4\u4E92\u771F\u7684\u633A\u65B9\u4FBF\u3002</p><p>\u6211\u4EEC\u53EF\u4EE5\u5728 Count \u7EC4\u4EF6\u4E2D\u5F15\u5165 Person \u7EC4\u4EF6\u5B58\u5728 store \u4E2D\u7684\u72B6\u6001\u3002</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">connect</span><span style="color:#A6ACCD;">(state </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">personNum</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">)(Count)</span></span>
<span class="line"></span></code></pre></div><p>\u5728\u8FD9\u91CC\u6211\u4EEC\u5C06 store \u4E2D\u7684 person \u6570\u7EC4\u7684\u957F\u5EA6\u66B4\u9732\u51FA\u6765\u8FD9\u6837 Count \u7EC4\u4EF6\u5C31\u53EF\u4EE5\u76F4\u63A5\u901A\u8FC7 props \u6765\u4F7F\u7528\u4E86</p><p>\u540C\u6837\u7684\u6211\u4EEC\u4E5F\u53EF\u4EE5\u5728 Person \u7EC4\u4EF6\u4E2D\u4F7F\u7528 Count \u7EC4\u4EF6\u7684\u503C</p><p>\u4ECE\u800C\u5B9E\u73B0\u4E86\u6211\u4EEC\u7684\u8FD9\u4E2A Demo</p><h2 id="_4-\u6700\u7EC8\u4F18\u5316" tabindex="-1">4. \u6700\u7EC8\u4F18\u5316 <a class="header-anchor" href="#_4-\u6700\u7EC8\u4F18\u5316" aria-hidden="true">#</a></h2><ol><li>\u5229\u7528\u5BF9\u8C61\u7684\u7B80\u5199\u65B9\u6CD5\uFF0C\u5C06\u952E\u540D\u548C\u952E\u503C\u540C\u540D\uFF0C\u4ECE\u800C\u53EA\u5199\u4E00\u4E2A\u540D\u5373\u53EF</li><li>\u5408\u5E76 reducer \uFF0C\u6211\u4EEC\u53EF\u4EE5\u5C06\u591A\u4E2A reducer\u6587\u4EF6 \u5199\u5728\u4E00\u4E2A index \u6587\u4EF6\u5F53\u4E2D\uFF0C\u9700\u8981\u91C7\u7528 <code>combineReducers</code> \u6765\u5408\u5E76</li></ol><h2 id="_5-\u9879\u76EE\u6253\u5305" tabindex="-1">5. \u9879\u76EE\u6253\u5305 <a class="header-anchor" href="#_5-\u9879\u76EE\u6253\u5305" aria-hidden="true">#</a></h2><p>\u6267\u884C <code>npm run build</code> \u547D\u4EE4\uFF0C\u5373\u53EF\u6253\u5305\u9879\u76EE\uFF0C\u6253\u5305\u5B8C\u6210\u540E\uFF0C\u4F1A\u751F\u6210\u4E00\u4E2A <code>build</code> \u6587\u4EF6\uFF0C\u8FD9\u4E2A\u6587\u4EF6\u6211\u4EEC\u9700\u8981\u90E8\u7F72\u5230\u670D\u52A1\u5668\u4E0A\u624D\u80FD\u8FD0\u884C</p><p>\u6211\u4EEC\u53EF\u4EE5\u653E\u5728\u81EA\u5DF1\u7684\u670D\u52A1\u5668\u4E0A\u5373\u53EF</p><p>\u4F46\u662F\u6211\u9047\u5230\u4E86\u4E00\u4E2A\u95EE\u9898</p><p>\u6253\u5305\u540E\u7684\u6587\u4EF6\u8DEF\u5F84\u5C11\u4E86\u4E00\u4E2A <code>.</code> \u5BFC\u81F4\u6587\u4EF6\u65E0\u6CD5\u627E\u5230\uFF0C\u62A5\u9519\u65E0\u6CD5\u6267\u884C\uFF0C\u6211\u901A\u8FC7\u624B\u52A8\u6DFB\u52A0\u7684\u65B9\u5F0F\u89E3\u51B3\u4E86\uFF0C\u4E0D\u77E5\u9053\u8FD8\u6709\u6CA1\u6709\u4EC0\u4E48\u5176\u4ED6\u65B9\u6CD5\u89E3\u51B3</p><p><img src="https://ljcimg.oss-cn-beijing.aliyuncs.com/img/react-redux-demo.gif" alt="react-redux-demo"></p><blockquote><p>\u4E5F\u53EF\u4EE5\u91C7\u7528 <code>npm i serve -g</code> \u5B89\u88C5\uFF0C\u5982\u4F55\u901A\u8FC7 serve &#39;\u6307\u5B9A\u6587\u4EF6\u5939&#39; \u6765\u6267\u884C</p></blockquote><hr><blockquote><p>\u975E\u5E38\u611F\u8C22\u60A8\u7684\u9605\u8BFB\uFF0C\u6B22\u8FCE\u63D0\u51FA\u4F60\u7684\u610F\u89C1\uFF0C\u6709\u4EC0\u4E48\u95EE\u9898\u6B22\u8FCE\u6307\u51FA\uFF0C\u8C22\u8C22\uFF01\u{1F388}</p></blockquote>`,65),e=[l];function t(c,r,D,y,F,A){return a(),n("div",null,e)}var d=s(p,[["render",t]]);export{i as __pageData,d as default};
