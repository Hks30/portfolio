import React, { useMemo } from 'react';
import styled from 'styled-components';

const PathSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;

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
  }
`;

const TimelineDot = styled.div`
  display: none;
  position: absolute;
  left: 50%;
  width: 12px;
  height: 12px;
  top: ${props => props.top || 0}px;
  background-color: ${props => props.active ? '#ff4d79' : '#304878'};
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 10;
  transition: all 0.3s ease-in-out;
  box-shadow: ${props => props.active ? '0 0 10px #ff4d79' : 'none'};

  &:after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
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
      transform: scale(1.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
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

const Timeline = ({ checkpointPositions = {}, activeCheckpoint }) => {
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

  return (
    <TimelineContainer>
      {/* Add decorative shapes */}
      <DecorativeShapes>
        <div className="shape circle"></div>
        <div className="shape triangle"></div>
      </DecorativeShapes>

      <PathSvg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#304878" />
            <stop offset="100%" stopColor="#ff4d79" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Main path */}
        {pathData && (
          <path
            d={pathData}
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="1000"
              to="0"
              dur="2s"
              fill="freeze"
            />
          </path>
        )}

        {/* Animated dot */}
        {pathData && (
          <circle r="6" fill="#ff4d79" filter="url(#glow)">
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              path={pathData}
            />
          </circle>
        )}

        {/* Checkpoint dots */}
        {checkpointPositionsForSvg.map((point) => (
          <circle
            key={point.id}
            cx={point.x}
            cy={point.y}
            r="5"
            fill={point.id === activeCheckpoint ? '#ff4d79' : '#304878'}
            filter={point.id === activeCheckpoint ? 'url(#glow)' : ''}
          />
        ))}
      </PathSvg>

      {/* Mobile timeline */}
      <MobileTimeline />

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