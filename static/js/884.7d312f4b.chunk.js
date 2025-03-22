"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[884],{884:(t,e,o)=>{o.r(e),o.d(e,{default:()=>c});o(43);var a=o(464),r=o(473),i=o(579);const n=a.Ay.div`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 100;

  @media (max-width: 768px) {
    right: 15px;
    gap: 10px;
  }
`,s=a.Ay.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${t=>t.active?"#ff4d79":"#304878"};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: scale(1.2);
    background-color: ${t=>t.active?"#ff4d79":"#5371b4"};
  }

  &:after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    border: 1px solid ${t=>t.active?"#ff4d79":"transparent"};
    animation: ${t=>t.active?"pulse 2s infinite":"none"};
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`,c=t=>{let{total:e,active:o,onDotClick:a}=t;const c=t=>{a?a(t):r.XG.scrollTo(`checkpoint-${t}`,{duration:800,delay:0,smooth:"easeInOutQuart",offset:-50})};return(0,i.jsx)(n,{children:Array.from({length:e}).map(((t,e)=>(0,i.jsx)(s,{active:o===e+1,onClick:()=>c(e+1),"aria-label":`Navigate to checkpoint ${e+1}`,role:"button",tabIndex:0,onKeyDown:t=>{"Enter"!==t.key&&" "!==t.key||c(e+1)}},e)))})}}}]);
//# sourceMappingURL=884.7d312f4b.chunk.js.map