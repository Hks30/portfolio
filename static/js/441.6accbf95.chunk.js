"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[441],{441:(t,e,n)=>{n.r(e),n.d(e,{default:()=>h});var a=n(43),r=n(464);const i=t=>{const[e,n]=(0,a.useState)({x:0,y:0});return(0,a.useEffect)((()=>{if(!t.current)return;const e=t=>{const{clientX:e,clientY:a}=t,{width:r,height:i}=window.innerWidth||document.documentElement.clientWidth;n({x:e-r/2,y:a-i/2})};return window.addEventListener("mousemove",e),()=>{window.removeEventListener("mousemove",e)}}),[t]),e};var o=n(579);const s=r.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
`,d=r.Ay.div`
  position: absolute;
  background: linear-gradient(
    to right, 
    transparent, 
    rgba(48, 72, 120, 0.3), 
    rgba(255, 77, 121, 0.3), 
    transparent
  );
  height: 1px;
  width: 100%;
  opacity: 0.2;
  animation: circuitFlow 10s linear infinite;
  
  @keyframes circuitFlow {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`,l=r.Ay.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, #ff4d79, #304878);
  border-radius: 50%;
  opacity: 0.7;
  box-shadow: 0 0 8px rgba(255, 77, 121, 0.5);
  animation: pulseNode 3s infinite ease-in-out;
  
  @keyframes pulseNode {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.5); }
  }
`,p=r.Ay.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg, 
    rgba(48, 72, 120, 0.05), 
    rgba(255, 77, 121, 0.05)
  );
  opacity: 0.8;
  z-index: -2;
  filter: blur(100px);
  animation: backgroundFlow 15s ease infinite alternate;
  
  @keyframes backgroundFlow {
    0% { opacity: 0.6; transform: scale(1); }
    100% { opacity: 0.8; transform: scale(1.1); }
  }
`,c=r.Ay.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(0deg, transparent 24%, rgba(48, 72, 120, 0.05) 25%, rgba(48, 72, 120, 0.05) 26%, transparent 27%, transparent 74%, rgba(48, 72, 120, 0.05) 75%, rgba(48, 72, 120, 0.05) 76%, transparent 77%, transparent),
    linear-gradient(90deg, transparent 24%, rgba(48, 72, 120, 0.05) 25%, rgba(48, 72, 120, 0.05) 26%, transparent 27%, transparent 74%, rgba(48, 72, 120, 0.05) 75%, rgba(48, 72, 120, 0.05) 76%, transparent 77%, transparent);
  background-size: 50px 50px;
  opacity: 0.1;
  z-index: -1;
`,h=()=>{const t=(0,a.useRef)(null),{x:e,y:n}=i(t),[r,h]=(0,a.useState)(0),[u,g]=(0,a.useState)(0),m=(0,a.useMemo)((()=>{const t=window.innerWidth>768;return Array.from({length:t?30:15}).map((()=>({top:100*Math.random(),left:100*Math.random(),size:3*Math.random()+2,delay:5*Math.random()})))}),[]),f=(0,a.useMemo)((()=>{const t=window.innerWidth>768;return Array.from({length:t?10:5}).map((()=>({top:100*Math.random(),delay:5*Math.random()})))}),[]);return(0,o.jsxs)("div",{ref:t,onMouseMove:t=>{const{clientX:e,clientY:n,currentTarget:a}=t,r=a.getBoundingClientRect();h((e-r.left)/r.width-.5),g((n-r.top)/r.height-.5)},style:{position:"relative",width:"100%",height:"100%"},children:[(0,o.jsx)(p,{style:{transform:`translate(${20*r}px, ${20*u}px)`}}),(0,o.jsx)(c,{}),(0,o.jsxs)(s,{children:[f.map(((t,e)=>(0,o.jsx)(d,{style:{top:`${t.top}%`,animationDelay:`${t.delay}s`}},`circuit-${e}`))),m.map(((t,e)=>(0,o.jsx)(l,{style:{top:`${t.top}%`,left:`${t.left}%`,width:`${t.size}px`,height:`${t.size}px`,transform:`translate(${10*r}px, ${10*u}px)`,animationDelay:`${t.delay}s`}},`node-${e}`)))]})]})}}}]);
//# sourceMappingURL=441.6accbf95.chunk.js.map