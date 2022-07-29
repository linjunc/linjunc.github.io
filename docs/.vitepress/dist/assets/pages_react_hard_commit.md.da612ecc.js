import{_ as s,c as n,o as a,a as o}from"./app.9206e91c.js";const C=JSON.parse('{"title":"\u524D\u8A00","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u524D\u8A00","slug":"\u524D\u8A00"},{"level":2,"title":"\u6D41\u7A0B\u6982\u89C8","slug":"\u6D41\u7A0B\u6982\u89C8"}],"relativePath":"pages/react/hard/commit.md"}'),l={name:"pages/react/hard/commit.md"},p=o(`<h2 id="\u524D\u8A00" tabindex="-1">\u524D\u8A00 <a class="header-anchor" href="#\u524D\u8A00" aria-hidden="true">#</a></h2><p>\u968F\u7740 <code>render</code> \u9636\u6BB5\u7684\u5B8C\u6210\uFF0C\u4E5F\u610F\u5473\u7740\u5728\u5185\u5B58\u4E2D<strong>\u6784\u5EFA <code>workInProgress Fiber</code> \u6811</strong>\u7684\u6240\u6709\u5DE5\u4F5C\u90FD\u5DF2\u7ECF\u5B8C\u6210\uFF0C\u8FD9\u5176\u4E2D\u5305\u62EC\u4E86\u5BF9 Fiber \u8282\u70B9\u7684 <code>update</code>\u3001<code>diff</code>\u3001<code>flags \u6807\u8BB0</code>\u3001<code>subtreeFlags</code>\uFF08effectList\uFF09 \u7684\u6536\u96C6\u7B49\u64CD\u4F5C<br>\u6211\u4EEC\u77E5\u9053\uFF0C\u5728 <code>render</code> \u9636\u6BB5\uFF0C\u4F1A\u5C06\u9700\u8981\u66F4\u65B0\u7684\u8282\u70B9<strong>\u6807\u8BB0\u4E0A</strong> <code>flags</code> \uFF08effectTag\uFF09\uFF0C\u5728 <code>completeWork</code> \u9636\u6BB5\u4F1A<strong>\u5F62\u6210</strong> <code>effectList</code> \u94FE\u8868\uFF0C<strong>\u8FDE\u63A5\u6240\u6709\u9700\u8981\u88AB\u66F4\u65B0\u7684\u8282\u70B9</strong>\u3002</p><p>\u4E3A\u4E86\u5C06\u8FD9\u4E9B\u9700\u8981\u66F4\u65B0\u7684\u8282\u70B9\u5E94\u7528\u5230\u771F\u5B9E DOM \u4E0A\u5374\u4E0D\u9700\u8981<strong>\u904D\u5386\u6574\u68F5\u6811</strong>\uFF0C\u5728 <code>commit</code> \u9636\u6BB5\uFF0C\u4F1A\u901A\u8FC7<strong>\u904D\u5386\u8FD9\u6761 <code>EffectList</code> \u94FE\u8868</strong>\uFF0C\u6267\u884C\u5BF9\u5E94\u7684\u64CD\u4F5C\uFF0C\u6765\u5B8C\u6210\u5BF9\u771F\u5B9E DOM \u7684\u66F4\u65B0\uFF0C\u8FD9\u4E5F\u53EB\u505A <code>mutation</code>\uFF0C\u5373 <strong>DOM \u8282\u70B9\u7684\u589E\u5220\u6539\u64CD\u4F5C</strong>\u3002</p><blockquote><p>\u5728\u65B0\u7248\u672C\u4E2D\u4E0D\u518D\u9700\u8981 effectList \u94FE\u8868\u4E86\uFF0C\u800C\u662F\u901A\u8FC7 rootFiber \u81EA\u4E0B\u800C\u4E0A\u8C03\u548C\u7684\u65B9\u5F0F\u5904\u7406\u8FD9\u4E9B\u6807\u5FD7\uFF0C\u6267\u884C\u5BF9\u5E94\u7684\u64CD\u4F5C\uFF0C\u6765\u5B8C\u6210\u5BF9\u771F\u5B9E DOM \u7684\u66F4\u65B0</p></blockquote><p>\u63A5\u4E0B\u6765\u6211\u4EEC\u5E26\u7740<strong>\u4EE5\u4E0B\u7684\u95EE\u9898</strong>\u4E00\u8D77\u53BB\u601D\u8003 commit \u9636\u6BB5\u7684\u5DE5\u4F5C\uFF01</p><ul><li>commit \u9636\u6BB5\u5206\u4E3A\u51E0\u4E2A\u5B50\u9636\u6BB5\uFF0C\u90FD\u505A\u4E86\u4EC0\u4E48\u4E8B\u60C5\uFF1F</li><li>\u5982\u4F55\u6267\u884C\u751F\u547D\u5468\u671F\u548C hooks \u94A9\u5B50\u7684\u56DE\u8C03\u53CA\u9500\u6BC1\u51FD\u6570\uFF1F</li><li>commit \u9636\u6BB5\u662F\u5982\u4F55\u66F4\u65B0 DOM \u8282\u70B9\u7684\uFF1F</li><li>useEffect \u94A9\u5B50\u662F\u5982\u4F55\u88AB\u8C03\u5EA6\u7684\uFF1F</li></ul><hr><p><code>commit</code> \u9636\u6BB5\u4F1A\u505A\u4EE5\u4E0B\u8FD9\u4E9B\u4E8B\u60C5</p><ul><li>\u5BF9\u4E00\u4E9B<strong>\u751F\u547D\u5468\u671F\u548C\u526F\u4F5C\u7528\u94A9\u5B50\u7684\u5904\u7406</strong>\uFF0C\u6BD4\u5982 \u7C7B\u7EC4\u4EF6\u7684 <code>componentDidMount</code> \u3001<code>componentDidUpdate</code>\uFF0C\u51FD\u6570\u7EC4\u4EF6\u7684 <code>useEffect</code>\u3001<code>useLayoutEffect</code> \u3001<code>useInsertionEffect</code> \u7B49</li><li>\u53E6\u4E00\u65B9\u9762\uFF0C\u5728\u4E00\u6B21 Update \u4E2D\uFF0C\u8FDB\u884C\u6DFB\u52A0\u8282\u70B9\uFF08<code>Placement</code>\uFF09\u3001\u66F4\u65B0\u8282\u70B9\uFF08<code>Update</code>\uFF09\u3001\u5220\u9664\u8282\u70B9\uFF08<code>Deletion</code>\uFF09\u3001\u540C\u65F6\u6709\u5BF9 <code>ref</code> \u7684\u5904\u7406\u7B49\u3002</li></ul><p><code>commit</code> \u9636\u6BB5\u7684<strong>\u5165\u53E3\u5728 <code>commitRoot</code> \u51FD\u6570</strong>\uFF0C\u5728\u8FD9\u91CC\u4F1A\u53D1\u8D77\u4E00\u4E2A\u6700\u9AD8\u4F18\u5148\u7EA7\u7684\u8C03\u5EA6\u4EFB\u52A1\uFF0C\u7136\u540E\u8C03\u7528 <code>commitRootImpl</code> \u51FD\u6570\u6765\u5904\u7406\u526F\u4F5C\u7528\uFF0C\u5C06\u6700\u65B0\u7684 Fiber \u6811\u540C\u6B65\u5230 DOM \u4E0A</p><div class="language-javascript"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">commitRoot</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">previousUpdateLanePriority</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">getCurrentUpdatePriority</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">prevTransition</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ReactCurrentBatchConfig</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">transition</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">try</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">ReactCurrentBatchConfig</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">transition</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">setCurrentUpdatePriority</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">DiscreteEventPriority</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// \u6700\u9AD8\u4F18\u5148\u7EA7\u8C03\u5EA6</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">commitRootImpl</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">previousUpdateLanePriority</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// commit \u4E3B\u6D41\u7A0B</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">finally</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// \u91CD\u7F6E</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">ReactCurrentBatchConfig</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">transition</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">prevTransition</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">setCurrentUpdatePriority</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">previousUpdateLanePriority</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="\u6D41\u7A0B\u6982\u89C8" tabindex="-1">\u6D41\u7A0B\u6982\u89C8 <a class="header-anchor" href="#\u6D41\u7A0B\u6982\u89C8" aria-hidden="true">#</a></h2><p><code>commit</code>\u9636\u6BB5\u4E3B\u8981\u9488\u5BF9 <code>rootFiber</code>\u4E0A\u7684 <code>effectList</code>\u8FDB\u884C\u5904\u7406\uFF0C\u6839\u636E\u5BF9 DOM \u7684\u64CD\u4F5C\u65F6\u673A\u53EF\u4EE5<strong>\u5206\u4E3A\u4E09\u4E2A\u5B50\u9636\u6BB5</strong></p><ul><li><code>Before mutation</code>\u9636\u6BB5\uFF08\u6267\u884C DOM \u64CD\u4F5C\u524D\uFF09\uFF1A\u8BFB\u53D6\u7EC4\u4EF6\u53D8\u66F4\u524D\u7684\u72B6\u6001 <ul><li>\u5BF9\u4E8E CC \u800C\u8A00\uFF0C\u4F1A\u6267\u884C <code>getSnapshotBeforeUpdate</code>\uFF0C\u83B7\u53D6 DOM <strong>\u66F4\u65B0\u524D</strong>\u7684\u7EC4\u4EF6\u5B9E\u4F8B\u4FE1\u606F\uFF08\u66F4\u65B0\u524D\uFF09</li><li>\u5BF9\u4E8E FC \u800C\u8A00\uFF0C\u4F1A\u5F02\u6B65\u8C03\u5EA6 <code>useEffect</code> \u94A9\u5B50</li></ul></li><li><code>mutation</code> \u9636\u6BB5\uFF08\u6267\u884C DOM \u64CD\u4F5C\uFF09\uFF1A <ul><li>\u5BF9\u4E8E <code>HostComponent</code> \u4F1A\u6267\u884C\u76F8\u5E94\u7684 DOM \u64CD\u4F5C</li><li>\u5BF9\u4E8E CC \u4F1A\u8C03\u7528 <code>componentWillUnmount</code></li><li>\u5BF9\u4E8E FC \u4F1A\u6267\u884C <code>useLayoutEffect</code> \u7684<strong>\u9500\u6BC1\u51FD\u6570</strong></li></ul></li><li><code>layout</code> \u9636\u6BB5\uFF08\u6267\u884C DOM \u64CD\u4F5C\u540E\uFF09\uFF1A\u5728 DOM \u64CD\u4F5C\u5B8C\u6210\u540E\uFF0C\u8BFB\u53D6\u5F53\u524D\u7EC4\u4EF6\u7684\u72B6\u6001\uFF08\u66F4\u65B0\u540E\uFF09 <ul><li>\u5BF9\u4E8E CC \uFF0C\u4F1A\u8C03\u7528 <code>componentDidMount</code> \u548C <code>componentDidUpdate</code> \u4EE5\u53CA <code>setState</code> \u7684\u56DE\u8C03\u51FD\u6570</li><li>\u5BF9\u4E8E FC \uFF0C\u4F1A\u6267\u884C <code>useLayoutEffect</code> \u7684\u56DE\u8C03\u51FD\u6570</li></ul></li></ul><p>\u5728\u8FD9\u5F53\u4E2D\uFF0C\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u5728 <code>mutation</code> \u9636\u6BB5\u7ED3\u675F\u540E\uFF0C<code>layout</code> \u5F00\u59CB\u4E4B\u524D\uFF0C<code>workInProgress</code> \u6811\u4F1A\u5207\u6362\u6210 <code>current</code> \u6811\u3002\u8FD9\u6837\u505A\u662F\u4E3A\u4E86</p><ul><li>\u5728 <code>mutation</code> \u9636\u6BB5\u8C03\u7528\u7C7B\u7EC4\u4EF6\u7684 <code>componentWillUnmount</code>\u7684\u65F6\u5019\uFF0C \u53EF\u4EE5\u83B7\u53D6\u5230<strong>\u5378\u8F7D\u524D</strong>\u7684\u7EC4\u4EF6\u4FE1\u606F</li><li>\u5728 <code>layout</code>\u9636\u6BB5\u8C03\u7528 <code>componentDidMount/Update</code> \u65F6\uFF0C\u83B7\u53D6\u7684\u7EC4\u4EF6\u4FE1\u606F\u662F\u7EC4\u4EF6<strong>\u66F4\u65B0\u540E</strong>\u7684\u3002</li></ul><p><code>commit</code> \u9636\u6BB5\u7684\u4E3B\u6D41\u7A0B\u5728 <code>commitRootImpl</code> \u8FD9\u4E2A\u51FD\u6570\u4E2D\uFF0C\u53EF\u4EE5\u660E\u786E\u7684\u770B\u5230\u4E09\u4E2A\u5B50\u9636\u6BB5\u7684\u6267\u884C</p><div class="language-javascript"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">commitRootImpl</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> renderPriorityLevel</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// NOTE\uFF1A \u91C7\u7528 do while \u7684\u4F5C\u7528\u662F\uFF0C\u5728 useEffect \u5185\u90E8\u53EF\u80FD\u4F1A\u89E6\u53D1\u65B0\u7684\u66F4\u65B0\uFF0C\u65B0\u7684\u66F4\u65B0\u53EF\u80FD\u4F1A\u89E6\u53D1\u65B0\u7684\u526F\u4F5C\u7528 \uFF0C\u56E0\u6B64\u9700\u8981\u4E0D\u65AD\u7684\u5FAA\u73AF\uFF0C\u76F4\u5230 \u4E3A null</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">do</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">flushPassiveEffects</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">rootWithPendingPassiveEffects</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// Note\uFF1A\u8FD9\u4E00\u6B65\u662F\u4E3A\u4E86\u770B\u770B\u8FD8\u6709\u6CA1\u6709\u6CA1\u6709\u6267\u884C\u7684 useEffect\uFF0C \u6709\u7684\u8BDD\u5148\u6267\u884C\u4ED6\u4EEC</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// \u5F53\u524D\u7684 rootFiber</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">lanes</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">finishedLanes</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// \u4F18\u5148\u7EA7\u76F8\u5173</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">finishedLanes</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">NoLanes</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// \u7ED1\u5B9A scheduler \u7684\u56DE\u8C03\u51FD\u6570</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">callbackNode</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">callbackPriority</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">NoLane</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">remainingLanes</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">mergeLanes</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">lanes</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">childLanes</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">markRootFinished</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">remainingLanes</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// Note\uFF1A\u5904\u7406\u5149\u6807\uFF0C\u91CD\u7F6E\u4E00\u4E9B render \u9636\u6BB5\u4F7F\u7528\u7684\u53D8\u91CF</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// \u5B50\u6811\u662F\u5426\u6709\u66F4\u65B0</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">subtreeHasEffects</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span></span>
<span class="line"><span style="color:#F07178;">    (</span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">subtreeFlags</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;</span></span>
<span class="line"><span style="color:#F07178;">      (</span><span style="color:#A6ACCD;">BeforeMutationMask</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">|</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">MutationMask</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">|</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">LayoutMask</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">|</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PassiveMask</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">!==</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">NoFlags</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">rootHasEffect</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span></span>
<span class="line"><span style="color:#F07178;">    (</span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">flags</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;</span></span>
<span class="line"><span style="color:#F07178;">      (</span><span style="color:#A6ACCD;">BeforeMutationMask</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">|</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">MutationMask</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">|</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">LayoutMask</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">|</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PassiveMask</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">!==</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">NoFlags</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">subtreeHasEffects</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">rootHasEffect</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// \u5B58\u5728\u526F\u4F5C\u7528\uFF0C\u5904\u7406 Fiber \u4E0A\u7684\u526F\u4F5C\u7528</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// \u7B2C\u4E00\u4E2A\u9636\u6BB5\u662F before mutation \uFF0C\u5728\u8FD9\u4E2A\u9636\u6BB5\u53EF\u4EE5\u8BFB\u53D6\u6539\u53D8\u4E4B\u524D\u7684\u7684 state</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// \u751F\u547D\u5468\u671F\u51FD\u6570 getSnapshotBeforeUpdate \u7684\u8C03\u7528</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">shouldFireAfterActiveInstanceBlur</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">commitBeforeMutationEffects</span><span style="color:#F07178;">(</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//  mutation \u9636\u6BB5\uFF0C\u53EF\u4EE5\u5728\u8FD9\u4E2A\u9636\u6BB5 \u6539\u53D8 host tree</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">commitMutationEffects</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">lanes</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// \u4EA4\u6362 workInProgress</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">current</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// \u6267\u884C layout</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">commitLayoutEffects</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">lanes</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">requestPaint</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// \u91CD\u7F6E\u6267\u884C\u6808\u73AF\u5883</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">executionContext</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">prevExecutionContext</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// \u5C06\u4F18\u5148\u7EA7\u91CD\u7F6E\u4E3A\u4E4B\u524D\u7684 \u975E\u540C\u6B65\u4F18\u5148\u7EA7</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">setCurrentUpdatePriority</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">previousPriority</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">ReactCurrentBatchConfig</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">transition</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">prevTransition</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// No effects.</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// Note\uFF1Acommit \u9636\u6BB5\u7ED3\u5C3E\uFF0C\u53EF\u80FD\u4F1A\u5728 commit \u9636\u6BB5\u4EA7\u751F\u65B0\u7684\u66F4\u65B0\uFF0C\u56E0\u6B64\u5728 commit \u9636\u6BB5\u7684\u7ED3\u5C3E\u4F1A\u91CD\u65B0\u8C03\u5EA6\u4E00\u6B21</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">ensureRootIsScheduled</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">now</span><span style="color:#F07178;">())</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// Note\uFF1Areact \u4E2D\u4F1A\u5C06\u540C\u6B65\u4EFB\u52A1\u653E\u5728 flushSync \u961F\u5217\u4E2D\uFF0C\u6267\u884C\u8FD9\u4E2A\u51FD\u6570\u4F1A\u6267\u884C\u5B83\u91CC\u9762\u7684\u540C\u6B65\u4EFB\u52A1</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// Note\uFF1A\u9ED8\u8BA4 react \u4E2D\u5F00\u542F\u7684\u662F legacy \u6A21\u5F0F\uFF0C\u8FD9\u79CD\u6A21\u5F0F\u4E0B\u7684\u66F4\u65B0\u90FD\u662F \u540C\u6B65\u7684 \u66F4\u65B0\uFF0C\u672A\u6765\u4F1A\u5F00\u542F concurrent \u6A21\u5F0F\uFF08\u5E76\u53D1\u6A21\u5F0F\uFF09\uFF0C\u4F1A\u51FA\u73B0\u4E0D\u540C\u4F18\u5148\u7EA7\u7684\u66F4\u65B0</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">flushSyncCallbacks</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u63A5\u4E0B\u6765\u6211\u4EEC\u53BB\u770B\u770B\u6BCF\u4E2A\u9636\u6BB5\u90FD\u5206\u522B\u505A\u4E86\u54EA\u4E9B\u5DE5\u4F5C\uFF01</p><br>`,20),e=[p];function t(c,r,F,y,D,i){return a(),n("div",null,e)}var d=s(l,[["render",t]]);export{C as __pageData,d as default};
