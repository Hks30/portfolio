// src/components/StoryMap/Timeline.jsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const PathSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 4;
  
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

// Mobile timeline that appears when the desktop SVG path is hidden
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

// Dots for mobile timeline
const TimelineDot = styled.div`
  display: none;
  position: absolute;
  left: 50%;
  width: 12px;
  height: 12px;
  top: ${props => props.top}px;
  background-color: ${props => props.active ? '#ff4d79' : '#304878'};
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 5;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Timeline = ({ checkpointPositions, activeCheckpoint }) => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!svgRef.current || Object.keys(checkpointPositions).length === 0) return;
    
    const svg = svgRef.current;
    
    // Clear any existing paths
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    // Create defs for gradient
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    linearGradient.setAttribute('id', 'pathGradient');
    linearGradient.setAttribute('x1', '0%');
    linearGradient.setAttribute('y1', '0%');
    linearGradient.setAttribute('x2', '0%');
    linearGradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#304878');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#ff4d79');
    
    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);
    defs.appendChild(linearGradient);
    svg.appendChild(defs);
    
    // Sort checkpoints by ID to ensure correct order
    const sortedCheckpoints = Object.entries(checkpointPositions)
      .sort(([idA], [idB]) => parseInt(idA) - parseInt(idB))
      .map(([id, position]) => ({ id: parseInt(id), position }));
    
    if (sortedCheckpoints.length < 2) return;
    
    // Create the path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Calculate path string
    let pathString = '';
    sortedCheckpoints.forEach((checkpoint, index) => {
      const { position } = checkpoint;
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
    
    path.setAttribute('d', pathString);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'url(#pathGradient)');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-dasharray', '10,5');
    
    svg.appendChild(path);
    
    // Add animated dot
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', '6');
    circle.setAttribute('fill', '#ff4d79');
    
    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
    animate.setAttribute('dur', '10s');
    animate.setAttribute('repeatCount', 'indefinite');
    animate.setAttribute('path', pathString);
    
    circle.appendChild(animate);
    svg.appendChild(circle);
    
  }, [checkpointPositions]);
  
  return (
    <TimelineContainer>
      <PathSvg ref={svgRef} xmlns="http://www.w3.org/2000/svg" />
      
      {/* Mobile timeline */}
      <MobileTimeline />
      
      {/* Mobile timeline dots */}
      {Object.entries(checkpointPositions).map(([id, position]) => (
        <TimelineDot 
          key={id} 
          top={position.y + 75}
          active={parseInt(id) === activeCheckpoint} 
        />
      ))}
    </TimelineContainer>
  );
};

export default Timeline;