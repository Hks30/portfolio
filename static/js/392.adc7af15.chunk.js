"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[392],{392:(e,t,i)=>{i.r(t),i.d(t,{default:()=>z});var r=i(43),n=Object.defineProperty,o=(e,t,i)=>((e,t,i)=>t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i)(e,"symbol"!==typeof t?t+"":t,i),s=new Map,a=new WeakMap,d=0,l=void 0;function c(e){return Object.keys(e).sort().filter((t=>void 0!==e[t])).map((t=>{return`${t}_${"root"===t?(i=e.root,i?(a.has(i)||(d+=1,a.set(i,d.toString())),a.get(i)):"0"):e[t]}`;var i})).toString()}function p(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:l;if("undefined"===typeof window.IntersectionObserver&&void 0!==r){const n=e.getBoundingClientRect();return t(r,{isIntersecting:r,target:e,intersectionRatio:"number"===typeof i.threshold?i.threshold:0,time:0,boundingClientRect:n,intersectionRect:n,rootBounds:n}),()=>{}}const{id:n,observer:o,elements:a}=function(e){const t=c(e);let i=s.get(t);if(!i){const r=new Map;let n;const o=new IntersectionObserver((t=>{t.forEach((t=>{var i;const o=t.isIntersecting&&n.some((e=>t.intersectionRatio>=e));e.trackVisibility&&"undefined"===typeof t.isVisible&&(t.isVisible=o),null==(i=r.get(t.target))||i.forEach((e=>{e(o,t)}))}))}),e);n=o.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),i={id:t,observer:o,elements:r},s.set(t,i)}return i}(i),d=a.get(e)||[];return a.has(e)||a.set(e,d),d.push(t),o.observe(e),function(){d.splice(d.indexOf(t),1),0===d.length&&(a.delete(e),o.unobserve(e)),0===a.size&&(o.disconnect(),s.delete(n))}}r.Component;var f=i(462),h=i(18),x=i(464),g=i(473),m=i(579);const u=(0,x.Ay)(f.N_)`
  text-decoration: none;
  display: block;
  cursor: pointer;
`,b=x.Ay.div`
  position: absolute;
  width: 100%;
  max-width: 220px;
  background-color: rgba(18, 25, 52, 0.9); /* Increased opacity for better contrast */
  border-radius: 8px;
  padding: 18px; /* Increased padding */
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
    margin: 40px auto; /* Increased vertical margin for better spacing */
    transform: scale(1) !important; 
    border: 1px solid ${e=>e.isActive?"#ff4d79":"#304878"};
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    margin: 30px auto; /* Better spacing */
    margin-top: 30px;
    width: 92%;
  }

  &:before {
    content: '${e=>e.checkpoint_id||""}';
    position: absolute;
    left: -15px;
    top: -15px;
    width: 32px; /* Slightly larger */
    height: 32px;
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
`,v=x.Ay.h3`
  color: white;
  margin: 0 0 8px; /* Increased margin */
  font-size: 1.1rem;
  
  @media (max-width: 480px) {
    font-size: 1.25rem; /* Increased font size for mobile */
    margin-bottom: 10px;
  }
`,w=x.Ay.p`
  color: #b8c4d9;
  margin: 0 0 12px; /* Increased margin */
  font-size: 0.9rem;
  
  @media (max-width: 480px) {
    font-size: 1rem; /* Increased font size for mobile */
    margin-bottom: 14px;
  }
`,y=x.Ay.p`
  color: white;
  font-size: 0.85rem;
  margin: 0 0 14px; /* Increased margin */
  line-height: 1.5; /* Improved line height for readability */
  
  @media (max-width: 480px) {
    font-size: 0.95rem; /* Increased font size for mobile */
    line-height: 1.6;
  }
`,k=x.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px; /* Increased gap */
  margin-top: 12px;

  @media (max-width: 480px) {
    justify-content: flex-start; /* Changed to flex-start for better alignment */
    gap: 8px;
    margin-top: 16px;
  }
`,A=x.Ay.div`
  display: inline-block;
  margin-top: 14px;
  padding: 6px 12px; /* Increased padding */
  background: #304878;
  border-radius: 4px;
  color: white;
  font-size: 0.8rem;
  transition: background 0.3s, transform 0.2s;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 8px 14px;
    margin-top: 18px;
  }

  ${b}:hover & {
    background: #ff4d79;
    transform: translateY(-2px); /* Subtle lift effect */
  }
`,I=r.forwardRef(((e,t)=>{let{data:i,isActive:n,onInView:o}=e;const{ref:s,inView:a}=function(){let{threshold:e,delay:t,trackVisibility:i,rootMargin:n,root:o,triggerOnce:s,skip:a,initialInView:d,fallbackInView:l,onChange:c}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var f;const[h,x]=r.useState(null),g=r.useRef(c),[m,u]=r.useState({inView:!!d,entry:void 0});g.current=c,r.useEffect((()=>{if(a||!h)return;let r;return r=p(h,((e,t)=>{u({inView:e,entry:t}),g.current&&g.current(e,t),t.isIntersecting&&s&&r&&(r(),r=void 0)}),{root:o,rootMargin:n,threshold:e,trackVisibility:i,delay:t},l),()=>{r&&r()}}),[Array.isArray(e)?e.toString():e,h,o,n,s,a,i,l,t]);const b=null==(f=m.entry)?void 0:f.target,v=r.useRef(void 0);h||!b||s||a||v.current===b||(v.current=b,u({inView:!!d,entry:void 0}));const w=[x,m.inView,m.entry];return w.ref=w[0],w.inView=w[1],w.entry=w[2],w}({threshold:.5,triggerOnce:!1});return(0,r.useEffect)((()=>{a&&o(i.id)}),[a,i.id,o]),(0,m.jsx)(g.Hg,{name:`checkpoint-${i.id}`,children:(0,m.jsx)(u,{to:`/detail/${i.id}`,children:(0,m.jsxs)(b,{ref:e=>{t&&t(e),s(e)},isActive:n,position:i.position,checkpoint_id:i.id,children:[(0,m.jsx)(v,{children:i.title}),(0,m.jsx)(w,{children:i.subtitle}),(0,m.jsx)(y,{children:i.details}),(0,m.jsx)(k,{children:i.skills.map(((e,t)=>(0,m.jsx)(h.A,{skill:e},t)))}),(0,m.jsx)(A,{children:"View Details"})]})})})}));I.defaultProps={isActive:!1,data:{id:"",title:"",subtitle:"",details:"",position:{x:0,y:0},skills:[]}};const z=I}}]);
//# sourceMappingURL=392.adc7af15.chunk.js.map