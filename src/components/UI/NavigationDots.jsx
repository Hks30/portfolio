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
    gap: 10px;
  }
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#ff4d79' : '#304878'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: scale(1.2);
    background-color: ${props => props.active ? '#ff4d79' : '#5371b4'};
  }

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

const NavigationDots = ({ total, active, onDotClick }) => {
  const handleDotClick = (index) => {
    if (onDotClick) {
      onDotClick(index);
    } else {
      scroller.scrollTo(`checkpoint-${index}`, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50, // Add offset to account for any headers
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
          tabIndex={0} // Make dots keyboard-navigable
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleDotClick(index + 1);
            }
          }}
        />
      ))}
    </DotsContainer>
  );
};

export default NavigationDots;