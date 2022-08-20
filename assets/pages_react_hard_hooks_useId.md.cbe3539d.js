import{_ as s,c as n,o as a,a as l}from"./app.6c056f52.js";var p="/assets/useid.310ebe80.png",o="/assets/useid-tree.50225b14.svg";const u=JSON.parse('{"title":"useId \u6E90\u7801\u89E3\u6790","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4F7F\u7528\u573A\u666F","slug":"\u4F7F\u7528\u573A\u666F"},{"level":2,"title":"\u4F7F\u7528\u65B9\u5F0F","slug":"\u4F7F\u7528\u65B9\u5F0F"},{"level":2,"title":"mount \u9636\u6BB5","slug":"mount-\u9636\u6BB5"},{"level":3,"title":"getTreeId","slug":"gettreeid"},{"level":2,"title":"update \u9636\u6BB5","slug":"update-\u9636\u6BB5"}],"relativePath":"pages/react/hard/hooks/useId.md"}'),e={name:"pages/react/hard/hooks/useId.md"},t=l(`<h1 id="useid-\u6E90\u7801\u89E3\u6790" tabindex="-1">useId \u6E90\u7801\u89E3\u6790 <a class="header-anchor" href="#useid-\u6E90\u7801\u89E3\u6790" aria-hidden="true">#</a></h1><p>\u8FD9\u662F\u5728 React v18 \u7248\u672C\u4E2D\u65B0\u589E\u7684\u4E00\u4E2A hooks\u3002\u5B83\u7684\u51FA\u73B0\u662F\u4E3A\u4E86\u89E3\u51B3\u4E00\u4E9B\u5728 SSR \u573A\u666F\u4E0B\uFF0C\u56E0\u4E3A\u670D\u52A1\u7AEF\u751F\u6210\u968F\u673A id \u548C\u5BA2\u6237\u7AEF\u751F\u6210\u968F\u673A id \u4E0D\u4E00\u81F4\u7684\u95EE\u9898\uFF0C\u5BFC\u81F4\u4E86\u5BA2\u6237\u7AEF\u91CD\u65B0\u6E32\u67D3</p><div class="warning custom-block"><p class="custom-block-title">\u91CD\u8981</p><p>useId \u662F\u4E00\u4E2A\u7528\u4E8E\u751F\u6210\u6A2A\u8DE8\u670D\u52A1\u7AEF\u548C\u5BA2\u6237\u7AEF\u7684\u7A33\u5B9A\u7684\u552F\u4E00 ID \u7684\u540C\u65F6\u907F\u514D hydration \u4E0D\u5339\u914D\u7684 hook\u3002</p></div><h2 id="\u4F7F\u7528\u573A\u666F" tabindex="-1">\u4F7F\u7528\u573A\u666F <a class="header-anchor" href="#\u4F7F\u7528\u573A\u666F" aria-hidden="true">#</a></h2><p>\u5982\u679C\u662F CSR \u573A\u666F\uFF0Cid \u662F\u7A33\u5B9A\u7684\uFF0C\u4E0D\u4F1A\u6709\u4EC0\u4E48\u95EE\u9898\u51FA\u73B0</p><p>\u5728 useId \u51FA\u73B0\u4E4B\u524D\uFF0C\u4F1A\u6709\u8FD9\u6837\u7684\u60C5\u51B5\u51FA\u73B0</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> id </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Math</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">random</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">App</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">}&gt;</span><span style="color:#A6ACCD;">Hello useId</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u5F53\u6211\u4EEC\u91C7\u7528 <code>Math.random()</code> \u6765\u751F\u6210\u968F\u673A id \u65F6\uFF0C\u7531\u4E8E\u91C7\u7528\u7684 SSR\uFF0C\u5728\u670D\u52A1\u7AEF\u4F1A\u751F\u6210\u4E00\u6B21\u968F\u673A id\uFF0C\u5C06 <code>jsx</code> \u8F6C\u6210 <code>html</code> string \u4F20\u9012\u7ED9\u5BA2\u6237\u7AEF\uFF0C\u4F5C\u4E3A\u9996\u5C4F\u6E32\u67D3</p><p>\u5728\u5BA2\u6237\u7AEF\u6E32\u67D3\u65F6\uFF0C\u751F\u6210\u968F\u673A id\uFF0C\u8FD9\u4E00\u6B65\u53EB hydrate</p><p>\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u4EA7\u751F\u7684 Id \u4E0D\u4E00\u81F4</p><p>useId \u7684\u8BDE\u751F\u5C31\u662F\u4E3A\u4E86\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF0C\u90A3\u4E48\u662F\u5982\u4F55\u4F7F\u7528\u7684\u5462\uFF1F</p><h2 id="\u4F7F\u7528\u65B9\u5F0F" tabindex="-1">\u4F7F\u7528\u65B9\u5F0F <a class="header-anchor" href="#\u4F7F\u7528\u65B9\u5F0F" aria-hidden="true">#</a></h2><p>\u4E00\u4E2A\u6700\u7B80\u5355\u7684\u4F8B\u5B50\uFF0C\u53EA\u9700\u8981\u4F7F\u7528 <code>useId</code> \u6765\u751F\u6210\u7A33\u5B9A\u7684 Id\uFF0C\u76F4\u63A5\u4F20\u9012 id \u7ED9\u9700\u8981\u5B83\u7684\u5143\u7D20\u5373\u53EF\uFF0C\u4F7F\u7528\u8D77\u6765\u975E\u5E38\u65B9\u4FBF\u7B80\u5355</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> id </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useId</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">App</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">}&gt;</span><span style="color:#A6ACCD;">Hello useId</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u5BF9\u4E8E\u540C\u4E00\u7EC4\u4EF6\u4E2D\u7684\u591A\u4E2A ID\uFF0C\u4F7F\u7528\u76F8\u540C\u7684 id \u5E76\u6DFB\u52A0\u540E\u7F00\uFF1A</p><div class="language-ts"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">NameFields</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">id</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useId</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> (</span></span>
<span class="line"><span style="color:#F07178;">    &lt;</span><span style="color:#FFCB6B;">div</span><span style="color:#F07178;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">label</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">htmlFor</span><span style="color:#89DDFF;">={</span><span style="color:#F07178;">id + </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">-firstName</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">}&gt;</span><span style="color:#A6ACCD;">First</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Name</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">label</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">      &lt;</span><span style="color:#FFCB6B;">div</span><span style="color:#F07178;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">input</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">={</span><span style="color:#F07178;">id + </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">-firstName</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">/&gt;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">label</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">htmlFor</span><span style="color:#89DDFF;">={</span><span style="color:#F07178;">id + </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">-lastName</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">}&gt;</span><span style="color:#A6ACCD;">Last</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Name</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">label</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">      &lt;</span><span style="color:#FFCB6B;">div</span><span style="color:#F07178;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">input</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">={</span><span style="color:#F07178;">id + </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">-lastName</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">/&gt;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">  )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u90A3\u4E48 <code>useId</code> \u751F\u6210\u7684 id \u662F\u600E\u4E48\u6837\u7684\u5462\uFF1F</p><p><img src="`+p+`" alt="useId"></p><p>\u751F\u6210\u7684 Id \u662F\u5E26 <code>:</code> \u7684\uFF0C\u7528\u6765\u786E\u4FDD\u552F\u4E00\uFF0C\u6BD5\u7ADF\u5F88\u5C11\u4EBA\u7528 <code>:</code> \u505A id</p><div class="warning custom-block"><p class="custom-block-title">\u91CD\u8981</p><p>useId \u751F\u6210\u4E00\u4E2A\u5305\u542B : \u7684\u5B57\u7B26\u4E32 token\u3002\u8FD9\u6709\u52A9\u4E8E\u786E\u4FDD token \u662F\u552F\u4E00\u7684\uFF0C\u4F46\u5728 CSS \u9009\u62E9\u5668\u6216 <code>querySelectorAll</code> \u7B49 API \u4E2D\u4E0D\u53D7\u652F\u6301\u3002</p></div><p>\u548C\u5176\u4ED6\u7684 hook \u4E00\u6837\uFF0C\u6267\u884C<code>useId</code> \u4F1A\u5728 <code>mount</code> \u9636\u6BB5\u4F1A\u8C03\u7528 <code>mountId</code>\uFF0C\u5728 <code>update</code> \u9636\u6BB5\u4F1A\u8C03\u7528 <code>updateId</code></p><p>\u5148\u6765\u770B\u770B mountId</p><h2 id="mount-\u9636\u6BB5" tabindex="-1">mount \u9636\u6BB5 <a class="header-anchor" href="#mount-\u9636\u6BB5" aria-hidden="true">#</a></h2><p>\u53EF\u4EE5\u770B\u5230 <code>mountId</code> \u4F1A\u505A\u4EE5\u4E0B\u51E0\u4EF6\u4E8B\u60C5</p><ol><li>\u521B\u5EFA hook \u5BF9\u8C61</li><li>\u83B7\u53D6\u5F53\u524D\u7EC4\u4EF6\u7684 root Fiber \u4E0A\u7684 <code>identifierPrefix</code> id \u524D\u7F00</li><li>\u5224\u65AD\u662F SSR \u8FD8\u662F CSR <ol><li>SSR \u4F1A\u6839\u636E Tree \u6765\u751F\u6210 Id\uFF0C\u5E76\u5939\u6742\u5927\u5199\u5B57\u6BCD R</li><li>CSR \u4F1A\u6839\u636E\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF\u6765\u751F\u6210\u81EA\u589E\u7684 Id\uFF0C\u5939\u6742\u5C0F\u5199\u5B57\u6BCD r</li></ol></li><li>\u6700\u540E\u6302\u8F7D\u5230 <code>memoizedState</code> \u4E0A</li></ol><div class="language-ts"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">mountId</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">hook</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">mountWorkInProgressHook</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">root</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> ((</span><span style="color:#82AAFF;">getWorkInProgressRoot</span><span style="color:#F07178;">(): </span><span style="color:#A6ACCD;">any</span><span style="color:#F07178;">): </span><span style="color:#A6ACCD;">FiberRoot</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">identifierPrefix</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">identifierPrefix</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#82AAFF;">getIsHydrating</span><span style="color:#F07178;">()) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">treeId</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">getTreeId</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// Use a captial R prefix for server-generated ids.</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">id</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">identifierPrefix</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">R</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">treeId</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">localId</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">localIdCounter</span><span style="color:#89DDFF;">++;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">localId</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">id</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">H</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">localId</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toString</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">32</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">id</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// Use a lowercase r prefix for client-generated ids.</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">globalClientId</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">globalClientIdCounter</span><span style="color:#89DDFF;">++;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">id</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">identifierPrefix</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">r</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">globalClientId</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toString</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">32</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">hook</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">memoizedState</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">\u6CE8\u610F</p><p><code>identifierPrefix</code>: React \u7528\u4E8E\u751F\u6210\u7684 id \u7684\u53EF\u9009\u524D\u7F00\uFF0C\u5728\u540C\u4E00\u9875\u9762\u4E0A\u4F7F\u7528\u591A\u4E2A\u6839\u65F6\u907F\u514D\u51B2\u7A81\u5F88\u6709\u7528\u3002\u5FC5\u987B\u4E0E\u670D\u52A1\u5668\u4E0A\u4F7F\u7528\u7684\u524D\u7F00\u76F8\u540C\u3002</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#82AAFF;">hydrateRoot</span><span style="color:#A6ACCD;">(container</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> element[</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> options])</span></span>
<span class="line"></span></code></pre></div><p>\u5199\u5728 options \u91CC\u7684</p></div><p>\u91CD\u70B9\u9700\u8981\u653E\u5230\u8FD9\u4E2A <code>getTreeId</code> \u7684\u65B9\u6CD5\u4E0A\uFF0C\u8FD9\u4E2A\u51FD\u6570\u7A76\u7ADF\u662F\u5982\u4F55\u5DE5\u4F5C\u7684\u5462\uFF1F</p><h3 id="gettreeid" tabindex="-1">getTreeId <a class="header-anchor" href="#gettreeid" aria-hidden="true">#</a></h3><p>getTreeId \u4F7F\u7528\u7EC4\u4EF6\u7684\u6811\u72B6\u7ED3\u6784\uFF08\u5728\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u90FD\u7EDD\u5BF9\u7A33\u5B9A\uFF09\u6765\u751F\u6210id\u3002\u8FD9\u91CC\u6D89\u53CA\u5230\u4E86 React \u7684 Id \u751F\u6210\u7B97\u6CD5\u5177\u4F53\u53EF\u4EE5\u770B\u8FD9\u4E2A <a href="https://github.com/facebook/react/pull/22644" target="_blank" rel="noopener noreferrer">PR</a></p><p><img src="`+o+`" alt="useid-tree"></p><p>\u4E3A\u4E86\u8BA9 Id \u66F4\u52A0\u7684\u7D27\u51D1\uFF0C\u5E76\u4E0D\u662F\u6240\u6709\u7684\u7EC4\u4EF6\u90FD\u4F1A\u751F\u6210 ID\uFF0C\u53EA\u6709\u8C03\u7528\u4E86 <code>useId</code> \u7684\u7EC4\u4EF6\u624D\u4F1A\u751F\u6210 Id\uFF0C\u5E76\u4E14 Id \u662F\u8FDE\u7EED\u7684\uFF0C\u5982\u679C\u6709\u5176\u4E2D\u4E00\u5C42\u7EC4\u4EF6\u6CA1\u6709\u8C03\u7528 <code>useId</code> \u90A3\u5C31\u8DF3\u8FC7\u8FD9\u4E00\u5C42</p><p>\u5728 useId \u7684\u5B9E\u9645\u5B9E\u73B0\u4E2D\uFF0C\u5C42\u7EA7\u88AB\u8868\u793A\u4E3A32\u8FDB\u5236\u7684\u6570\u3002</p><p>\u5982\u679C \u7EC4\u4EF6\u7684\u5C42\u6570\u8D85\u8FC7\u4E86 32 \u8FDB\u5236\u6570\u80FD\u8868\u8FBE\u7684\u6570\u65F6\uFF0C\u4F1A\u901A\u8FC7 <code>treeContextOverflow</code> \u6765\u5C06\u8D85\u51FA\u7684\u51E0\u4F4D\u622A\u65AD\uFF0C\u8F6C\u6210\u5B57\u7B26\u4E32\uFF0C\u7EE7\u7EED\u62FC\u63A5\u5728 id \u7684\u540E\u9762</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getTreeId</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">overflow</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">treeContextOverflow</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">idWithLeadingBit</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">treeContextId</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">id</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">idWithLeadingBit</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">~</span><span style="color:#82AAFF;">getLeadingBit</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">idWithLeadingBit</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toString</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">32</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">overflow</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="update-\u9636\u6BB5" tabindex="-1">update \u9636\u6BB5 <a class="header-anchor" href="#update-\u9636\u6BB5" aria-hidden="true">#</a></h2><p>update \u65F6\uFF0C\u4E0D\u9700\u8981\u505A\u4EC0\u4E48\u4E8B\u60C5,\u83B7\u53D6 id \u8FD4\u56DE\u5373\u53EF</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">updateId</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">hook</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">updateWorkInProgressHook</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">hook</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">memoizedState</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,38),c=[t];function r(F,y,D,i,d,A){return a(),n("div",null,c)}var g=s(e,[["render",r]]);export{u as __pageData,g as default};
