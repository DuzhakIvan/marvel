"use strict";(self.webpackChunkmarvel=self.webpackChunkmarvel||[]).push([[64],{7341:function(n,e,t){var i=t(5671),r=t(9466),s=t(136),c=t(7277),o=t(2791),l=t(8519),a=t(184),u=function(n){(0,s.Z)(t,n);var e=(0,c.Z)(t);function t(){var n;(0,i.Z)(this,t);for(var r=arguments.length,s=new Array(r),c=0;c<r;c++)s[c]=arguments[c];return(n=e.call.apply(e,[this].concat(s))).state={error:!1},n}return(0,r.Z)(t,[{key:"componentDidCatch",value:function(n,e){console.log(n,e),this.setState({error:!0})}},{key:"render",value:function(){return this.state.error?(0,a.jsx)(l.Z,{}):this.props.children}}]),t}(o.Component);e.Z=u},5064:function(n,e,t){t.r(e),t.d(e,{default:function(){return h}});var i=t(1953),r=t(3433),s=t(9439),c=t(2791),o=t(1087),l=t(8519),a=t(108),u=t(4609),d=t(184),f=function(n){var e=(0,c.useState)(0),t=(0,s.Z)(e,2),i=t[0],f=t[1],m=(0,c.useState)([]),h=(0,s.Z)(m,2),v=h[0],j=h[1],p=(0,c.useState)(!0),_=(0,s.Z)(p,2),Z=_[0],x=_[1],b=(0,c.useState)(!1),g=(0,s.Z)(b,2),w=g[0],y=g[1],k=(0,u.Z)(),N=k.loading,C=k.error,E=k.getAllComics;(0,c.useEffect)((function(){window.addEventListener("scroll",L)}),[]),(0,c.useEffect)((function(){!Z||N||w||S(i,!0),w||window.addEventListener("scroll",L)}),[Z]);var S=function(n,e){x(!e),E(n).then(F).finally((function(){return x((function(){return!1}))}))},F=function(n){j((function(e){return[].concat((0,r.Z)(e),(0,r.Z)(n))})),f((function(n){return n+8})),y(n.length<8)},L=function n(){window.innerHeight+window.pageYOffset+50>=document.body.offsetHeight&&(x(!0),window.removeEventListener("scroll",n))};var A=function(n){var e=n.map((function(n,e){var t={objectFit:"cover"};return"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"===n.thumbnail&&(t={objectFit:"unset"}),(0,d.jsx)("li",{className:"comics__item",id:n.id,children:(0,d.jsxs)(o.rU,{to:"./".concat(n.id),children:[(0,d.jsx)("img",{src:n.thumbnail,style:t,alt:n.title}),(0,d.jsx)("span",{className:"comics__item__title",children:n.title}),(0,d.jsx)("span",{className:"comics__item__price",children:n.price})]})},e)}));return(0,d.jsx)("ul",{className:"comics__list",children:e})}(v),H=C?(0,d.jsx)(l.Z,{}):null,D=N&&!Z?(0,d.jsx)(a.Z,{}):null;return(0,d.jsxs)("div",{className:"comics",children:[H,D,A,(0,d.jsx)("button",{className:"button button__main button__long",disabled:Z,onClick:function(){return S(i)},style:{display:w?"none":"block"},children:(0,d.jsx)("div",{className:"inner",children:"load more"})})]})},m=t(7341),h=function(){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(i.Z,{}),(0,d.jsx)(m.Z,{children:(0,d.jsx)(f,{})})]})}}}]);
//# sourceMappingURL=64.7997eb88.chunk.js.map