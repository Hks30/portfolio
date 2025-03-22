"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[441],{441:(t,e,a)=>{a.r(e),a.d(e,{default:()=>y});var i=a(43),o=a(464);const n=t=>{const[e,a]=(0,i.useState)({x:0,y:0});return(0,i.useEffect)((()=>{if(!t.current)return;const e=t=>{const{clientX:e,clientY:i}=t,{width:o,height:n}=window.innerWidth||document.documentElement.clientWidth;a({x:e-o/2,y:i-n/2})};return window.addEventListener("mousemove",e),()=>{window.removeEventListener("mousemove",e)}}),[t]),e};var s=a(579);const r=o.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`,l=o.Ay.div`
  position: absolute;
  border-radius: 50%;
  background-color: ${t=>t.color||"#304878"};
  opacity: ${t=>t.opacity||.15};
  width: ${t=>`${t.size}vw`};
  height: ${t=>`${t.size}vw`};
  max-width: ${t=>`${t.maxSize}px`};
  max-height: ${t=>`${t.maxSize}px`};
  top: ${t=>t.top}%;
  left: ${t=>t.left}%;
  transform: translate(${t=>t.x}px, ${t=>t.y}px);
  transition: transform 0.2s ease-out;
  box-shadow: 0 0 ${t=>t.glow?"15px":"0"} ${t=>t.glow?t.color:"transparent"};
  animation: pulse 8s infinite ease-in-out;
  animation-delay: ${t=>t.delay}s;
  
  @keyframes pulse {
    0% {
      transform: translate(${t=>t.x}px, ${t=>t.y}px) scale(1);
      opacity: ${t=>t.opacity||.15};
    }
    50% {
      transform: translate(${t=>t.x}px, ${t=>t.y}px) scale(1.1);
      opacity: ${t=>(t.opacity||.15)+.05};
    }
    100% {
      transform: translate(${t=>t.x}px, ${t=>t.y}px) scale(1);
      opacity: ${t=>t.opacity||.15};
    }
  }
`,p=o.Ay.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: white;
  opacity: ${t=>t.opacity};
  top: ${t=>t.top}%;
  left: ${t=>t.left}%;
  border-radius: 50%;
  box-shadow: 0 0 3px white;
  animation: twinkle ${t=>t.duration}s infinite ease-in-out;
  animation-delay: ${t=>t.delay}s;
  
  @keyframes twinkle {
    0% { opacity: ${t=>t.opacity}; }
    50% { opacity: 0.1; }
    100% { opacity: ${t=>t.opacity}; }
  }
`,d=o.Ay.div`
  position: absolute;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, #ff4d79, #304878);
  opacity: 0.5;
  animation: flow 5s linear infinite, pulseGlow 3s infinite ease-in-out;
  z-index: -1;

  &:nth-child(1) {
    left: 20%;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    left: 50%;
    animation-delay: 1s;
  }

  &:nth-child(3) {
    left: 80%;
    animation-delay: 2s;
  }

  @keyframes flow {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }

  @keyframes pulseGlow {
    0%, 100% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.7;
    }
  }
`,c=o.Ay.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;

  .shape {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff4d79, #304878);
    opacity: 0.1;
    animation: float 10s infinite ease-in-out, rotate 20s infinite linear;
  }

  .shape.small {
    width: 50px;
    height: 50px;
    top: 10%;
    left: 20%;
    animation-delay: 0s;
  }

  .shape.large {
    width: 150px;
    height: 150px;
    top: 70%;
    left: 80%;
    animation-delay: 2s;
  }

  .shape.hexagon {
    width: 80px;
    height: 80px;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    background: linear-gradient(135deg, #304878, #ff4d79);
    top: 40%;
    left: 50%;
    animation-delay: 1s;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`,f=o.Ay.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(255, 77, 121, 0.2), rgba(48, 72, 120, 0.1));
  z-index: -2;
  animation: glowPulse 5s infinite ease-in-out;

  @keyframes glowPulse {
    0%, 100% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.4;
    }
  }
`,h=t=>{let{stars:e=[],circles:a=[]}=t;const o=(0,i.useRef)(null),{x:h,y:y}=n(o),[x,m]=(0,i.useState)(0),[u,g]=(0,i.useState)(0);return(0,s.jsxs)("div",{ref:o,onMouseMove:t=>{const{clientX:e,clientY:a,currentTarget:i}=t,o=i.getBoundingClientRect();m((e-o.left)/o.width-.5),g((a-o.top)/o.height-.5)},children:[(0,s.jsx)(f,{}),(0,s.jsxs)(r,{children:[(0,s.jsxs)(c,{children:[(0,s.jsx)("div",{className:"shape small",style:{transform:`translate(${10*x}px, ${10*u}px)`}}),(0,s.jsx)("div",{className:"shape large",style:{transform:`translate(${-15*x}px, ${-15*u}px)`}}),(0,s.jsx)("div",{className:"shape hexagon",style:{transform:`translate(${5*x}px, ${5*u}px)`}})]}),(0,s.jsx)(d,{}),(0,s.jsx)(d,{}),(0,s.jsx)(d,{}),e.map(((t,e)=>(0,s.jsx)(p,{top:t.top+5*u,left:t.left+5*x,opacity:t.opacity,duration:t.duration,delay:t.delay,animate:!0},`star-${e}`))),a.map(((t,e)=>(0,s.jsx)(l,{size:t.size,maxSize:t.maxSize,top:t.top,left:t.left,color:t.color,opacity:t.opacity,x:h*t.factor*-1+10*x,y:y*t.factor*-1+10*u,glow:t.glow,delay:t.delay,animate:!0},e)))]})]})};h.defaultProps={stars:[],circles:[]};const y=h}}]);
//# sourceMappingURL=441.c1a400c0.chunk.js.map