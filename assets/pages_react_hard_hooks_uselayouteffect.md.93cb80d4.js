import{_ as s,c as a,o,a as n}from"./app.42b2d2ec.js";var l="/assets/layout-effect.3d5a09b8.gif";const A=JSON.parse('{"title":"useLayoutEffect \u6E90\u7801\u89E3\u6790","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u6E90\u7801\u89E3\u6790","slug":"\u6E90\u7801\u89E3\u6790"},{"level":2,"title":"\u7406\u8BBA","slug":"\u7406\u8BBA"},{"level":2,"title":"\u4F7F\u7528\u573A\u666F","slug":"\u4F7F\u7528\u573A\u666F"}],"relativePath":"pages/react/hard/hooks/uselayouteffect.md"}'),e={name:"pages/react/hard/hooks/uselayouteffect.md"},p=n(`<h1 id="uselayouteffect-\u6E90\u7801\u89E3\u6790" tabindex="-1">useLayoutEffect \u6E90\u7801\u89E3\u6790 <a class="header-anchor" href="#uselayouteffect-\u6E90\u7801\u89E3\u6790" aria-hidden="true">#</a></h1><div class="tip custom-block"><p class="custom-block-title">\u63D0\u793A</p><p>useLayoutEffect \u5728\u5B9E\u73B0\u4E0A\u548C <code>useEffect</code> \u57FA\u672C\u4E00\u81F4\uFF0C\u5728 <code>mount</code> \u548C <code>update</code> \u65F6\uFF0C\u8C03\u7528\u7684\u90FD\u662F\u540C\u4E00\u4E2A\u65B9\u6CD5\uFF0C\u56E0\u6B64\u672C\u90E8\u5206\u5177\u4F53\u8BB2 <code>useLayoutEffect</code> \u5728\u8C03\u5EA6\u4E0A \u548C <code>useEffect</code> \u6709\u4EC0\u4E48\u4E0D\u540C\uFF0C\u4EE5\u53CA\u4F7F\u7528\u573A\u666F</p></div><p><code>useLayoutEffect</code> \u548C <code>useEffect</code> \u7684\u5B9E\u73B0\u57FA\u672C\u4E00\u81F4\uFF0C\u4E0D\u540C\u4E4B\u5904\u5728\u4E8E <code>useLayoutEffect</code> \u662F\u88AB<strong>\u540C\u6B65\u6267\u884C</strong>\u7684\uFF0C<code>useEffect</code> \u4F1A\u88AB Scheduler <strong>\u5F02\u6B65\u8C03\u5EA6</strong>\uFF0C\u8FD9\u4E5F\u662F\u5B83\u4EEC\u6700\u5927\u7684\u4E0D\u540C</p><h2 id="\u6E90\u7801\u89E3\u6790" tabindex="-1">\u6E90\u7801\u89E3\u6790 <a class="header-anchor" href="#\u6E90\u7801\u89E3\u6790" aria-hidden="true">#</a></h2><p>\u7531\u4E8E <code>useLayoutEffect</code> \u662F\u540C\u6B65\u6267\u884C\u7684\uFF0C\u56E0\u6B64\u4E0D\u9700\u8981\u50CF <code>useEffect</code> \u4E00\u6837\u53BB\u6536\u96C6 <code>Effect</code> \u5BF9\u8C61\uFF0C\u800C\u662F\u76F4\u63A5\u901A\u8FC7 <code>updateQueue</code> \u53BB\u6267\u884C\u3002</p><p><code>useLayoutEffect</code> \u7684<strong>\u56DE\u8C03\u51FD\u6570\u6267\u884C\u5728 Layout \u9636\u6BB5\uFF0C\u9500\u6BC1\u51FD\u6570\u6267\u884C\u5728 Mutation \u9636\u6BB5</strong>\u3002</p><p>\u5728 <code>mutation</code> \u9636\u6BB5\uFF0C\u8C03\u7528 <code>commitHookEffectListUnmount</code> \u6765\u5378\u8F7D\u4E0A\u4E00\u6B21\u7684 <code>effect</code></p><blockquote><p>\u503C\u5F97\u6CE8\u610F\u7684\u662F <code>commitHookEffectListUnmount</code> \u8FD9\u4E2A\u65B9\u6CD5\u5728 <code>mutation</code> \u9636\u6BB5\u4F1A\u88AB\u8C03\u7528\u591A\u6B21\uFF0C\u4F46\u662F\u9700\u8981\u6CE8\u610F\u5B83\u7684\u53C2\u6570\uFF0C\u53EA\u6709\u662F <code>HookLayout</code> \u624D\u4EE3\u8868 <code>useLayoutEffect</code></p></blockquote><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">commitMutationEffectsOnFiber</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  finishedWork</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Fiber</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  root</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">FiberRoot</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  lanes</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Lanes</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">current</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">alternate</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">flags</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">flags</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">switch</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">tag</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">case</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">FunctionComponent</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">case</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ForwardRef</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">case</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">MemoComponent</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">case</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">SimpleMemoComponent</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#82AAFF;">recursivelyTraverseMutationEffects</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">lanes</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#82AAFF;">commitReconciliationEffects</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#82AAFF;">commitHookEffectListUnmount</span><span style="color:#F07178;">(</span></span>
<span class="line"><span style="color:#F07178;">              </span><span style="color:#A6ACCD;">HookLayout</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">|</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">HookHasEffect</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">              </span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">              </span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">return</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u5728 <code>layout</code> \u9636\u6BB5\uFF0C\u8C03\u7528 <code>commitHookEffectListMount</code> \u6267\u884C useLayoutEffect \u7684 \u56DE\u8C03\u51FD\u6570</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;">// commitLayoutEffectOnFiber{}</span></span>
<span class="line"><span style="color:#82AAFF;">commitHookLayoutEffects</span><span style="color:#A6ACCD;">(finishedWork</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> HookLayout </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> HookHasEffect)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p><code>commitHookLayoutEffects</code> \u6700\u540E\u4F1A\u8C03\u7528\u5230 <code>commitHookEffectListMount</code>\u65B9\u6CD5\uFF0C\u53BB\u6267\u884C <code>useLayoutEffect</code> \u7684\u56DE\u8C03\u51FD\u6570</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">commitHookEffectListMount</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">flags</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HookFlags</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> finishedWork</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Fiber</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">updateQueue</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">FunctionComponentUpdateQueue</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">|</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">null</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">finishedWork</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">updateQueue</span><span style="color:#F07178;">: </span><span style="color:#A6ACCD;">any</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">lastEffect</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">updateQueue</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">updateQueue</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">lastEffect</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">lastEffect</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">firstEffect</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">lastEffect</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">effect</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">firstEffect</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">do</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> ((</span><span style="color:#A6ACCD;">effect</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">tag</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">flags</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">flags</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// Mount</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">create</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">effect</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">create</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">effect</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">destroy</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">create</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">effect</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">effect</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">effect</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">firstEffect</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">\u91CD\u8981\u63D0\u793A</p><p>Effect \u5BF9\u8C61\u901A\u8FC7 tag \u5B57\u6BB5\u533A\u5206\u662F useEffect \u8FD8\u662F useLayoutEffect\uFF0C<code>HookPassive</code> \u4E3A <code>useEffect</code>\uFF0C<code>HookLayout</code> \u4E3A <code>useLayoutEffect</code>\uFF0C <code>HookHasEffect</code> \u6807\u8BB0 Effect \u7684\u56DE\u8C03\u548C\u9500\u6BC1\u51FD\u6570\u9700\u8981\u6267\u884C\u3002</p></div><h2 id="\u7406\u8BBA" tabindex="-1">\u7406\u8BBA <a class="header-anchor" href="#\u7406\u8BBA" aria-hidden="true">#</a></h2><ul><li><code>useLayoutEffect</code> \u7684 <strong>create</strong> \u4EE5\u53CA <strong>destroy</strong>\u7684\u6267\u884C\u90FD\u4F1A\u963B\u585E\u6D4F\u89C8\u5668\u6E32\u67D3\u3002\u5F53\u9700\u8981\u64CD\u4F5C\u771F\u5B9E\u7684 DOM \u65F6\uFF0C\u9700\u8981\u653E\u5728 <code>useLayoutEffect</code> \u7684\u56DE\u8C03\u51FD\u6570\u4E2D\u6267\u884C\uFF0C\u540C\u65F6 <code>useLayoutEffect</code> \u7684\u56DE\u8C03\u5C3D\u91CF\u907F\u514D\u8017\u65F6\u957F\u7684\u4EFB\u52A1</li><li><code>useEffect</code> \u7684 <strong>create</strong> \u4EE5\u53CA <strong>destroy</strong> \u7684\u6267\u884C\u90FD\u4E0D\u4F1A\u963B\u585E\u6D4F\u89C8\u5668\u6E32\u67D3\u3002<code>useEffect</code> \u5C3D\u91CF\u907F\u514D\u64CD\u4F5C\u771F\u5B9E\u7684 DOM\uFF0C\u56E0\u4E3A <code>useEffect</code> \u7684\u56DE\u8C03\u51FD\u6570\u7684\u6267\u884C\u65F6\u673A\u662F\u5728\u6D4F\u89C8\u5668\u7ED8\u5236\u4E4B\u540E\u6267\u884C\u3002\u5982\u679C\u6B64\u65F6\u5728 <code>useEffect</code> \u7684\u56DE\u8C03\u91CC\u53C8\u64CD\u4F5C\u771F\u5B9E\u7684 DOM\uFF0C\u4F1A\u5BFC\u81F4\u6D4F\u89C8\u5668\u56DE\u6D41\u91CD\u7ED8\u3002\u540C\u65F6\u53EF\u4EE5\u5C06\u8017\u65F6\u957F\u7684\u4EFB\u52A1\u653E\u5728 <code>useEffect</code> \u7684\u56DE\u8C03\u4E2D\u6267\u884C\u3002</li></ul><h2 id="\u4F7F\u7528\u573A\u666F" tabindex="-1">\u4F7F\u7528\u573A\u666F <a class="header-anchor" href="#\u4F7F\u7528\u573A\u666F" aria-hidden="true">#</a></h2><p>\u76F8\u6BD4 <code>useEffect</code>\uFF0C<code>useLayoutEffect</code> \u65E0\u8BBA\u9500\u6BC1\u51FD\u6570\u548C\u56DE\u8C03\u51FD\u6570\u7684\u6267\u884C\u65F6\u673A\u90FD\u8981\u66F4\u65E9\u4E00\u4E9B\uFF0C\u4E14\u4F1A\u5728 <code>commit</code> \u9636\u6BB5\u4E2D\u540C\u6B65\u6267\u884C\u3002 \u56E0\u6B64 <code>useLayoutEffect</code> \u4E2D\u9002\u5408\u8FDB\u884C\u4E00\u4E9B\u53EF\u80FD\u5F71\u54CD dom \u7684\u64CD\u4F5C\uFF0C\u56E0\u4E3A\u5728\u5176 create \u4E2D\u53EF\u4EE5\u83B7\u53D6\u5230\u6700\u65B0\u7684 dom \u6811\u4E14\u7531\u4E8E\u6B64\u65F6\u6D4F\u89C8\u5668\u672A\u8FDB\u884C\u7ED8\u5236\uFF08\u672C\u8F6E\u4E8B\u4EF6\u5FAA\u73AF\u5C1A\u672A\u7ED3\u675F\uFF09\uFF0C \u56E0\u6B64\u4E0D\u4F1A\u6709\u4E2D\u95F4\u72B6\u6001\u7684\u4EA7\u751F\uFF0C\u53EF\u4EE5\u6709\u6548\u7684\u907F\u514D\u95EA\u52A8\u95EE\u9898\u3002\u56E0\u6B64\u5F53\u4E1A\u52A1\u4E2D\u51FA\u73B0\u9700\u8981\u5728 effect \u4E2D\u4FEE\u6539\u89C6\u56FE\uFF0C\u4E14\u6267\u884C\u7684\u4E0A\u4E00\u5E27\u4E2D\u89C6\u56FE\u53D8\u66F4\uFF0C\u5C31\u53EF\u4EE5\u8003\u8651\u662F\u5426\u5C06\u903B\u8F91\u653E\u5165 <code>useLayoutEffect</code> \u4E2D\u5904\u7406\u3002</p><p>\u5F53\u7136\uFF0C<code>useLayoutEffect</code> \u7684\u4F7F\u7528\u4E5F\u5E94\u5F53\u662F\u8C28\u614E\u7684\u3002\u7531\u4E8E js \u7EBF\u7A0B\u548C\u6E32\u67D3\u8FDB\u7A0B\u662F\u4E92\u65A5\u7684\uFF0C\u56E0\u6B64 <code>useLayoutEffects</code> \u4E2D\u4E0D\u5B9C\u52A0\u5165\u5F88\u8017\u65F6\u7684\u8BA1\u7B97\uFF0C\u5426\u5219\u4F1A\u5BFC\u81F4\u6D4F\u89C8\u5668\u6CA1\u6709\u65F6\u95F4\u91CD\u7ED8\u800C\u963B\u585E\u6E32\u67D3\u3002</p><p>\u7F51\u4E0A\u627E\u4E86\u4E2A\u5BF9\u6BD4\u56FE\uFF0C\u975E\u5E38\u660E\u663E\uFF0CuseEffect \u4F1A\u95EA\u52A8\u4E00\u4E0B\uFF0C\u5C31\u56E0\u4E3A\u5F15\u8D77\u4E86\u9875\u9762\u7684\u91CD\u65B0\u6E32\u67D3\u561B</p><p><img src="`+l+'" alt="useEffect"></p>',21),c=[p];function t(r,y,F,D,f,i){return o(),a("div",null,c)}var C=s(e,[["render",t]]);export{A as __pageData,C as default};
