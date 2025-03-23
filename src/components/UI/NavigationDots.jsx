import React from 'react';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable'; // You'll need to install this package

const DotsContainer = styled.div`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 50;
  
  @media (max-width: 768px) {
    right: 15px;
    gap: 20px; /* Increased gap for better touch targets */
  }
  
  @media (max-width: 480px) {
    right: 10px;
  }
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#ff4d79' : '#304878'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  @media (max-width: 768px) {
    width: 16px; /* Larger dots on mobile */
    height: 16px;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    border: 1px solid ${props => props.active ? '#ff4d79' : 'transparent'};
    transition: all 0.3s ease;
    opacity: ${props => props.active ? 1 : 0};
    animation: ${props => props.active ? 'pulse 2s infinite' : 'none'};
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  &:hover {
    transform: scale(1.2);
    background: #ff4d79;
    box-shadow: 0 0 10px rgba(255, 77, 121, 0.5);
  }
  
  /* Larger touch area for mobile */
  &:before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    
    @media (max-width: 768px) {
      top: -20px;
      left: -20px;
      right: -20px;
      bottom: -20px;
    }
  }
`;

const DotLabel = styled.span`
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  white-space: nowrap;
  background: rgba(20, 23, 37, 0.85);
  padding: 3px 8px;
  border-radius: 4px;
  
  ${Dot}:hover & {
    opacity: 1;
  }
`;

const SwipeIndicator = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  text-align: center;
  opacity: 0.8;
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  svg {
    width: 24px;
    height: 24px;
    animation: swipeAnim 2s infinite ease-in-out;
  }
  
  @keyframes swipeAnim {
    0% {
      transform: translateX(-5px);
      opacity: 0.5;
    }
    50% {
      transform: translateX(5px);
      opacity: 1;
    }
    100% {
      transform: translateX(-5px);
      opacity: 0.5;
    }
  }
`;

const NavigationDots = ({ total, active, onDotClick, labels = [], onSwipe }) => {
  // Handle swipe gestures
  const handlers = useSwipeable({
    onSwipedUp: () => onSwipe && active < total && onSwipe(active + 1),
    onSwipedDown: () => onSwipe && active > 1 && onSwipe(active - 1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });
  
  const dots = Array.from({ length: total }, (_, i) => i + 1);
  
  return (
    <>
      <div {...handlers}>
        <DotsContainer>
          {dots.map(id => (
            <Dot 
              key={id} 
              active={active === id}
              onClick={() => onDotClick(id)}
            >
              <DotLabel>{labels[id - 1] || `Checkpoint ${id}`}</DotLabel>
            </Dot>
          ))}
        </DotsContainer>
      </div>
      
      <SwipeIndicator>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 13L12 18L17 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 7L12 12L17 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Swipe to navigate
      </SwipeIndicator>
    </>
  );
};

export default React.memo(NavigationDots);