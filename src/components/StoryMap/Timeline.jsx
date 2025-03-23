import React, { useMemo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const PathSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  will-change: transform; /* Performance optimization */

  @media (max-width: 768px) {
    display: none;
  }
`;

const TimelineContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const MobileTimeline = styled.div`
  display: none;
  position: absolute;
  left: 50%;
  top: 0;
  height: 100%;
  width: 4px;
  background: linear-gradient(to bottom, #304878, #ff4d79);
  transform: translateX(-50%);

  @media (max-width: 768px) {
    display: block;
    width: 3px;
  }
  
  @media (max-width: 480px) {
    width: 2px;
  }
`;

const TimelineDot = styled.div`
  display: none;
  position: absolute;
  left: 50%;
  width: 14px; /* Increased size */
  height: 14px;
  top: ${props => props.top || 0}px;
  background-color: ${props => props.active ? '#ff4d79' : '#304878'};
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 10;
  transition: all 0.3s ease-in-out;
  box-shadow: ${props => props.active ? '0 0 15px #ff4d79' : 'none'};

  &:after {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-radius: 50%;
    border: 1px solid ${props => props.active ? '#ff4d79' : 'transparent'};
    animation: ${props => props.active ? 'pulse 2s infinite' : 'none'};
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    display: block;
    width: 14px;
    height: 14px;
  }
  
  @media (max-width: 480px) {
    width: 12px;
    height: 12px;
  }
`;

const DecorativeShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;

  .shape {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff4d79, #304878);
    opacity: 0.2;
    animation: float 8s infinite ease-in-out;
    will-change: transform; /* Performance optimization */
  }

  .shape.circle {
    width: 150px;
    height: 150px;
    top: 20%;
    left: 10%;
  }

  .shape.triangle {
    width: 0;
    height: 0;
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;
    border-bottom: 100px solid #ff4d79;
    top: 50%;
    left: 80%;
    transform: translate(-50%, -50%);
    opacity: 0.15;
    animation: float 10s infinite ease-in-out;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`;

// Progress indicator that follows the path
const ProgressIndicator = styled.div`
  position: absolute;
  width: 100%;
  height: 8px;
  background: #0c0e1a;
  left: 0;
  bottom: 0;
  z-index: 20;
  overflow: hidden;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
  
  &:after {
    content: '';
    position: absolute;
    height: 100%;
    background: linear-gradient(to right, #304878, #ff4d79);
    left: 0;
    top: 0;
    width: ${props => props.progress || 0}%;
    transition: width 0.5s ease-out;
  }
`;

const Timeline = ({ checkpointPositions = {}, activeCheckpoint, scrollProgress = 0 }) => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  
  // Sort checkpoints by ID to ensure correct order
  const sortedCheckpoints = useMemo(() => {
    return Object.entries(checkpointPositions)
      .sort(([idA], [idB]) => parseInt(idA) - parseInt(idB))
      .map(([id, position]) => ({ id: parseInt(id), position }));
  }, [checkpointPositions]);

  // Calculate path string using a more React-friendly approach
  const pathData = useMemo(() => {
    if (sortedCheckpoints.length < 2) return '';

    let pathString = '';
    sortedCheckpoints.forEach((checkpoint, index) => {
      const { position } = checkpoint;
      if (!position) return;

      const x = position.x + 110; // Checkpoint width / 2
      const y = position.y + 75;  // Approximate checkpoint height / 2

      if (index === 0) {
        pathString = `M ${x} ${y}`;
      } else {
        const prevCheckpoint = sortedCheckpoints[index - 1];
        const prevX = prevCheckpoint.position.x + 110;
        const prevY = prevCheckpoint.position.y + 75;

        // Calculate control points for smooth curve
        const controlY = (y + prevY) / 2;

        pathString += ` C ${prevX},${controlY} ${x},${controlY} ${x},${y}`;
      }
    });

    return pathString;
  }, [sortedCheckpoints]);

  // Update path animation when activeCheckpoint changes
  useEffect(() => {
    if (!pathRef.current || !dotRef.current) return;
    
    // Get index of active checkpoint
    const activeIndex = sortedCheckpoints.findIndex(cp => parseInt(cp.id) === activeCheckpoint);
    if (activeIndex === -1) return;
    
    // Calculate progress percentage along the path
    const progress = activeIndex / (sortedCheckpoints.length - 1);
    
    // Animate dot to the active checkpoint position
    if (dotRef.current) {
      gsap.to(dotRef.current, {
        strokeDashoffset: pathRef.current.getTotalLength() * (1 - progress),
        duration: 0.8,
        ease: "power2.inOut"
      });
    }
    
    // Highlight the active checkpoint
    const checkpointElements = svgRef.current.querySelectorAll('.checkpoint-dot');
    checkpointElements.forEach((dot, index) => {
      const isActive = index === activeIndex;
      gsap.to(dot, {
        r: isActive ? 8 : 5,
        fill: isActive ? '#ff4d79' : '#304878',
        filter: isActive ? 'url(#glow)' : 'none',
        duration: 0.3
      });
    });
  }, [activeCheckpoint, sortedCheckpoints]);

  // Initialize path animation on first render
  useEffect(() => {
    if (!pathRef.current) return;
    
    // Set initial dash array and offset for path animation
    const pathLength = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = pathLength;
    pathRef.current.style.strokeDashoffset = pathLength;
    
    // Animate path drawing
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut"
    });
  }, [pathData]);

  // Calculate checkpoint positions for SVG
  const checkpointPositionsForSvg = useMemo(() => {
    return sortedCheckpoints.map(checkpoint => {
      const { position, id } = checkpoint;
      if (!position) return null;

      return {
        x: position.x + 110,
        y: position.y + 75,
        id: parseInt(id)
      };
    }).filter(Boolean);
  }, [sortedCheckpoints]);

  // Calculate progress percentage for mobile view
  const progressPercentage = useMemo(() => {
    if (sortedCheckpoints.length <= 1) return 0;
    const activeIndex = sortedCheckpoints.findIndex(cp => parseInt(cp.id) === activeCheckpoint);
    return activeIndex === -1 ? 0 : (activeIndex / (sortedCheckpoints.length - 1)) * 100;
  }, [activeCheckpoint, sortedCheckpoints]);

  return (
    <TimelineContainer>
      {/* Add decorative shapes */}
      <DecorativeShapes>
        <div className="shape circle"></div>
        <div className="shape triangle"></div>
      </DecorativeShapes>

      <PathSvg xmlns="http://www.w3.org/2000/svg" ref={svgRef}>
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#304878" />
            <stop offset="100%" stopColor="#ff4d79" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Main path */}
        {pathData && (
          <path
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
          />
        )}

        {/* Progress indicator */}
        {pathData && (
          <path
            ref={dotRef}
            d={pathData}
            fill="none" 
            stroke="#ff4d79"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#glow)"
            opacity="0.7"
          />
        )}

        {/* Animated dot */}
        {pathData && (
          <circle r="8" fill="#ff4d79" filter="url(#glow)">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              path={pathData}
              rotate="auto"
            />
          </circle>
        )}

        {/* Checkpoint dots */}
        {checkpointPositionsForSvg.map((point, index) => (
          <circle
            key={point.id}
            className="checkpoint-dot"
            cx={point.x}
            cy={point.y}
            r={point.id === activeCheckpoint ? 8 : 5}
            fill={point.id === activeCheckpoint ? '#ff4d79' : '#304878'}
            filter={point.id === activeCheckpoint ? 'url(#glow)' : ''}
          >
            {/* Pulse animation for active checkpoint */}
            {point.id === activeCheckpoint && (
              <animate
                attributeName="r"
                values="8;12;8"
                dur="2s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}
      </PathSvg>

      {/* Mobile timeline */}
      <MobileTimeline />

      {/* Mobile progress indicator */}
      <ProgressIndicator progress={progressPercentage} />

      {/* Mobile timeline dots */}
      {Object.entries(checkpointPositions).map(([id, position]) => (
        <TimelineDot
          key={id}
          top={(position?.y || 0) + 75}
          active={parseInt(id) === activeCheckpoint}
        />
      ))}
    </TimelineContainer>
  );
};

export default React.memo(Timeline);