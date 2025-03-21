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
  transition: transform 0.1s ease-out;
`;

const ParallaxLayer = () => {
  const ref = useRef(null);
  const { x, y } = useParallax(ref);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive circles - size based on viewport width
  const circles = [
    { size: 8, maxSize: 100, top: 20, left: 10, color: '#304878', opacity: 0.1, factor: 0.02 },
    { size: 12, maxSize: 150, top: 70, left: 80, color: '#304878', opacity: 0.15, factor: 0.03 },
    { size: 5, maxSize: 60, top: 30, left: 60, color: '#304878', opacity: 0.1, factor: 0.015 },
    { size: 6, maxSize: 80, top: 80, left: 30, color: '#304878', opacity: 0.1, factor: 0.025 },
    { size: 10, maxSize: 120, top: 50, left: 90, color: '#304878', opacity: 0.12, factor: 0.02 },
  ];

  return (
    <Layer ref={ref}>
      {circles.map((circle, index) => (
        <Circle
          key={index}
          size={circle.size}
          maxSize={circle.maxSize}
          top={circle.top}
          left={circle.left}
          color={circle.color}
          opacity={circle.opacity}
          x={x * circle.factor * -1}
          y={y * circle.factor * -1}
        />
      ))}
    </Layer>
  );
};

export default ParallaxLayer;