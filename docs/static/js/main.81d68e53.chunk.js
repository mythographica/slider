(this["webpackJsonpmnemonica-react-slides"]=this["webpackJsonpmnemonica-react-slides"]||[]).push([[0],{350:function(e,t,n){e.exports=n(764)},359:function(e,t,n){var s={"./":65,"./errors":26,"./errors/":26,"./errors/index":26,"./errors/index.js":26,"./hooks":32,"./hooks/":32,"./hooks/flowCheckers":66,"./hooks/flowCheckers.js":66,"./hooks/index":32,"./hooks/index.js":32,"./hooks/invokeHook":113,"./hooks/invokeHook.js":113,"./hooks/registerHook":114,"./hooks/registerHook.js":114,"./index":65,"./index.js":65,"./types":67,"./types/":67,"./types/InstanceCreator":69,"./types/InstanceCreator.js":69,"./types/Mnemosyne":118,"./types/Mnemosyne.js":118,"./types/TypeProxy":115,"./types/TypeProxy.js":115,"./types/compileNewModificatorFunctionBody":70,"./types/compileNewModificatorFunctionBody.js":70,"./types/createInstanceModificator":117,"./types/createInstanceModificator.js":117,"./types/createInstanceModificator200XthWay":116,"./types/createInstanceModificator200XthWay.js":116,"./types/index":67,"./types/index.js":67,"./types/utils":38,"./types/utils.js":38};function i(e){var t=r(e);return n(t)}function r(e){if(!n.o(s,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return s[e]}i.keys=function(){return Object.keys(s)},i.resolve=r,e.exports=i,i.id=359},364:function(e,t,n){},685:function(e,t){},764:function(e,t,n){"use strict";n.r(t);var s=n(103),i=n.n(s),r=n(60),o=(n(364),n(0)),a=n.n(o),c=n(766),d=n(106),l=n(765);var h=({count:e,index:t})=>(e="".concat(e),t="".concat(t).padStart(e.length,"0"),a.a.createElement("div",{className:"Footer"},a.a.createElement("h3",{className:"myname"},"github@wentout"),a.a.createElement("h3",{className:"slides"}," ",t," \xbb ",e)));const p=function(){this.rootElement=document.getElementById(this.rootId)};p.prototype.View=function(){const e=this.slides,t=e.current,n=e.index,s=e.count,r=(new this[t.view]).View;i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(c.a,{theme:d.a},a.a.createElement(l.c,{min:0,max:s-1,value:n}),a.a.createElement(r,null),a.a.createElement(h,e))),this.rootElement)};var u=p;const x=function(){Object.assign(this,this.slides.current)};x.prototype.View=function(){return a.a.createElement("div",{className:"Title"},a.a.createElement("h1",null,this.title),a.a.createElement("h1",{className:"subtitle"},this.subtitle))};var f=x;const m=function(){Object.assign(this,this.slides.current)};m.prototype.View=function(){return a.a.createElement("div",{className:"Header"},a.a.createElement("h1",null,this.title))};var y=m,w=n(294),g=n(105),k=n.n(g),v=n(293),b=n(36);const j={tree:function({chartData:e,dy:t,dx:n,margin:s,width:i,stash:r}){const o=b.c(e),a=b.e().nodeSize([t,n]),c=b.d().x(e=>e.y).y(e=>e.x);o.x0=t,o.y0=0,o.descendants().forEach((e,t)=>{e.id=t,e._children=e.children,e.depth&&r&&r.includes(e.data.name)&&(e.children=null)});const d=b.a("svg").attr("viewBox",[-s.left,-s.top,i,n]).style("font","10px sans-serif").style("user-select","none"),l=d.append("g").attr("fill","none").attr("stroke","#555").attr("stroke-opacity",.4).attr("stroke-width",1.5),h=d.append("g").attr("cursor","pointer").attr("pointer-events","all");return function e(t){const n=b.b&&b.b.altKey?2500:250,r=o.descendants().reverse(),p=o.links();a(o);let u=o,x=o;o.eachBefore(e=>{e.x<u.x&&(u=e),e.x>x.x&&(x=e)});const f=x.x-u.x+s.top+s.bottom,m=d.transition().duration(n).attr("viewBox",[-s.left,u.x-s.top,i,f]).tween("resize",window.ResizeObserver?null:()=>()=>d.dispatch("toggle")),y=h.selectAll("g").data(r,e=>e.id),w=y.enter().append("g").attr("transform",e=>"translate(".concat(t.y0,",").concat(t.x0,")")).attr("fill-opacity",10).attr("stroke-opacity",10).on("click",t=>{t.children=t.children?null:t._children,e(t)});w.append("circle").attr("r",5).attr("fill",e=>e._children?"#555":"#999").attr("stroke-width",15),w.append("text").attr("dy","0.41em").attr("x",e=>e._children?-9:9).attr("text-anchor",e=>e._children?"end":"start").text(e=>e.data.name).clone(!0).lower().attr("stroke-linejoin","round").attr("stroke-width",5).attr("stroke","white"),y.merge(w).transition(m).attr("transform",e=>"translate(".concat(e.y,",").concat(e.x,")")).attr("fill-opacity",100).attr("stroke-opacity",1),y.exit().transition(m).remove().attr("transform",e=>"translate(".concat(t.y,",").concat(t.x,")")).attr("fill-opacity",0).attr("stroke-opacity",0);const g=l.selectAll("path").data(p,e=>e.target.id),k=g.enter().append("path").attr("d",e=>{const n={x:t.x0,y:t.y0};return c({source:n,target:n})});g.merge(k).transition(m).attr("d",c),g.exit().transition(m).remove().attr("d",e=>{const n={x:t.x,y:t.y};return c({source:n,target:n})}),o.eachBefore(e=>{e.x0=e.x,e.y0=e.y})}(o),d.node()}};var E=function(e){const t=e.id,n=e.opts,s=n.chart;return a.a.createElement("div",{ref:function(e){const t=j[s.type](s);e&&e.append(t)},id:t,className:"Chart"},n.title)};const I=function(){this.data=this.slides.current.data};I.prototype.View=function(){const e=this,t=e.data,n=k.a.sync(t),s={code:v.a,Heading:l.b,Box:l.a,app:function(t){const n=t.slide.key.split(".").reduce((e,t)=>e=e[t],e);return"".concat(n)},Chart:E},i={jsx:n,app:e},r=t;return a.a.createElement(c.a,{theme:d.a},a.a.createElement("div",{className:"Slide"},a.a.createElement(w.a,{components:s,scope:i},r)))};var L=I,O=n(292),N=n(3),S=n.n(N),M=n(291);const P=function(e){let t=0,n=[];this.rootId=e,this.slides={count:0,index:0,list:[],slideListIndex:t,direction:"next"},Object.defineProperty(this.slides,"count",{get(){return this.list.length}}),Object.defineProperty(this.slides,"current",{get:()=>n[t]}),Object.defineProperty(this.slides,"slideListLength",{get:()=>n.length}),Object.defineProperty(this.slides,"slideListIndex",{get:()=>t,set(e){t=parseInt(e)||0}}),Object.defineProperty(this.slides,"slideList",{set(e){Array.isArray(e)?(n=e,t="next"===this.direction?0:n.length-1):n=[e]}})};P.prototype={init(){var e=this;return Object(M.a)(S.a.mark((function t(){var n;return S.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.root=new e.Root,t.next=3,fetch("./slides/list.txt").then(e=>e.text()).catch(e=>e).then(e=>(e instanceof Error&&window.alert("something wrong"),e.split("\n").filter(Boolean).filter(e=>"list.txt"!==e)));case 3:return n=t.sent,e.slides.list.push(...n),t.abrupt("return",e);case 6:case"end":return t.stop()}}),t)})))()},start(){this.fetchSlide()},makeRender(){this.root.View()},setSlideIndex(e){const t=this.slides.count;if(void 0===e)e=this.slides.index;else{if("number"!==typeof e)throw new Error("index is not a number");if(e>=0&&e<t)this.slides.index=parseInt(e,10)||0;else{if(-1!==e)throw new Error("index is not valid");this.slides.index=t-1}}this.fetchSlide()},getNextSlide(){const e=this.slides.count;this.slides.index<e-1?this.slides.index++:this.slides.index=0,this.slides.direction="next",this.setSlideIndex()},getPrevSlide(){this.slides.index>0?this.slides.index--:this.slides.index=this.slides.count-1,this.slides.direction="prev",this.setSlideIndex()},slideNext(){const e=this.slides,t=e.slideListLength;e.slideListIndex=e.slideListIndex+1,e.slideListIndex>=t?this.getNextSlide():this.makeRender()},slidePrev(){const e=this.slides;e.slideListIndex=e.slideListIndex-1,e.slideListIndex<0?this.getPrevSlide():this.makeRender()},fetchSlide(){const e=this,t=e.slides,n=t.index,s=t.list;t.slideListIndex=0;const i=s[n],r=i.split("."),o=Object(O.a)(r,2)[1],a={md:"Mdx",mdx:"Mdx",jsx:"Jsx"},c="json"===o?"json":"text";fetch("./slides/".concat(i)).then(e=>e[c]()).catch(e=>e).then(n=>{if(n instanceof Error&&window.alert("something wrong"),"json"===o)Array.isArray(n),t.slideList=n;else{const e=a[o],s=n.split("-----").reduce((t,n)=>(n=n.split("\n").map(e=>e.trim()).join("\n"),t.push({view:e,data:n}),t),[]);t.slideList=s}e.makeRender()})},collectTypes(e,t=r.defaultCollection){return[...t].reduce((t,[n,s])=>{const i={name:n};return s.subtypes instanceof Map&&s.subtypes.size>0?i.children=this.collectTypes(e,s.subtypes):("function"===typeof e&&(i.children=e(i)),"string"===typeof e&&(i.children=[{name:"".concat(n).concat(e)}])),t.push(i),t},[])}};var _=P;window.onerror=function(...e){console.log(e)},r.defaultNamespace.registerHook("postCreation",(function({inheritedInstance:e}){Object.entries(Object.getPrototypeOf(e)).forEach(([t,n])=>{"function"===typeof n&&(e[t]=(...t)=>{try{return n.call(e,...t)}catch(s){throw s.instance=e,s}})})}));const C=Object(r.define)("Main",_),B=C.define("Root",u);B.define("Title",f),B.define("Header",y),B.define("Mdx",L);const H=C.call(s.Component,"root");H.init().then(H.start).then(function(){const e=this,t=new window.keypress.Listener;t.simple_combo("left",e.slidePrev),t.simple_combo("right",e.slideNext),t.simple_combo("home",e.setSlideIndex.bind(e,0)),t.simple_combo("end",e.setSlideIndex.bind(e,-1)),t.simple_combo("ctrl m",()=>{const t=e.slides.count,n="please input slide number between 1 an ".concat(t+1),s=window.prompt(n);var i;try{-1===(i=parseInt(s,10)-1)&&(i=0)}catch(r){window.alert("invalid input")}try{e.setSlideIndex(i)}catch(r){window.alert(r.message)}})}.bind(H))}},[[350,1,2]]]);
//# sourceMappingURL=main.81d68e53.chunk.js.map