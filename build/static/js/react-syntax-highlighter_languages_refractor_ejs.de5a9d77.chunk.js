"use strict";(self.webpackChunksdk=self.webpackChunksdk||[]).push([[7176,3047],{8331:function(e,n,a){var t=a(595);function s(e){e.register(t),function(e){e.languages.ejs={delimiter:{pattern:/^<%[-_=]?|[-_]?%>$/,alias:"punctuation"},comment:/^#[\s\S]*/,"language-javascript":{pattern:/[\s\S]+/,inside:e.languages.javascript}},e.hooks.add("before-tokenize",(function(n){e.languages["markup-templating"].buildPlaceholders(n,"ejs",/<%(?!%)[\s\S]+?%>/g)})),e.hooks.add("after-tokenize",(function(n){e.languages["markup-templating"].tokenizePlaceholders(n,"ejs")})),e.languages.eta=e.languages.ejs}(e)}e.exports=s,s.displayName="ejs",s.aliases=["eta"]},595:function(e){function n(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(a,t,s,o){if(a.language===t){var i=a.tokenStack=[];a.code=a.code.replace(s,(function(e){if("function"===typeof o&&!o(e))return e;for(var s,r=i.length;-1!==a.code.indexOf(s=n(t,r));)++r;return i[r]=e,s})),a.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(a,t){if(a.language===t&&a.tokenStack){a.grammar=e.languages[t];var s=0,o=Object.keys(a.tokenStack);!function i(r){for(var u=0;u<r.length&&!(s>=o.length);u++){var l=r[u];if("string"===typeof l||l.content&&"string"===typeof l.content){var g=o[s],c=a.tokenStack[g],p="string"===typeof l?l:l.content,f=n(t,g),k=p.indexOf(f);if(k>-1){++s;var d=p.substring(0,k),m=new e.Token(t,e.tokenize(c,a.grammar),"language-"+t,c),h=p.substring(k+f.length),v=[];d&&v.push.apply(v,i([d])),v.push(m),h&&v.push.apply(v,i([h])),"string"===typeof l?r.splice.apply(r,[u,1].concat(v)):l.content=v}}else l.content&&i(l.content)}return r}(a.tokens)}}}})}(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_ejs.de5a9d77.chunk.js.map