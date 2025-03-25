import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import { scroller } from 'react-scroll';
import styled from 'styled-components';
import { journeyData } from '../../data/journey';
import { ErrorBoundary } from 'react-error-boundary'; // You'll need to install this package
import { debounce } from 'lodash'; // Ensure lodash is installed
// Core component that should be loaded immediately
import Timeline from './Timeline';
// Lazy load components that aren't needed for initial render
const ParallaxLayer = lazy(() => import('./ParallaxLayer'));
const ContactSection = lazy(() => import('../Contact/ContactSection'));
const NavigationDots = lazy(() => import('../UI/NavigationDots'));
const Checkpoint = lazy(() => import('./Checkpoint'));
// Error fallback component
const ErrorFallback = styled.div`
  padding: 20px;
  background: rgba(255, 77, 121, 0.1);
  border: 1px solid #ff4d79;
  border-radius: 8px;
  margin: 20px 0;
  color: white;
  text-align: center;
  h3 {
    color: #ff4d79;
    margin-bottom: 10px;
  }
  button {
    background: #304878;
    border: none;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    transition: background 0.3s;
    &:hover {
      background: #ff4d79;
    }
  }
`;
const ErrorFallbackComponent = ({ error, resetErrorBoundary }) => (
  <ErrorFallback>
    <h3>Something went wrong</h3>
    <p>{error.message || 'An unexpected error occurred'}</p>
    <button onClick={resetErrorBoundary}>Try again</button>
  </ErrorFallback>
);
// Enhanced Loading placeholder with animation
const LoadingPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.initial ? '100vh' : '50px'};
  color: #ff4d79;
  font-size: ${props => props.initial ? '1.5rem' : '1rem'};
  animation: ${props => props.initial ? 'pulse 1.5s infinite ease-in-out' : 'fadeIn 0.5s ease-out'};
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
  
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;
// Initial Loading Screen for professional journey
const InitialLoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #0c0e1a;
  z-index: 100;
  transition: opacity 0.8s ease-out, visibility 0.8s ease-out;
  opacity: ${props => (props.isLoading ? 1 : 0)};
  visibility: ${props => (props.isLoading ? 'visible' : 'hidden')};
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const LoadingLogo = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 30px;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 3px;
    background: linear-gradient(to right, #304878, #ff4d79);
    position: absolute;
    bottom: -10px;
    left: 0;
    transform-origin: left;
    animation: loadBar 2.5s ease-in-out infinite;
  }
  
  @keyframes loadBar {
    0% { transform: scaleX(0); }
    50% { transform: scaleX(1); }
    100% { transform: scaleX(0); }
  }
    @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const LoadingText = styled.div`
  font-size: 1rem;
  color: #b8c4d9;
  text-align: center;
  max-width: 400px;
  margin-top: 20px;
  @media (max-width: 768px) {
    font-size: 0.9rem;
    }
    @media (max-width: 480px) {
    font-size: 0.8rem;
  }`;

// Main container for the story map
const StoryMapContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #0c0e1a;
  overflow: visible; 
  padding: 80px 20px 100px 20px; 
  
  @media (max-width: 768px) {
    padding: 60px 15px 120px 15px; 
  }
  @media (max-width: 480px) {
    padding: 20px 10px 150px 10px; 
  }
`;

const MapTitle = styled.h2`
  color: white;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  position: relative;
  z-index: 10;
  
  &:after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, #304878, #ff4d79);
    margin: 15px auto;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 14%;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 10%;
  }
`;

const MapContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  color:white;
  margin: 0 auto;
  min-height: 150px; 
  z-index: 10;
  @media (max-width: 768px) {
    min-height: auto;
  }
    @media (max-width: 480px) {
    width: 100%;
  }
`;

// The StoryMap component
const StoryMap = () => {
  // State for managing component lifecycle
  const [isLoading, setIsLoading] = useState(true);
  const [activeCheckpoint, setActiveCheckpoint] = useState(1);
  const [checkpointPositions, setCheckpointPositions] = useState({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mapHeight, setMapHeight] = useState(0);
  const [isParallaxEnabled, setIsParallaxEnabled] = useState(true);
  
  // Refs
  const mapRef = useRef(null);
  const checkpointRefs = useRef({});
  
  // Handle initial loading
  useEffect(() => {
    // Simulate loading process - in a real app, this might be data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate checkpoint positions and map height
  const calculatePositions = useCallback(() => {
    const isMobile = window.innerWidth <= 768;
    const positions = {};
    let maxHeight = 0;
    
    // Desktop positioning (absolute with x,y coordinates)
    if (!isMobile) {
      // Set positions for checkpoints based on the map
      journeyData.forEach((checkpoint, index) => {
        const id = checkpoint.id;
        
        // Create a zig-zag pattern
        const columnWidth = mapRef.current.clientWidth * 0.4;
        const startY = 150;
        const checkpointHeight = 250; // Approximate height of checkpoint
        
        let xPos, yPos;
        if (index % 2 === 0) {
          // Left side
          xPos = mapRef.current.clientWidth * 0.1;
        } else {
          // Right side
          xPos = mapRef.current.clientWidth * 0.5;
        }
        
        yPos = startY + (Math.floor(index / 2) * checkpointHeight * 1.5);
        positions[id] = { x: xPos, y: yPos };
        
        // Update max height
        if (yPos + checkpointHeight > maxHeight) {
          maxHeight = yPos + checkpointHeight;
        }
      });
    } else {
      // Mobile positioning (will be relative)
      journeyData.forEach((checkpoint, index) => {
        const id = checkpoint.id;
        const yPos = index * 450; // Increased spacing from 400 to 450
        positions[id] = { x: 0, y: yPos };
        
        // Update max height
        maxHeight = (index + 1) * 450;
      });
    }
    
    // Add even more extra space at the bottom
    if (isMobile) {
      maxHeight += 100; // Just a little extra for checkpoints, ContactSection will be outside
    } else {
      maxHeight += 200;
    }
    
    setCheckpointPositions(positions);
    setMapHeight(maxHeight);
  }, []);
  
  // Initialize and handle resize
  useEffect(() => {
    if (!isLoading) {
      calculatePositions();
      
      const handleResize = debounce(() => {
        calculatePositions();
        // Disable parallax on small screens for performance
        setIsParallaxEnabled(window.innerWidth > 768);
      }, 200);
      
      window.addEventListener('resize', handleResize);
      
      // Disable parallax on small screens for performance
      setIsParallaxEnabled(window.innerWidth > 768);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isLoading, calculatePositions]);
  
  // Handle scroll events
  useEffect(() => {
    if (isLoading) return;
    
    const handleScroll = debounce(() => {
      if (!mapRef.current) return;
      
      // Calculate scroll progress
      const scrollTop = window.pageYOffset;
      const mapTop = mapRef.current.offsetTop;
      const mapHeight = mapRef.current.offsetHeight;
      const progress = Math.min(Math.max((scrollTop - mapTop) / mapHeight, 0), 1);
      setScrollProgress(progress * 100);
      
      // Check which checkpoint is currently in view
      journeyData.forEach(checkpoint => {
        const id = checkpoint.id;
        const ref = checkpointRefs.current[id];
        
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom > 0;
          
          if (isVisible) {
            setActiveCheckpoint(id);
          }
        }
      });
    }, 50);
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);
  
  // Handle checkpoint in view
  const handleCheckpointInView = useCallback((id) => {
    setActiveCheckpoint(parseInt(id));
  }, []);
  
  // Navigate to a checkpoint
  const navigateToCheckpoint = useCallback((id) => {
    scroller.scrollTo(`checkpoint-${id}`, {
      duration: 800,
      smooth: 'easeInOutQuart',
      offset: -100
    });
  }, []);
  
  // Memoize data for optimization
  const checkpointData = useMemo(() => {
    return journeyData.map(checkpoint => {
      const isActive = activeCheckpoint === checkpoint.id;
      return { ...checkpoint, isActive };
    });
  }, [activeCheckpoint]);
  
  // Register checkpoint refs
  const registerCheckpointRef = useCallback((id, ref) => {
    if (ref) {
      checkpointRefs.current[id] = ref;
    }
  }, []);
  
  return (
    <>
      {/* Initial loading screen */}
      <InitialLoadingScreen isLoading={isLoading}>
        <LoadingLogo>My Journey</LoadingLogo>
        <LoadingText>
          Preparing to explore my professional journey through an interactive timeline experience...
        </LoadingText>
      </InitialLoadingScreen>
      
      <StoryMapContainer>
        <ErrorBoundary
          FallbackComponent={ErrorFallbackComponent}
          onReset={() => window.location.reload()}
        >
          {/* Background effects */}
          <Suspense fallback={<LoadingPlaceholder initial={false} />}>
            {isParallaxEnabled && <ParallaxLayer />}
          </Suspense>
          
          <MapTitle>My Professional Journey</MapTitle>
          
          <MapContent ref={mapRef} style={{ height: `${mapHeight}px` }}>
            {/* Timeline component */}
            <Timeline 
              checkpointPositions={checkpointPositions}
              activeCheckpoint={activeCheckpoint}
              scrollProgress={scrollProgress}
            />
            
            {/* Checkpoint components */}
            <Suspense fallback={<LoadingPlaceholder initial={false} />}>
              {checkpointData.map((checkpoint) => (
                <Checkpoint
                  key={checkpoint.id}
                  data={{
                    ...checkpoint,
                    position: checkpointPositions[checkpoint.id]
                  }}
                  isActive={checkpoint.isActive}
                  onInView={handleCheckpointInView}
                  ref={(ref) => registerCheckpointRef(checkpoint.id, ref)}
                />
              ))}
            </Suspense>
            
            {/* Navigation dots for quick jumping between sections */}
            <Suspense fallback={null}>
              <NavigationDots
                checkpoints={journeyData}
                activeCheckpoint={activeCheckpoint}
                onCheckpointClick={navigateToCheckpoint}
              />
            </Suspense>
          </MapContent>
          
          {/* Contact section OUTSIDE the MapContent */}
          <div style={{ position: 'relative', marginTop: '50px' }}>
            <Suspense fallback={<LoadingPlaceholder initial={false} />}>
              <ContactSection />
            </Suspense>
          </div>
        </ErrorBoundary>
      </StoryMapContainer>
    </>
  );
};

export default StoryMap;