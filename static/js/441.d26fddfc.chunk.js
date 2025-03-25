"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[441],{441:(t,a,e)=>{e.r(a),e.d(a,{default:()=>f});var o=e(43),i=e(464);const n=t=>{const[a,e]=(0,o.useState)({x:0,y:0});return(0,o.useEffect)((()=>{if(!t.current)return;const a=t=>{const{clientX:a,clientY:o}=t,{width:i,height:n}=window.innerWidth||document.documentElement.clientWidth;e({x:a-i/2,y:o-n/2})};return window.addEventListener("mousemove",a),()=>{window.removeEventListener("mousemove",a)}}),[t]),a};var r=e(579);const s=i.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`,l=i.Ay.div`
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
`,d=i.Ay.div`
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
`,p=i.Ay.div`
  position: absolute;
  width: 3px; /* Slightly wider */
  height: 100%;
  background: linear-gradient(to bottom, #ff4d79, #304878);
  opacity: 0.6; /* Slightly more visible */
  z-index: -1;
  box-shadow: 0 0 8px rgba(255, 77, 121, 0.5); /* Added glow effect */
  animation: flow 7s linear infinite, 
             pulseGlow 3s infinite ease-in-out,
             widthPulse 5s infinite ease-in-out; /* Width animation */
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    background-color: #ff4d79;
    border-radius: 50%;
    box-shadow: 0 0 10px #ff4d79, 0 0 20px #ff4d79;
    opacity: 0.8;
    animation: particleFlow 4s linear infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 5px;
    height: 5px;
    background-color: #304878;
    border-radius: 50%;
    box-shadow: 0 0 8px #304878;
    opacity: 0.8;
    animation: particleFlow 3s linear infinite 1.5s;
  }

  &:nth-child(1) {
    left: 50%; /* Center pipeline */
    animation-delay: 0s;
    &::before { animation-delay: 0.5s; }
    &::after { animation-delay: 2s; }
  }

  &:nth-child(2) {
    left: 20%; /* Moved to left side */
    width: 2px; /* Thinner */
    opacity: 0.4;
    animation-delay: 1s;
    &::before { animation-delay: 1s; }
    &::after { animation-delay: 3s; }
  }

  &:nth-child(3) {
    left: 80%; /* Moved to right side */
    width: 2px; /* Thinner */
    opacity: 0.4;
    animation-delay: 2s;
    &::before { animation-delay: 1.5s; }
    &::after { animation-delay: 4s; }
  }

  /* Add connectors between pipelines */
  &:nth-child(2)::after {
    content: '';
    position: absolute;
    top: 40%;
    left: 0;
    width: 30vw; /* Horizontal connector width */
    height: 1px;
    background: linear-gradient(to right, transparent, #304878, transparent);
    opacity: 0.3;
    animation: none;
    box-shadow: 0 0 5px #304878;
    transform: none;
    border-radius: 0;
  }

  &:nth-child(3)::after {
    content: '';
    position: absolute;
    top: 70%;
    left: -30vw;
    width: 30vw; /* Horizontal connector width */
    height: 1px;
    background: linear-gradient(to right, transparent, #ff4d79, transparent);
    opacity: 0.3;
    animation: none;
    box-shadow: 0 0 5px #ff4d79;
    transform: none;
    border-radius: 0;
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
      opacity: 0.6;
      box-shadow: 0 0 8px rgba(255, 77, 121, 0.5);
    }
    50% {
      opacity: 0.8;
      box-shadow: 0 0 15px rgba(255, 77, 121, 0.7);
    }
  }
  
  @keyframes widthPulse {
    0%, 100% {
      width: 3px;
    }
    50% {
      width: 4px;
    }
  }
  
  @keyframes particleFlow {
    0% {
      top: -10px;
      opacity: 0;
    }
    10% {
      opacity: 0.8;
    }
    90% {
      opacity: 0.8;
    }
    100% {
      top: 100%;
      opacity: 0;
    }
  }
`,h=i.Ay.div`
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
`,c=i.Ay.div`
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
`,f=()=>{const t=(0,o.useRef)(null),{x:a,y:e}=n(t),[i,f]=(0,o.useState)(0),[m,x]=(0,o.useState)(0),y=(0,o.useMemo)((()=>{const t=window.innerWidth>768;return Array.from({length:t?50:25}).map((()=>({top:100*Math.random(),left:100*Math.random(),opacity:.5*Math.random()+.5,duration:5*Math.random()+5,delay:5*Math.random()})))}),[]),u=(0,o.useMemo)((()=>{const t=window.innerWidth>768;return Array.from({length:t?10:5}).map((()=>({size:5*Math.random()+2,maxSize:100*Math.random()+50,top:100*Math.random(),left:100*Math.random(),color:`rgba(${Math.floor(255*Math.random())}, ${Math.floor(255*Math.random())}, ${Math.floor(255*Math.random())}, 0.5)`,opacity:.5*Math.random()+.5,factor:2*Math.random()+1,glow:Math.random()>.5,delay:5*Math.random()})))}),[]);(0,o.useMemo)((()=>{let t="";for(let a=0;a<500;a++)t+=Math.random()>.5?"1":"0",a%8===7&&(t+=" "),a%40===39&&(t+="\n");return t}),[]);return(0,r.jsxs)("div",{ref:t,onMouseMove:t=>{const{clientX:a,clientY:e,currentTarget:o}=t,i=o.getBoundingClientRect();f((a-i.left)/i.width-.5),x((e-i.top)/i.height-.5)},children:[(0,r.jsx)(c,{}),(0,r.jsxs)(s,{children:[(0,r.jsxs)(h,{children:[(0,r.jsx)("div",{className:"shape small",style:{transform:`translate(${10*i}px, ${10*m}px)`}}),(0,r.jsx)("div",{className:"shape large",style:{transform:`translate(${-15*i}px, ${-15*m}px)`}}),(0,r.jsx)("div",{className:"shape hexagon",style:{transform:`translate(${5*i}px, ${5*m}px)`}})]}),(0,r.jsx)(p,{}),(0,r.jsx)(p,{}),(0,r.jsx)(p,{}),y.map(((t,a)=>(0,r.jsx)(d,{top:t.top+5*m,left:t.left+5*i,opacity:t.opacity,duration:t.duration,delay:t.delay,animate:!0},`star-${a}`))),u.map(((t,o)=>(0,r.jsx)(l,{size:t.size,maxSize:t.maxSize,top:t.top,left:t.left,color:t.color,opacity:t.opacity,x:a*t.factor*-1+10*i,y:e*t.factor*-1+10*m,glow:t.glow,delay:t.delay,animate:!0},o)))]})]})}}}]);
//# sourceMappingURL=441.d26fddfc.chunk.js.map