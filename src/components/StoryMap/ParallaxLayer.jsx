import React, { useRef, useEffect, useState } from 'react';
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
`;

const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  background-color: ${props => props.color || '#304878'};
  opacity: ${props => props.opacity || 0.15};
  width: ${props => `${props.size}vw`};
  height: ${props => `${props.size}vw`};
  max-width: ${props => `${props.maxSize}px`};
  max-height: ${props => `${props.maxSize}px`};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  transform: translate(${props => props.x}px, ${props => props.y}px);
  transition: transform 0.2s ease-out;
  box-shadow: 0 0 ${props => props.glow ? '15px' : '0'} ${props => props.glow ? props.color : 'transparent'};
  animation: pulse 8s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
  
  @keyframes pulse {
    0% {
      transform: translate(${props => props.x}px, ${props => props.y}px) scale(1);
      opacity: ${props => props.opacity || 0.15};
    }
    50% {
      transform: translate(${props => props.x}px, ${props => props.y}px) scale(1.1);
      opacity: ${props => (props.opacity || 0.15) + 0.05};
    }
    100% {
      transform: translate(${props => props.x}px, ${props => props.y}px) scale(1);
      opacity: ${props => props.opacity || 0.15};
    }
  }
`;

const Star = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: white;
  opacity: ${props => props.opacity};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  border-radius: 50%;
  box-shadow: 0 0 3px white;
  animation: twinkle ${props => props.duration}s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
  
  @keyframes twinkle {
    0% { opacity: ${props => props.opacity}; }
    50% { opacity: 0.1; }
    100% { opacity: ${props => props.opacity}; }
  }
`;

const GradientPipeline = styled.div`
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
`;

const FloatingShapes = styled.div`
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
`;

const BackgroundGlow = styled.div`
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
`;

const ParallaxLayer = ({ stars = [], circles = [] }) => {
  const ref = useRef(null);
  const { x, y } = useParallax(ref);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    setMouseX((clientX - rect.left) / rect.width - 0.5);
    setMouseY((clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove}>
      <BackgroundGlow />
      <Layer>
        <FloatingShapes>
          <div
            className="shape small"
            style={{
              transform: `translate(${mouseX * 10}px, ${mouseY * 10}px)`,
            }}
          ></div>
          <div
            className="shape large"
            style={{
              transform: `translate(${mouseX * -15}px, ${mouseY * -15}px)`,
            }}
          ></div>
          <div
            className="shape hexagon"
            style={{
              transform: `translate(${mouseX * 5}px, ${mouseY * 5}px)`,
            }}
          ></div>
        </FloatingShapes>

        <GradientPipeline />
        <GradientPipeline />
        <GradientPipeline />

        {stars.map((star, index) => (
          <Star
            key={`star-${index}`}
            top={star.top + mouseY * 5}
            left={star.left + mouseX * 5}
            opacity={star.opacity}
            duration={star.duration}
            delay={star.delay}
            animate={true}
          />
        ))}

        {circles.map((circle, index) => (
          <Circle
            key={index}
            size={circle.size}
            maxSize={circle.maxSize}
            top={circle.top}
            left={circle.left}
            color={circle.color}
            opacity={circle.opacity}
            x={x * circle.factor * -1 + mouseX * 10}
            y={y * circle.factor * -1 + mouseY * 10}
            glow={circle.glow}
            delay={circle.delay}
            animate={true}
          />
        ))}
      </Layer>
    </div>
  );
};

ParallaxLayer.defaultProps = {
  stars: [],
  circles: [],
};

const ParentComponent = () => {
  const stars = Array.from({ length: 50 }).map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 5,
  }));

  const circles = Array.from({ length: 10 }).map(() => ({
    size: Math.random() * 5 + 2,
    maxSize: Math.random() * 100 + 50,
    top: Math.random() * 100,
    left: Math.random() * 100,
    color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.5)`,
    opacity: Math.random() * 0.5 + 0.5,
    factor: Math.random() * 2 + 1,
    glow: Math.random() > 0.5,
    delay: Math.random() * 5,
  }));

  return <ParallaxLayer stars={stars} circles={circles} />;
};

export default ParallaxLayer;