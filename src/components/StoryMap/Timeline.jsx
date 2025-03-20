// src/components/StoryMap/Timeline.jsx
import React from 'react';
import styled from 'styled-components';

const TimelineContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Path = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  path {
    stroke: #ff4d79;
    stroke-width: 3;
    stroke-dasharray: 5, 5;
    fill: none;
    animation: dash 30s linear infinite;
  }
  
  @keyframes dash {
    to {
      stroke-dashoffset: 1000;
    }
  }
`;

const Timeline = ({ checkpointPositions }) => {
  // Create a path that connects all checkpoints
  const createPath = () => {
    if (!checkpointPositions || Object.keys(checkpointPositions).length === 0) {
      return '';
    }
    
    const ids = Object.keys(checkpointPositions).sort((a, b) => Number(a) - Number(b));
    
    let path = `M${checkpointPositions[ids[0]].x + 110},${checkpointPositions[ids[0]].y + 30}`;
    
    for (let i = 1; i < ids.length; i++) {
      const id = ids[i];
      path += ` L${checkpointPositions[id].x + 110},${checkpointPositions[id].y + 30}`;
    }
    
    return path;
  };

  return (
    <TimelineContainer>
      <Path>
        <path d={createPath()} />
      </Path>
    </TimelineContainer>
  );
};

export default Timeline;