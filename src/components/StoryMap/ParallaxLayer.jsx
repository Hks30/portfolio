import React, { useRef, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import useParallax from '../../hooks/useParallax';

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
`;

const CircuitLine = styled.div`
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
`;

const DataNode = styled.div`
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
`;

const TechGradientBackground = styled.div`
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
`;

const GridOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(0deg, transparent 24%, rgba(48, 72, 120, 0.05) 25%, rgba(48, 72, 120, 0.05) 26%, transparent 27%, transparent 74%, rgba(48, 72, 120, 0.05) 75%, rgba(48, 72, 120, 0.05) 76%, transparent 77%, transparent),
    linear-gradient(90deg, transparent 24%, rgba(48, 72, 120, 0.05) 25%, rgba(48, 72, 120, 0.05) 26%, transparent 27%, transparent 74%, rgba(48, 72, 120, 0.05) 75%, rgba(48, 72, 120, 0.05) 76%, transparent 77%, transparent);
  background-size: 50px 50px;
  opacity: 0.1;
  z-index: -1;
`;

const ParallaxLayer = () => {
  const ref = useRef(null);
  const { x, y } = useParallax(ref);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // Generate tech nodes
  const techNodes = useMemo(() => {
    const isDesktop = window.innerWidth > 768;
    return Array.from({ length: isDesktop ? 30 : 15 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  // Generate circuit lines
  const circuitLines = useMemo(() => {
    const isDesktop = window.innerWidth > 768;
    return Array.from({ length: isDesktop ? 10 : 5 }).map(() => ({
      top: Math.random() * 100,
      delay: Math.random() * 5,
    }));
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    setMouseX((clientX - rect.left) / rect.width - 0.5);
    setMouseY((clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <TechGradientBackground 
        style={{
          transform: `translate(${mouseX * 20}px, ${mouseY * 20}px)`,
        }}
      />
      <GridOverlay />
      <Layer>
        {/* Circuit Lines */}
        {circuitLines.map((line, index) => (
          <CircuitLine
            key={`circuit-${index}`}
            style={{
              top: `${line.top}%`,
              animationDelay: `${line.delay}s`,
            }}
          />
        ))}

        {/* Tech Nodes */}
        {techNodes.map((node, index) => (
          <DataNode
            key={`node-${index}`}
            style={{
              top: `${node.top}%`,
              left: `${node.left}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
              transform: `translate(${mouseX * 10}px, ${mouseY * 10}px)`,
              animationDelay: `${node.delay}s`,
            }}
          />
        ))}
      </Layer>
    </div>
  );
};

export default ParallaxLayer;