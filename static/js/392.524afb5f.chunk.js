"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[392],{392:(e,t,i)=>{i.r(t),i.d(t,{default:()=>$});var r=i(43),n=Object.defineProperty,o=(e,t,i)=>((e,t,i)=>t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i)(e,"symbol"!==typeof t?t+"":t,i),s=new Map,d=new WeakMap,l=0,a=void 0;function c(e){return Object.keys(e).sort().filter((t=>void 0!==e[t])).map((t=>{return`${t}_${"root"===t?(i=e.root,i?(d.has(i)||(l+=1,d.set(i,l.toString())),d.get(i)):"0"):e[t]}`;var i})).toString()}function p(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:a;if("undefined"===typeof window.IntersectionObserver&&void 0!==r){const n=e.getBoundingClientRect();return t(r,{isIntersecting:r,target:e,intersectionRatio:"number"===typeof i.threshold?i.threshold:0,time:0,boundingClientRect:n,intersectionRect:n,rootBounds:n}),()=>{}}const{id:n,observer:o,elements:d}=function(e){const t=c(e);let i=s.get(t);if(!i){const r=new Map;let n;const o=new IntersectionObserver((t=>{t.forEach((t=>{var i;const o=t.isIntersecting&&n.some((e=>t.intersectionRatio>=e));e.trackVisibility&&"undefined"===typeof t.isVisible&&(t.isVisible=o),null==(i=r.get(t.target))||i.forEach((e=>{e(o,t)}))}))}),e);n=o.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),i={id:t,observer:o,elements:r},s.set(t,i)}return i}(i),l=d.get(e)||[];return d.has(e)||d.set(e,l),l.push(t),o.observe(e),function(){l.splice(l.indexOf(t),1),0===l.length&&(d.delete(e),o.unobserve(e)),0===d.size&&(o.disconnect(),s.delete(n))}}r.Component;var f=i(462),u=i(18),h=i(464),x=i(473),g=i(579);const b=(0,h.Ay)(f.N_)`
  text-decoration: none;
  display: block;
  cursor: pointer;
`,v=h.Ay.div`
  position: absolute;
  width: 100%;
  max-width: 220px;
  background-color: rgba(20, 23, 37, 0.85);
  border-radius: 8px;
  padding: 15px;
  border: 1px solid ${e=>e.isActive?"#ff4d79":"#304878"};
  transition: all 0.3s ease;
  transform: ${e=>e.isActive?"scale(1.1)":"scale(1)"};
  z-index: ${e=>e.isActive?15:5};
  box-shadow: ${e=>e.isActive?"0 0 15px #ff4d79":"0 4px 20px rgba(0, 0, 0, 0.2)"};
  left: ${e=>{var t;return(null===(t=e.position)||void 0===t?void 0:t.x)||0}}px;
  top: ${e=>{var t;return(null===(t=e.position)||void 0===t?void 0:t.y)||0}}px;

  @media (max-width: 768px) {
    position: relative !important;
    left: 0 !important;
    top: 0 !important;
    max-width: 100%;
    margin: 40px auto;
  }

  &:before {
    content: '${e=>e.checkpoint_id||""}';
    position: absolute;
    left: -15px;
    top: -15px;
    width: 30px;
    height: 30px;
    background: ${e=>e.isActive?"#ff4d79":"#304878"};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    z-index: 20;
    box-shadow: ${e=>e.isActive?"0 0 10px #ff4d79":"none"};
  }

  &:hover {
    transform: scale(1.1);
    border-color: #ff4d79;
    box-shadow: 0 0 15px #ff4d79;
    z-index: 15; /* Bring hovered checkpoints to the top */
  }
`,y=h.Ay.h3`
  color: white;
  margin: 0 0 5px;
  font-size: 1rem;
`,w=h.Ay.p`
  color: #b8c4d9;
  margin: 0 0 10px;
  font-size: 0.85rem;
`,m=h.Ay.p`
  color: white;
  font-size: 0.8rem;
  margin: 0 0 10px;
`,k=h.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
`,A=h.Ay.div`
  display: inline-block;
  margin-top: 10px;
  padding: 4px 8px;
  background: #304878;
  border-radius: 4px;
  color: white;
  font-size: 0.75rem;
  transition: background 0.3s;

  ${v}:hover & {
    background: #ff4d79;
  }
`,V=r.forwardRef(((e,t)=>{let{data:i,isActive:n,onInView:o}=e;const{ref:s,inView:d}=function(){let{threshold:e,delay:t,trackVisibility:i,rootMargin:n,root:o,triggerOnce:s,skip:d,initialInView:l,fallbackInView:a,onChange:c}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var f;const[u,h]=r.useState(null),x=r.useRef(c),[g,b]=r.useState({inView:!!l,entry:void 0});x.current=c,r.useEffect((()=>{if(d||!u)return;let r;return r=p(u,((e,t)=>{b({inView:e,entry:t}),x.current&&x.current(e,t),t.isIntersecting&&s&&r&&(r(),r=void 0)}),{root:o,rootMargin:n,threshold:e,trackVisibility:i,delay:t},a),()=>{r&&r()}}),[Array.isArray(e)?e.toString():e,u,o,n,s,d,i,a,t]);const v=null==(f=g.entry)?void 0:f.target,y=r.useRef(void 0);u||!v||s||d||y.current===v||(y.current=v,b({inView:!!l,entry:void 0}));const w=[h,g.inView,g.entry];return w.ref=w[0],w.inView=w[1],w.entry=w[2],w}({threshold:.5,triggerOnce:!1});return(0,r.useEffect)((()=>{d&&o(i.id)}),[d,i.id,o]),(0,g.jsx)(x.Hg,{name:`checkpoint-${i.id}`,children:(0,g.jsx)(b,{to:`/detail/${i.id}`,children:(0,g.jsxs)(v,{ref:e=>{t&&t(e),s(e)},isActive:n,position:i.position,checkpoint_id:i.id,children:[(0,g.jsx)(y,{children:i.title}),(0,g.jsx)(w,{children:i.subtitle}),(0,g.jsx)(m,{children:i.details}),(0,g.jsx)(k,{children:i.skills.map(((e,t)=>(0,g.jsx)(u.A,{skill:e},t)))}),(0,g.jsx)(A,{children:"View Details"})]})})})}));V.defaultProps={isActive:!1,data:{id:"",title:"",subtitle:"",details:"",position:{x:0,y:0},skills:[]}};const $=V}}]);
//# sourceMappingURL=392.524afb5f.chunk.js.map