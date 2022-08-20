import{_ as t,c as e,o as a,a as i}from"./app.6c056f52.js";const m=JSON.parse('{"title":"Q & A","description":"","frontmatter":{},"headers":[{"level":2,"title":"startTransition \u76F8\u6BD4 setTimeout \u7684\u4F18\u52BF\u548C\u5F02\u540C\u662F\u4EC0\u4E48\uFF1F","slug":"starttransition-\u76F8\u6BD4-settimeout-\u7684\u4F18\u52BF\u548C\u5F02\u540C\u662F\u4EC0\u4E48\uFF1F"}],"relativePath":"pages/react/hard/hooks/qa.md"}'),o={name:"pages/react/hard/hooks/qa.md"},s=i('<h1 id="q-a" tabindex="-1">Q &amp; A <a class="header-anchor" href="#q-a" aria-hidden="true">#</a></h1><h2 id="starttransition-\u76F8\u6BD4-settimeout-\u7684\u4F18\u52BF\u548C\u5F02\u540C\u662F\u4EC0\u4E48\uFF1F" tabindex="-1">startTransition \u76F8\u6BD4 setTimeout \u7684\u4F18\u52BF\u548C\u5F02\u540C\u662F\u4EC0\u4E48\uFF1F <a class="header-anchor" href="#starttransition-\u76F8\u6BD4-settimeout-\u7684\u4F18\u52BF\u548C\u5F02\u540C\u662F\u4EC0\u4E48\uFF1F" aria-hidden="true">#</a></h2><ul><li><p>\u4E00\u65B9\u9762\uFF1A<code>startTransition</code> \u7684\u5904\u7406\u903B\u8F91\u548C setTimeout \u6709\u4E00\u4E2A\u5F88\u91CD\u8981\u7684\u533A\u522B\uFF0CsetTimeout \u662F\u5F02\u6B65\u5EF6\u65F6\u6267\u884C\uFF0C\u800C <code>startTransition</code> \u7684\u56DE\u8C03\u51FD\u6570\u662F\u540C\u6B65\u6267\u884C\u7684\u3002 \u5728 <code>startTransition</code> \u4E4B\u4E2D\u4EFB\u4F55\u66F4\u65B0\uFF0C\u90FD\u4F1A\u6807\u8BB0\u4E0A transition\uFF0CReact \u5C06\u5728\u66F4\u65B0\u7684\u65F6\u5019\uFF0C\u5224\u65AD\u8FD9\u4E2A\u6807\u8BB0\u6765\u51B3\u5B9A\u662F\u5426\u5B8C\u6210\u6B64\u6B21\u66F4\u65B0\u3002\u6240\u4EE5 Transition \u53EF\u4EE5\u7406\u89E3\u6210\u6BD4 setTimeout \u66F4\u65E9\u7684\u66F4\u65B0\u3002\u4F46\u662F\u540C\u65F6\u8981\u4FDD\u8BC1 ui \u7684\u6B63\u5E38\u54CD\u5E94\uFF0C\u5728\u6027\u80FD\u597D\u7684\u8BBE\u5907\u4E0A\uFF0Ctransition \u4E24\u6B21\u66F4\u65B0\u7684\u5EF6\u8FDF\u4F1A\u5F88\u5C0F\uFF0C\u4F46\u662F\u5728\u6162\u7684\u8BBE\u5907\u4E0A\uFF0C\u5EF6\u65F6\u4F1A\u5F88\u5927\uFF0C\u4F46\u662F\u4E0D\u4F1A\u5F71\u54CD UI \u7684\u54CD\u5E94\u3002</p></li><li><p>\u53E6\u4E00\u65B9\u9762\uFF0C\u5C31\u662F\u901A\u8FC7\u4E0A\u9762\u4F8B\u5B50\uFF0C\u53EF\u4EE5\u770B\u5230\uFF0C\u5BF9\u4E8E\u6E32\u67D3\u5E76\u53D1\u7684\u573A\u666F\u4E0B\uFF0C<code>setTimeout</code> \u4ECD\u7136\u4F1A\u4F7F\u9875\u9762\u5361\u987F\u3002\u56E0\u4E3A\u8D85\u65F6\u540E\uFF0C\u8FD8\u4F1A\u6267\u884C setTimeout \u7684\u4EFB\u52A1\uFF0C\u5B83\u4EEC\u4E0E\u7528\u6237\u4EA4\u4E92\u540C\u6837\u5C5E\u4E8E\u5B8F\u4EFB\u52A1\uFF0C\u6240\u4EE5\u4ECD\u7136\u4F1A\u963B\u6B62\u9875\u9762\u7684\u4EA4\u4E92\u3002 \u90A3\u4E48 transition \u5C31\u4E0D\u540C\u4E86\uFF0C\u5728 conCurrent mode \u4E0B\uFF0C<code>startTransition</code> \u662F\u53EF\u4EE5\u4E2D\u65AD\u6E32\u67D3\u7684 \uFF0C\u6240\u4EE5\u5B83\u4E0D\u4F1A\u8BA9\u9875\u9762\u5361\u987F\uFF0CReact \u8BA9\u8FD9\u4E9B\u4EFB\u52A1\uFF0C\u5728\u6D4F\u89C8\u5668\u7A7A\u95F2\u65F6\u95F4\u6267\u884C\uFF0C\u6240\u4EE5\u4E0A\u8FF0\u8F93\u5165 input \u5185\u5BB9\u65F6\uFF0C<code>startTransition</code> \u4F1A\u4F18\u5148\u5904\u7406 input \u503C\u7684\u66F4\u65B0\uFF0C\u800C\u4E4B\u540E\u624D\u662F\u5217\u8868\u7684\u6E32\u67D3</p></li></ul>',3),r=[s];function n(c,d,_,u,h,T){return a(),e("div",null,r)}var p=t(o,[["render",n]]);export{m as __pageData,p as default};
