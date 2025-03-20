// src/components/StoryMap/StoryMap.jsx
import React, { useState, useEffect } from 'react';
import Timeline from './Timeline';
import Checkpoint from './Checkpoint';
import ParallaxLayer from './ParallaxLayer';
import NavigationDots from '../UI/NavigationDots';
import { journeyData } from '../../data/journey';
import styled from 'styled-components';
import { scroller } from 'react-scroll';

const StoryMapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background: #0c0e1a;
  color: white;
  scroll-behavior: smooth;
`;

const ContentWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 60px 10px;
  }
`;

const Title = styled.h1`
  position: sticky;
  top: 20px;
  text-align: center;
  color: #ff4d79;
  font-size: 2rem;
  z-index: 20;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CheckpointsContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 80px;
`;

const ScrollPrompt = styled.div`
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  opacity: 0.7;
  z-index: 20;
`;

const StoryMap = () => {
  const [activeCheckpoint, setActiveCheckpoint] = useState(1);
  const [checkpointPositions, setCheckpointPositions] = useState({});
  
  // Calculate responsive positions for checkpoints based on screen size
  useEffect(() => {
    const calculatePositions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const containerWidth = Math.min(width, 1200) - 40; // Account for padding
      
      const positions = {};
      const centerX = containerWidth / 2 - 110; // Half of checkpoint width
      
      // Education checkpoint (start)
      positions[journeyData.education.id] = {
        x: centerX,
        y: 120
      };
      
      // Project checkpoints - create a zigzag pattern
      const projectsCount = journeyData.projects.length;
      const verticalSpacing = Math.max(300, height * 0.4);
      
      journeyData.projects.forEach((project, index) => {
        const isEven = index % 2 === 0;
        const offsetX = width > 768 ? (isEven ? -200 : 200) : 0;
        
        positions[project.id] = {
          x: centerX + offsetX,
          y: 120 + verticalSpacing * (index + 1)
        };
      });
      
      setCheckpointPositions(positions);
    };
    
    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    
    return () => window.removeEventListener('resize', calculatePositions);
  }, []);

  const handleCheckpointInView = (id) => {
    setActiveCheckpoint(id);
  };
  
  const handleDotClick = (id) => {
    scroller.scrollTo(`checkpoint-${id}`, {
      duration: 800,
      smooth: true,
      offset: -50
    });
  };

  return (
    <StoryMapContainer>
      <ParallaxLayer />
      
      <ContentWrapper>
        <Title>Himanshi's Developer Journey</Title>
        
        <CheckpointsContainer>
          <Timeline checkpointPositions={checkpointPositions} />
          
          {Object.keys(checkpointPositions).length > 0 && (
            <>
              <Checkpoint 
                data={{...journeyData.education, position: checkpointPositions[journeyData.education.id]}}
                isActive={activeCheckpoint === journeyData.education.id}
                onInView={handleCheckpointInView}
              />
              
              {journeyData.projects.map(project => (
                <Checkpoint 
                  key={project.id}
                  data={{...project, position: checkpointPositions[project.id]}}
                  isActive={activeCheckpoint === project.id}
                  onInView={handleCheckpointInView}
                />
              ))}
            </>
          )}
        </CheckpointsContainer>
      </ContentWrapper>
      
      <NavigationDots 
        total={journeyData.projects.length + 1}
        active={activeCheckpoint}
        onDotClick={handleDotClick}
      />
      
      <ScrollPrompt>Scroll to explore or click a checkpoint for details</ScrollPrompt>
    </StoryMapContainer>
  );
};

export default StoryMap;