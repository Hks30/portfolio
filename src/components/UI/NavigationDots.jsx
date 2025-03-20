import React from 'react';
import styled from 'styled-components';
import { scroller } from 'react-scroll';

const DotsContainer = styled.div`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 100;
  
  @media (max-width: 768px) {
    right: 15px;
  }
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#ff4d79' : '#304878'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
    background-color: ${props => props.active ? '#ff4d79' : '#5371b4'};
  }
`;

const NavigationDots = ({ total, active, onDotClick }) => {
  const handleDotClick = (index) => {
    // Use the prop if provided, otherwise use local function
    if (onDotClick) {
      onDotClick(index);
    } else {
      scroller.scrollTo(`checkpoint-${index}`, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50 // Add offset to account for any headers
      });
    }
  };

  return (
    <DotsContainer>
      {Array.from({ length: total }).map((_, index) => (
        <Dot
          key={index}
          active={active === index + 1}
          onClick={() => handleDotClick(index + 1)}
          aria-label={`Navigate to checkpoint ${index + 1}`}
          role="button"
        />
      ))}
    </DotsContainer>
  );
};

export default NavigationDots;