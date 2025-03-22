import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import Timeline from './Timeline';
import styled from 'styled-components';
import { scroller } from 'react-scroll';
import { journeyData } from '../../data/journey';

// Lazy load components that aren't needed for initial render
const ParallaxLayer = lazy(() => import('./ParallaxLayer'));
const ContactSection = lazy(() => import('../Contact/ContactSection'));
const NavigationDots = lazy(() => import('../UI/NavigationDots'));
const Checkpoint = lazy(() => import('./Checkpoint'));

// Enhanced Loading placeholder with animation
const LoadingPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  color: #ff4d79;
  font-size: ${props => props.initial ? '1.5rem' : '1rem'};
  animation: ${props => props.initial ? 'pulse 1.5s infinite ease-in-out' : 'none'};
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;
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
  background: radial-gradient(circle at center, #1a1a2e 0%, #0c0e1a 100%);
  z-index: 100;
  transition: opacity 0.8s ease-out, visibility 0.8s ease-out;
  opacity: ${props => (props.isLoading ? 1 : 0)};
  visibility: ${props => (props.isLoading ? 'visible' : 'hidden')};
`;


const LoadingTitle = styled.h1`
  color: #ff4d79;
  font-size: 3.2rem;
  margin-bottom: 35px;
  text-align: center;
  text-shadow: 0 0 15px rgba(255, 77, 121, 0.5);
  animation: glow 2s infinite alternate;
  font-weight: 700;
  letter-spacing: 1px;
  
  @keyframes glow {
    from {
      text-shadow: 0 0 5px rgba(255, 77, 121, 0.5);
    }
    to {
      text-shadow: 0 0 20px rgba(255, 77, 121, 0.8);
    }
  }
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const LoadingMessage = styled.div`
  color: #e0e0e0;
  font-size: 1.2rem;
  max-width: 600px;
  text-align: center;
  line-height: 1.6;
  margin: 0 auto 35px;
  min-height: 60px; /* Fixed height to prevent layout shift */
  display: flex;
  align-items: center;
  justify-content: center;
  
  p {
    opacity: 0;
    animation: fadeIn 0.6s ease-out forwards 0.5s;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 20px;
    min-height: 80px; /* Larger for mobile to accommodate more text */
  }
`;

const LoadingBarContainer = styled.div`
  width: 300px;
  padding: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 77, 121, 0.2);
  overflow: hidden;
  position: relative;
  margin-bottom: 30px; 
  
  @media (max-width: 768px) {
    width: 250px;
  }
`;
const LoadingBar = styled.div`
  height: 6px;
  background: linear-gradient(to right, #ff4d79, #ff8a8a);
  border-radius: 10px;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: loading-shine 1.5s infinite;
  }
  
  @keyframes loading-shine {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const LoadingPercentage = styled.div`
  color: #ff4d79;
  font-size: 1rem;
  font-weight: bold;
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
`;

const CodingIcons = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.1;
  
  .icon {
    position: absolute;
    font-family: monospace;
    color: #ff4d79;
    animation: float 8s infinite;
    opacity: 0.5;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }
`;

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
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;

const Title = styled.h1`
  position: relative;
  text-align: center;
  color: #ff4d79;
  font-size: 3rem;
  z-index: 20;
  margin-bottom: 30px;
  animation: fadeInDown 1s ease-out;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CheckpointsContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 80px;
  margin-top: 60px;
  animation: fadeIn 1.5s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeIn 1s ease-out;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    padding-bottom: 10px;
  }
`;

const AboutMeSection = styled.div`
  max-width: 800px;
  margin: 0 auto 30px;
  text-align: center;
  line-height: 1.6;
  color: #e0e0e0;
  font-size: 1.1rem;
  min-height: 10vh;
  animation: fadeInUp 1.2s ease-out;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 0 15px;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ContactSectionWrapper = styled.div`
  animation: fadeInUp 1.4s ease-out;
`;

const SectionDivider = styled.div`
  width: 50%;
  height: 3px;
  background: linear-gradient(to right, transparent, #ff4d79, transparent);
  margin: 30px auto;
  animation: expandWidth 1.5s ease-out;

  @keyframes expandWidth {
    from {
      width: 0;
    }
    to {
      width: 50%;
    }
  }
`;

const JourneyTitle = styled.h2`
  text-align: center;
  color: #ff4d79;
  font-size: 2.2rem;
  margin-bottom: 25px;
  opacity: 0.7; 
  animation: fadeOut 5s ease-in-out forwards; 

  @keyframes fadeOut {
    0%, 80% { 
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

// Memoized checkpoint component
const MemoizedCheckpoint = React.memo(Checkpoint);
const renderCodingIcons = () => {
  const symbols = ['<>', '</>', '{...}', '()', '=>', '&&', '||', 'async', '++', '===', '.map()', '.then()'];
  return symbols.map((symbol, index) => {
    const delay = Math.random() * 5;
    const duration = 5 + Math.random() * 5;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = 0.8 + Math.random() * 1;
    
    return (
      <div 
        key={index}
        className="icon"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          fontSize: `${size}rem`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`
        }}
      >
        {symbol}
      </div>
    );
  });
};

// Use localStorage instead of sessionStorage for persistence across sessions
// Create a global variable to track if the loading screen has been shown
const LOADING_SCREEN_KEY = 'hasSeenLoadingScreen';

const StoryMap = () => {
  // Check localStorage instead of sessionStorage, and use site-wide flag
  const [isInitialLoading, setIsInitialLoading] = useState(() => {
    // First check if we're in browser
    if (typeof window !== 'undefined') {
      // Check if the user has seen the loading screen before
      return localStorage.getItem(LOADING_SCREEN_KEY) !== 'true';
    }
    return true; // Default to showing loading screen on SSR
  });
  
  const [loadingMessage, setLoadingMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [activeCheckpoint, setActiveCheckpoint] = useState(1);
  const [checkpointPositions, setCheckpointPositions] = useState({});
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  
  const checkpointsRef = useRef([]);

  // Initial loading effect - runs only if isInitialLoading is true

    // Inside the useEffect for initial loading
    useEffect(() => {
      if (!isInitialLoading) {
        return; // Skip if we've already seen the loading screen
      }

      // Simulate loading progress
      const loadingMessages = [
        "Building virtual gateways to showcase my journey...",
        "Crafting pixels into beautiful experiences...",
        "Initializing responsive design algorithms...",
        "Compiling years of coding passion...",
        "Transforming lines of code into visual stories..."
      ];

      const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
      setLoadingMessage(randomMessage);

      // Simulate loading progress with increasingly smaller increments
      const interval = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress >= 95) {
            const increment = (100 - prevProgress) / 10;
            return prevProgress + increment;
          } else {
            const increment = Math.random() * 8;
            return prevProgress + increment > 95 ? 95 : prevProgress + increment;
          }
        });
      }, 200);

      // Set timer for completion after 3 seconds for better experience
      const timer = setTimeout(() => {
        clearInterval(interval);
        setProgress(100);

        // After progress reaches 100%, wait a bit then hide loader
        setTimeout(() => {
          setIsInitialLoading(false);

          // Store in localStorage that user has seen loading screen
          if (typeof window !== 'undefined') {
            localStorage.setItem(LOADING_SCREEN_KEY, 'true');
          }
        }, 600); // Smooth transition out
      }, 3000); // Ensure it lasts exactly 3 seconds

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }, [isInitialLoading]);

  // Memoized function to calculate positions
  const calculatePositions = useCallback(() => {
    const { width, height } = windowSize;
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

    return positions;
  }, [windowSize]);

  // Handle resize with debounce
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Update positions when window size changes
  useEffect(() => {
    setCheckpointPositions(calculatePositions());
  }, [calculatePositions]);
  
  const handleCheckpointInView = useCallback((id) => {
    setActiveCheckpoint(parseInt(id));
  }, []);
  
  const handleDotClick = useCallback((id) => {
    setActiveCheckpoint(parseInt(id));
    scroller.scrollTo(`checkpoint-${id}`, {
      duration: 800,
      smooth: true,
      offset: -50
    });
  }, []);

  // Calculate document height based on checkpoint positions
  const documentHeight = useMemo(() => {
    if (Object.keys(checkpointPositions).length === 0) return '200vh';
    
    const positions = Object.values(checkpointPositions);
    if (positions.length === 0) return '200vh';
    
    const lastY = Math.max(...positions.map(pos => pos.y));
    return `${lastY + 400}px`;
  }, [checkpointPositions]);

  // Only render checkpoints when positions are calculated
  const renderCheckpoints = useMemo(() => {
    if (Object.keys(checkpointPositions).length === 0) return null;
    
    return (
      <>
        <Suspense fallback={<LoadingPlaceholder>Loading education...</LoadingPlaceholder>}>
          <MemoizedCheckpoint 
            data={{
              ...journeyData.education, 
              position: checkpointPositions[journeyData.education.id]
            }}
            isActive={activeCheckpoint === journeyData.education.id}
            onInView={handleCheckpointInView}
            ref={(el) => (checkpointsRef.current[journeyData.education.id] = el)}
          />
        </Suspense>
        
        {journeyData.projects.map((project) => (
          <Suspense key={project.id} fallback={<LoadingPlaceholder>Loading project...</LoadingPlaceholder>}>
            <MemoizedCheckpoint 
              data={{
                ...project, 
                position: checkpointPositions[project.id]
              }}
              isActive={activeCheckpoint === project.id}
              onInView={handleCheckpointInView}
              ref={(el) => (checkpointsRef.current[project.id] = el)}
            />
          </Suspense>
        ))}
      </>
    );
  }, [checkpointPositions, activeCheckpoint, handleCheckpointInView]);

  return (
    <>
      {/* Initial loading screen - only shows if isInitialLoading is true */}
      {isInitialLoading && (
        <InitialLoadingScreen isLoading={true}>
          <CodingIcons>
            {renderCodingIcons()}
          </CodingIcons>
          <LoadingTitle>Himanshi's Developer Journey</LoadingTitle>
          <LoadingMessage>
            <p>{loadingMessage || "Transforming passion into digital experiences... Please wait while I compile my journey for you."}</p>
          </LoadingMessage>
          <LoadingBarContainer>
            <LoadingBar progress={progress} />
          </LoadingBarContainer>
          <LoadingPercentage>{Math.round(progress)}%</LoadingPercentage>
        </InitialLoadingScreen>)}

      {/* Main content */}
      <StoryMapContainer>
        <Suspense fallback={<LoadingPlaceholder>Loading parallax effect...</LoadingPlaceholder>}>
          <ParallaxLayer />
        </Suspense>
        
        <ContentWrapper>
          <HeaderSection id="about-section" name="about-section">
            <Title>Himanshi's Developer Journey</Title>
            
            <AboutMeSection>
              <h2 style={{ color: '#ff4d79', marginBottom: '15px' }}>About Me</h2>
              <p>
                Hi, I'm Himanshi! I'm a passionate full-stack developer with expertise in React, Node.js, and cloud technologies.
                I love building elegant solutions to complex problems and continuously learning new technologies.
                My journey has taken me from education to exciting projects across various domains.
              </p>
            </AboutMeSection>
            
            <ContactSectionWrapper id="contact-section" name="contact-section">
              <Suspense fallback={<LoadingPlaceholder>Loading contact section...</LoadingPlaceholder>}>
                <ContactSection />
              </Suspense>
            </ContactSectionWrapper>
          </HeaderSection>
          
          <SectionDivider />
          
          <JourneyTitle id="journey-section" name="journey-section">My Professional Journey</JourneyTitle>
          
          <CheckpointsContainer style={{ height: documentHeight }}>
            <Suspense fallback={<LoadingPlaceholder>Loading timeline...</LoadingPlaceholder>}>
              <Timeline 
                checkpointPositions={checkpointPositions} 
                activeCheckpoint={activeCheckpoint}
              />
            </Suspense>
            
            {renderCheckpoints}
          </CheckpointsContainer>
        </ContentWrapper>
        
        <Suspense fallback={<LoadingPlaceholder>Loading navigation...</LoadingPlaceholder>}>
          <NavigationDots 
            total={journeyData.projects.length + 1}
            active={activeCheckpoint}
            onDotClick={handleDotClick}
          />
        </Suspense>
      </StoryMapContainer>
    </>
  );
};

export default StoryMap;