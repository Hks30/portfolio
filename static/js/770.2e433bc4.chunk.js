"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[770],{770:(t,e,n)=>{n.r(e),n.d(e,{default:()=>m});var i=n(43),o=n(464);const s={delta:10,preventScrollOnSwipe:!1,rotationAngle:0,trackMouse:!1,trackTouch:!0,swipeDuration:1/0,touchEventOptions:{passive:!0}},a={first:!0,initial:[0,0],start:0,swiping:!1,xy:[0,0]},r="mousemove",c="mouseup";function p(t,e){if(0===e)return t;const n=Math.PI/180*e;return[t[0]*Math.cos(n)+t[1]*Math.sin(n),t[1]*Math.cos(n)-t[0]*Math.sin(n)]}function u(t,e){const n=e=>{const n="touches"in e;n&&e.touches.length>1||t(((t,o)=>{o.trackMouse&&!n&&(document.addEventListener(r,i),document.addEventListener(c,u));const{clientX:s,clientY:l}=n?e.touches[0]:e,d=p([s,l],o.rotationAngle);return o.onTouchStartOrOnMouseDown&&o.onTouchStartOrOnMouseDown({event:e}),Object.assign(Object.assign(Object.assign({},t),a),{initial:d.slice(),xy:d,start:e.timeStamp||0})}))},i=e=>{t(((t,n)=>{const i="touches"in e;if(i&&e.touches.length>1)return t;if(e.timeStamp-t.start>n.swipeDuration)return t.swiping?Object.assign(Object.assign({},t),{swiping:!1}):t;const{clientX:o,clientY:a}=i?e.touches[0]:e,[r,c]=p([o,a],n.rotationAngle),u=r-t.xy[0],l=c-t.xy[1],d=Math.abs(u),h=Math.abs(l),g=(e.timeStamp||0)-t.start,f=Math.sqrt(d*d+h*h)/(g||1),x=[u/(g||1),l/(g||1)],v=function(t,e,n,i){return t>e?n>0?"Right":"Left":i>0?"Down":"Up"}(d,h,u,l),m="number"===typeof n.delta?n.delta:n.delta[v.toLowerCase()]||s.delta;if(d<m&&h<m&&!t.swiping)return t;const b={absX:d,absY:h,deltaX:u,deltaY:l,dir:v,event:e,first:t.first,initial:t.initial,velocity:f,vxvy:x};b.first&&n.onSwipeStart&&n.onSwipeStart(b),n.onSwiping&&n.onSwiping(b);let w=!1;return(n.onSwiping||n.onSwiped||n[`onSwiped${v}`])&&(w=!0),w&&n.preventScrollOnSwipe&&n.trackTouch&&e.cancelable&&e.preventDefault(),Object.assign(Object.assign({},t),{first:!1,eventData:b,swiping:!0})}))},o=e=>{t(((t,n)=>{let i;if(t.swiping&&t.eventData){if(e.timeStamp-t.start<n.swipeDuration){i=Object.assign(Object.assign({},t.eventData),{event:e}),n.onSwiped&&n.onSwiped(i);const o=n[`onSwiped${i.dir}`];o&&o(i)}}else n.onTap&&n.onTap({event:e});return n.onTouchEndOrOnMouseUp&&n.onTouchEndOrOnMouseUp({event:e}),Object.assign(Object.assign(Object.assign({},t),a),{eventData:i})}))},u=t=>{document.removeEventListener(r,i),document.removeEventListener(c,u),o(t)},l=(t,e)=>{let a=()=>{};if(t&&t.addEventListener){const r=Object.assign(Object.assign({},s.touchEventOptions),e.touchEventOptions),c=[["touchstart",n,r],["touchmove",i,Object.assign(Object.assign({},r),e.preventScrollOnSwipe?{passive:!1}:{})],["touchend",o,r]];c.forEach((e=>{let[n,i,o]=e;return t.addEventListener(n,i,o)})),a=()=>c.forEach((e=>{let[n,i]=e;return t.removeEventListener(n,i)}))}return a},d={ref:e=>{null!==e&&t(((t,n)=>{if(t.el===e)return t;const i={};return t.el&&t.el!==e&&t.cleanUpTouch&&(t.cleanUpTouch(),i.cleanUpTouch=void 0),n.trackTouch&&e&&(i.cleanUpTouch=l(e,n)),Object.assign(Object.assign(Object.assign({},t),{el:e}),i)}))}};return e.trackMouse&&(d.onMouseDown=n),[d,l]}function l(t){const{trackMouse:e}=t,n=i.useRef(Object.assign({},a)),o=i.useRef(Object.assign({},s)),r=i.useRef(Object.assign({},o.current));let c;for(c in r.current=Object.assign({},o.current),o.current=Object.assign(Object.assign({},s),t),s)void 0===o.current[c]&&(o.current[c]=s[c]);const[p,l]=i.useMemo((()=>u((t=>n.current=t(n.current,o.current)),{trackMouse:e})),[e]);return n.current=function(t,e,n,i){return e.trackTouch&&t.el?t.cleanUpTouch?e.preventScrollOnSwipe!==n.preventScrollOnSwipe||e.touchEventOptions.passive!==n.touchEventOptions.passive?(t.cleanUpTouch(),Object.assign(Object.assign({},t),{cleanUpTouch:i(t.el,e)})):t:Object.assign(Object.assign({},t),{cleanUpTouch:i(t.el,e)}):(t.cleanUpTouch&&t.cleanUpTouch(),Object.assign(Object.assign({},t),{cleanUpTouch:void 0}))}(n.current,o.current,r.current,l),p}var d=n(579);const h=o.Ay.div`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 50;
  
  @media (max-width: 768px) {
    right: 15px;
    gap: 20px; /* Increased gap for better touch targets */
  }
  
  @media (max-width: 480px) {
    right: 10px;
  }
`,g=o.Ay.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${t=>t.active?"#ff4d79":"#304878"};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  @media (max-width: 768px) {
    width: 16px; /* Larger dots on mobile */
    height: 16px;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    border: 1px solid ${t=>t.active?"#ff4d79":"transparent"};
    transition: all 0.3s ease;
    opacity: ${t=>t.active?1:0};
    animation: ${t=>t.active?"pulse 2s infinite":"none"};
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  &:hover {
    transform: scale(1.2);
    background: #ff4d79;
    box-shadow: 0 0 10px rgba(255, 77, 121, 0.5);
  }
  
  /* Larger touch area for mobile */
  &:before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    
    @media (max-width: 768px) {
      top: -20px;
      left: -20px;
      right: -20px;
      bottom: -20px;
    }
  }
`,f=o.Ay.span`
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  white-space: nowrap;
  background: rgba(20, 23, 37, 0.85);
  padding: 3px 8px;
  border-radius: 4px;
  
  ${g}:hover & {
    opacity: 1;
  }
`,x=o.Ay.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  text-align: center;
  opacity: 0.8;
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  svg {
    width: 24px;
    height: 24px;
    animation: swipeAnim 2s infinite ease-in-out;
  }
  
  @keyframes swipeAnim {
    0% {
      transform: translateX(-5px);
      opacity: 0.5;
    }
    50% {
      transform: translateX(5px);
      opacity: 1;
    }
    100% {
      transform: translateX(-5px);
      opacity: 0.5;
    }
  }
`,v=t=>{let{total:e,active:n,onDotClick:i,labels:o=[],onSwipe:s}=t;const a=l({onSwipedUp:()=>s&&n<e&&s(n+1),onSwipedDown:()=>s&&n>1&&s(n-1),preventDefaultTouchmoveEvent:!0,trackMouse:!1}),r=Array.from({length:e},((t,e)=>e+1));return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{...a,children:(0,d.jsx)(h,{children:r.map((t=>(0,d.jsx)(g,{active:n===t,onClick:()=>i(t),children:(0,d.jsx)(f,{children:o[t-1]||`Checkpoint ${t}`})},t)))})}),(0,d.jsxs)(x,{children:[(0,d.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,d.jsx)("path",{d:"M7 13L12 18L17 13",stroke:"white",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,d.jsx)("path",{d:"M7 7L12 12L17 7",stroke:"white",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),"Swipe to navigate"]})]})},m=i.memo(v)}}]);
//# sourceMappingURL=770.2e433bc4.chunk.js.map