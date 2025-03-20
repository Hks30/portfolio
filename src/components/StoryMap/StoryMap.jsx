// src/components/StoryMap/StoryMap.jsx
import React, { useState, useEffect } from 'react';
import Timeline from './Timeline';
import Checkpoint from './Checkpoint';
import ParallaxLayer from './ParallaxLayer';
import NavigationDots from '../UI/NavigationDots';
import styled from 'styled-components';
import { scroller } from 'react-scroll';
import ContactSection from '../Contact/ContactSection';
import { journeyData } from '../../data/journey';


const StoryMapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background: #0c0e1a;
  color: white;
  scroll-behavior: smooth;
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #0c0e1a, #0c0e1a);
    z-index: -1;
  }
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
  position: relative;
  top: 20px;
  text-align: center;
  color: #ff4d79;
  font-size: 3rem;
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

const StoryMap = () => {
  const [activeCheckpoint, setActiveCheckpoint] = useState(1);
  const [checkpointPositions, setCheckpointPositions] = useState({});
  
  useEffect(() => {
    const calculatePositions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const containerWidth = Math.min(width, 1200) - 40; // Account for padding

      const positions = {};
      const centerX = containerWidth / 2 - 110; // Half of checkpoint width

      // Education checkpoint
      positions[journeyData.education.id] = {
        x: centerX,
        y: 120,
      };

      // Project checkpoints - alternating left and right
      const verticalSpacing = Math.max(300, height * 0.3);

      journeyData.projects.forEach((project, index) => {
        const isEven = index % 2 === 0;
        const offsetX = width > 768 ? (isEven ? -200 : 200) : 0;

        positions[project.id] = {
          x: centerX + offsetX,
          y: 120 + verticalSpacing * (index + 1),
        };
      });

      setCheckpointPositions(positions);
    };
    
    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    
    return () => window.removeEventListener('resize', calculatePositions);
  }, []);

  const handleCheckpointInView = (id) => {
    setActiveCheckpoint(parseInt(id));
  };
  
  const handleDotClick = (id) => {
    setActiveCheckpoint(parseInt(id));
    scroller.scrollTo(`checkpoint-${id}`, {
      duration: 800,
      smooth: true,
      offset: -50
    });
  };

  // Calculate total document height based on last checkpoint position
  const getDocumentHeight = () => {
    if (Object.keys(checkpointPositions).length === 0) return '200vh';
    
    const positions = Object.values(checkpointPositions);
    if (positions.length === 0) return '200vh';
    
    const lastY = Math.max(...positions.map(pos => pos.y));
    return `${lastY + 400}px`;
  };

  return (
    <StoryMapContainer>
      <ParallaxLayer />
      
      <ContentWrapper>
        <Title>Himanshi's Developer Journey</Title>
        
        <CheckpointsContainer style={{ height: getDocumentHeight() }}>
          {/* Timeline component with both checkpointPositions and activeCheckpoint */}
          <Timeline 
            checkpointPositions={checkpointPositions} 
            activeCheckpoint={activeCheckpoint}
          />
          
          {Object.keys(checkpointPositions).length > 0 && (
            <>
              <Checkpoint 
                data={{
                  ...journeyData.education, 
                  position: checkpointPositions[journeyData.education.id]
                }}
                isActive={activeCheckpoint === journeyData.education.id}
                onInView={handleCheckpointInView}
              />
              
              {journeyData.projects.map((project) => (
                <Checkpoint 
                  key={project.id}
                  data={{
                    ...project, 
                    position: checkpointPositions[project.id]
                  }}
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
      <ContactSection />
    </StoryMapContainer>
  );
};

export default StoryMap;