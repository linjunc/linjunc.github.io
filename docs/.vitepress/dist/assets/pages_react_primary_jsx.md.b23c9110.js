import{_ as p,c as o,b as s,d as e,w as t,t as c,e as a,a as n,r,o as D}from"./app.9206e91c.js";const O=JSON.parse('{"title":"React \u5165\u95E8\u5B66\u4E60\uFF08\u4E00\uFF09-- \u57FA\u7840\u77E5\u8BC6\u4EE5\u53CA jsx\u8BED\u6CD5","description":"\u672C\u6587\u662F React \u5B66\u4E60\u7684\u7B2C\u4E00\u7BC7\u6587\u7AE0\uFF0C\u4E3B\u8981\u9610\u8FF0\u4E86 react \u7684\u57FA\u7840\u77E5\u8BC6\uFF0C\u4EE5\u53CA\u5173\u4E8E jsx \u7684\u57FA\u672C\u8BED\u6CD5","frontmatter":{"title":"React \u5165\u95E8\u5B66\u4E60\uFF08\u4E00\uFF09-- \u57FA\u7840\u77E5\u8BC6\u4EE5\u53CA jsx\u8BED\u6CD5","date":"2021-08-15T16:02:56.000Z","id":1635580976,"tags":["react","jsx"],"categories":["React\u5165\u95E8\u5B66\u4E60"],"keywords":"react,jsx,react\u57FA\u7840,\u5C0F\u4E1E\u540C\u5B66","description":"\u672C\u6587\u662F React \u5B66\u4E60\u7684\u7B2C\u4E00\u7BC7\u6587\u7AE0\uFF0C\u4E3B\u8981\u9610\u8FF0\u4E86 react \u7684\u57FA\u7840\u77E5\u8BC6\uFF0C\u4EE5\u53CA\u5173\u4E8E jsx \u7684\u57FA\u672C\u8BED\u6CD5"},"headers":[{"level":2,"title":"\u4E00\u3001React \u7B80\u4ECB","slug":"\u4E00\u3001react-\u7B80\u4ECB"},{"level":3,"title":"1. \u5173\u4E8E React","slug":"_1-\u5173\u4E8E-react"},{"level":3,"title":"2. Hello React","slug":"_2-hello-react"},{"level":3,"title":"3. \u865A\u62DF DOM \u548C\u771F\u5B9E DOM \u7684\u4E24\u79CD\u521B\u5EFA\u65B9\u6CD5","slug":"_3-\u865A\u62DF-dom-\u548C\u771F\u5B9E-dom-\u7684\u4E24\u79CD\u521B\u5EFA\u65B9\u6CD5"},{"level":2,"title":"\u4E8C\u3001jsx \u8BED\u6CD5","slug":"\u4E8C\u3001jsx-\u8BED\u6CD5"},{"level":3,"title":"tip: JSX \u5C0F\u7EC3\u4E60","slug":"tip-jsx-\u5C0F\u7EC3\u4E60"}],"relativePath":"pages/react/primary/jsx.md"}'),y={name:"pages/react/primary/jsx.md"},F=s("p",null,[s("img",{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/react-study-%E5%9F%BA%E7%A1%80.png",alt:"react-study-\u57FA\u7840"})],-1),i=s("p",null,"\u{1F4E2} \u5927\u5BB6\u597D\u{1F62A} \uFF0C\u6211\u662F\u5C0F\u4E1E\u540C\u5B66\uFF0C\u6700\u8FD1\u5728\u5B66\u4E60 React\u3001\u5C0F\u7A0B\u5E8F\u3001\u9605\u8BFB JS \u9AD8\u7A0B\uFF0C\u4EE5\u53CA\u6574\u7406 Node \u7684\u7B14\u8BB0\uFF0C\u8FD9\u662F\u5173\u4E8E React \u7684\u7B2C\u4E00\u7BC7\u6587\u7AE0\uFF0C\u4E5F\u662F\u6211\u5B66\u4E60\u7684\u7B2C\u4E00\u4E2A\u6846\u67B6\uFF0C\u5185\u5BB9\u5982\u6709\u9519\u8BEF\uFF0C\u6B22\u8FCE\u5927\u5BB6\u6307\u6B63",-1),A=a("\u{1F4E2} "),C=a("\u613F\u4F60\u751F\u6D3B\u660E\u6717\uFF0C\u4E07\u7269\u53EF\u7231"),d=n(`<p>\u5148\u9644\u4E0A<a href="https://zh-hans.reactjs.org/" target="_blank" rel="noopener noreferrer">React\u5B98\u7F51</a> \uFF0C\u6709\u5F88\u591A\u95EE\u9898\u90FD\u8981\u901A\u8FC7\u67E5\u8BE2\u5B98\u65B9\u6587\u6863\u6765\u89E3\u51B3\uFF0C\u8981\u5B66\u4F1A\u67E5\u6587\u6863~</p><h2 id="\u4E00\u3001react-\u7B80\u4ECB" tabindex="-1">\u4E00\u3001React \u7B80\u4ECB <a class="header-anchor" href="#\u4E00\u3001react-\u7B80\u4ECB" aria-hidden="true">#</a></h2><h3 id="_1-\u5173\u4E8E-react" tabindex="-1">1. \u5173\u4E8E React <a class="header-anchor" href="#_1-\u5173\u4E8E-react" aria-hidden="true">#</a></h3><p>\u6574\u51E0\u4E2A\u9762\u8BD5\u9898\u6765\u8BA4\u8BC6\u4E00\u4E0B~~</p><blockquote><p>\u4EC0\u4E48\u662F React \uFF1F</p></blockquote><p><strong>React</strong> \u662F\u4E00\u4E2A\u7528\u4E8E\u6784\u5EFA\u7528\u6237\u754C\u9762\u7684 JavaScript \u5E93\u3002</p><ul><li>\u662F\u4E00\u4E2A\u5C06\u6570\u636E\u6E32\u67D3\u4E3A HTML \u89C6\u56FE\u7684\u5F00\u6E90 JS \u5E93</li><li>\u5B83\u9075\u5FAA\u57FA\u4E8E\u7EC4\u4EF6\u7684\u65B9\u6CD5\uFF0C\u6709\u52A9\u4E8E\u6784\u5EFA\u53EF\u91CD\u7528\u7684 UI \u7EC4\u4EF6</li><li>\u5B83\u7528\u4E8E\u5F00\u53D1\u590D\u6742\u7684\u4EA4\u4E92\u5F0F\u7684 web \u548C\u79FB\u52A8 UI</li></ul><blockquote><p>React \u6709\u4EC0\u4E48\u7279\u70B9\uFF1F</p></blockquote><ol><li>\u4F7F\u7528\u865A\u62DF DOM \u800C\u4E0D\u662F\u771F\u6B63\u7684 DOM</li><li>\u5B83\u53EF\u4EE5\u7528\u670D\u52A1\u5668\u6E32\u67D3</li><li>\u5B83\u9075\u5FAA\u5355\u5411\u6570\u636E\u6D41\u6216\u6570\u636E\u7ED1\u5B9A</li><li>\u9AD8\u6548</li><li>\u58F0\u660E\u5F0F\u7F16\u7801\uFF0C\u7EC4\u4EF6\u5316\u7F16\u7801</li></ol><blockquote><p>React \u7684\u4E00\u4E9B\u4E3B\u8981\u4F18\u70B9\uFF1F</p></blockquote><ol><li>\u5B83\u63D0\u9AD8\u4E86\u5E94\u7528\u7684\u6027\u80FD</li><li>\u53EF\u4EE5\u65B9\u4FBF\u5728\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u5668\u7AEF\u4F7F\u7528</li><li>\u7531\u4E8E\u4F7F\u7528 JSX\uFF0C\u4EE3\u7801\u7684\u53EF\u8BFB\u6027\u66F4\u597D</li><li>\u4F7F\u7528React\uFF0C\u7F16\u5199 UI \u6D4B\u8BD5\u7528\u4F8B\u53D8\u5F97\u975E\u5E38\u5BB9\u6613</li></ol><h3 id="_2-hello-react" tabindex="-1">2. Hello React <a class="header-anchor" href="#_2-hello-react" aria-hidden="true">#</a></h3><p>\u9996\u5148\u9700\u8981\u5F15\u5165\u51E0\u4E2A react \u5305\uFF0C\u6211\u76F4\u63A5\u7528\u7684\u662F\u8001\u5E08\u4E0B\u8F7D\u597D\u7684</p><ul><li>React \u6838\u5FC3\u5E93\u3001\u64CD\u4F5C DOM \u7684 react \u6269\u5C55\u5E93\u3001\u5C06 jsx \u8F6C\u4E3A js \u7684 babel \u5E93</li></ul><p><img src="https://ljcimg.oss-cn-beijing.aliyuncs.com/img/react1.png" alt="react1"></p><div class="language-jsx"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> VDOM </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Hello,React</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">ReactDOM</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">render</span><span style="color:#A6ACCD;">(VDOM</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.test</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"></span></code></pre></div><h3 id="_3-\u865A\u62DF-dom-\u548C\u771F\u5B9E-dom-\u7684\u4E24\u79CD\u521B\u5EFA\u65B9\u6CD5" tabindex="-1">3. \u865A\u62DF DOM \u548C\u771F\u5B9E DOM \u7684\u4E24\u79CD\u521B\u5EFA\u65B9\u6CD5 <a class="header-anchor" href="#_3-\u865A\u62DF-dom-\u548C\u771F\u5B9E-dom-\u7684\u4E24\u79CD\u521B\u5EFA\u65B9\u6CD5" aria-hidden="true">#</a></h3><h4 id="_3-1-js-\u521B\u5EFA\u865A\u62DF-dom" tabindex="-1">3.1 JS \u521B\u5EFA\u865A\u62DF DOM <a class="header-anchor" href="#_3-1-js-\u521B\u5EFA\u865A\u62DF-dom" aria-hidden="true">#</a></h4><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;">//1.\u521B\u5EFA\u865A\u62DFDOM,\u521B\u5EFA\u5D4C\u5957\u683C\u5F0F\u7684dom</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> VDOM</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">React</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createElement</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">h1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,{</span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;">React</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createElement</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">span</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,{},</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">hello,React</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//2.\u6E32\u67D3\u865A\u62DFDOM\u5230\u9875\u9762</span></span>
<span class="line"><span style="color:#A6ACCD;">ReactDOM</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">render</span><span style="color:#A6ACCD;">(VDOM</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.test</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"></span></code></pre></div><h4 id="_3-2-jsx-\u521B\u5EFA\u865A\u62DFdom" tabindex="-1">3.2 Jsx \u521B\u5EFA\u865A\u62DFDOM <a class="header-anchor" href="#_3-2-jsx-\u521B\u5EFA\u865A\u62DFdom" aria-hidden="true">#</a></h4><div class="language-jsx"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;">//1.\u521B\u5EFA\u865A\u62DFDOM</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> VDOM </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> (  </span><span style="color:#676E95;font-style:italic;">/* \u6B64\u5904\u4E00\u5B9A\u4E0D\u8981\u5199\u5F15\u53F7\uFF0C\u56E0\u4E3A\u4E0D\u662F\u5B57\u7B26\u4E32 */</span></span>
<span class="line"><span style="color:#A6ACCD;">    	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Hello,React</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//2.\u6E32\u67D3\u865A\u62DFDOM\u5230\u9875\u9762</span></span>
<span class="line"><span style="color:#A6ACCD;">	ReactDOM</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">render</span><span style="color:#A6ACCD;">(VDOM</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.test</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"></span></code></pre></div><blockquote><p>js \u7684\u5199\u6CD5\u5E76\u4E0D\u662F\u5E38\u7528\u7684\uFF0C\u5E38\u7528jsx\u6765\u5199\uFF0C\u6BD5\u7ADFJSX\u66F4\u7B26\u5408\u4E66\u5199\u7684\u4E60\u60EF</p></blockquote><h2 id="\u4E8C\u3001jsx-\u8BED\u6CD5" tabindex="-1">\u4E8C\u3001jsx \u8BED\u6CD5 <a class="header-anchor" href="#\u4E8C\u3001jsx-\u8BED\u6CD5" aria-hidden="true">#</a></h2><ol><li><p>\u5B9A\u4E49\u865A\u62DFDOM\uFF0C\u4E0D\u80FD\u4F7F\u7528<code>\u201C\u201D</code></p></li><li><p>\u6807\u7B7E\u4E2D\u6DF7\u5165JS\u8868\u8FBE\u5F0F\u7684\u65F6\u5019\u4F7F\u7528<code>{}</code></p></li></ol><div class="language-jsx"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">id </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">myId.toUpperCase()</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,25),h={start:"3"},u=s("li",null,[s("p",null,[a("\u6837\u5F0F\u7684\u7C7B\u540D\u6307\u5B9A\u4E0D\u80FD\u4F7F\u7528class\uFF0C\u4F7F\u7528"),s("code",null,"className")])],-1),_=a("\u5185\u655B\u6837\u5F0F\u8981\u4F7F\u7528"),g=a("\u5305\u88F9"),m=n(`<div class="language-jsx"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">style</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">{</span><span style="color:#F07178;">color</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">skyblue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">fontSize</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">24px</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><ol start="5"><li><p>\u4E0D\u80FD\u6709\u591A\u4E2A\u6839\u6807\u7B7E\uFF0C\u53EA\u80FD\u6709\u4E00\u4E2A\u6839\u6807\u7B7E</p></li><li><p>\u6807\u7B7E\u5FC5\u987B\u95ED\u5408\uFF0C\u81EA\u95ED\u5408\u4E5F\u884C</p></li><li><p>\u5982\u679C\u5C0F\u5199\u5B57\u6BCD\u5F00\u5934\uFF0C\u5C31\u5C06\u6807\u7B7E\u8F6C\u5316\u4E3A html \u540C\u540D\u5143\u7D20\uFF0C\u5982\u679C html \u4E2D\u65E0\u8BE5\u6807\u7B7E\u5BF9\u5E94\u7684\u5143\u7D20\uFF0C\u5C31\u62A5\u9519\uFF1B\u5982\u679C\u662F\u5927\u5199\u5B57\u6BCD\u5F00\u5934\uFF0Creact \u5C31\u53BB\u6E32\u67D3\u5BF9\u5E94\u7684\u7EC4\u4EF6\uFF0C\u5982\u679C\u6CA1\u6709\u5C31\u62A5\u9519</p></li></ol><blockquote><p>\u8BB0\u51E0\u4E2A</p></blockquote><h4 id="_1-\u6CE8\u91CA" tabindex="-1">1. \u6CE8\u91CA <a class="header-anchor" href="#_1-\u6CE8\u91CA" aria-hidden="true">#</a></h4><p>\u5199\u5728\u82B1\u62EC\u53F7\u91CC</p><div class="language-jsx"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">ReactDOM</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">render</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">\u5C0F\u4E1E</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span><span style="color:#676E95;font-style:italic;">/*\u6CE8\u91CA...*/</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">example</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h4 id="_2-\u6570\u7EC4" tabindex="-1">2. \u6570\u7EC4 <a class="header-anchor" href="#_2-\u6570\u7EC4" aria-hidden="true">#</a></h4><p>JSX \u5141\u8BB8\u5728\u6A21\u677F\u4E2D\u63D2\u5165\u6570\u7EC4\uFF0C\u6570\u7EC4\u81EA\u52A8\u5C55\u5F00\u5168\u90E8\u6210\u5458</p><div class="language-jsx"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> arr </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">\u5C0F\u4E1E</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h2</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">\u540C\u5B66</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h2</span><span style="color:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">ReactDOM</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">render</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;{</span><span style="color:#A6ACCD;">arr</span><span style="color:#89DDFF;">}&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">example</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h3 id="tip-jsx-\u5C0F\u7EC3\u4E60" tabindex="-1">tip: JSX \u5C0F\u7EC3\u4E60 <a class="header-anchor" href="#tip-jsx-\u5C0F\u7EC3\u4E60" aria-hidden="true">#</a></h3><p>\u6839\u636E\u52A8\u6001\u6570\u636E\u751F\u6210 <code>li</code></p><div class="language-jsx"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">A</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">B</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">C</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> VDOM </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> (</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">ul</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                data</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">index</span><span style="color:#89DDFF;">)</span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">li</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">key</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">index</span><span style="color:#89DDFF;">}&gt;{</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">}&lt;/</span><span style="color:#F07178;">li</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">ul</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">ReactDOM</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">render</span><span style="color:#A6ACCD;">(VDOM</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.test</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"></span></code></pre></div>`,12);function x(E,j,v,R,f,b){const l=r("font");return D(),o("div",null,[F,s("blockquote",null,[i,s("p",null,[A,e(l,{color:"#e84393"},{default:t(()=>[C]),_:1})])]),d,s("ol",h,[u,s("li",null,[s("p",null,[_,s("code",null,c(),1),g])])]),m])}var S=p(y,[["render",x]]);export{O as __pageData,S as default};
