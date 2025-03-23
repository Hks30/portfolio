// src/components/StoryMap/Checkpoint.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; // For prop validation
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import SkillBadge from '../UI/SkillBadge';
import styled from 'styled-components';
import { Element } from 'react-scroll';

// We need to style a Link from react-router-dom
const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  cursor: pointer;
`;

const CheckpointContainer = styled.div`
  position: absolute;
  width: 100%;
  max-width: 220px;
  background-color: rgba(18, 25, 52, 0.9); /* Increased opacity for better contrast */
  border-radius: 8px;
  padding: 18px; /* Increased padding */
  border: 1px solid ${props => props.isActive ? '#ff4d79' : '#304878'};
  transition: all 0.3s ease;
  transform: ${props => props.isActive ? 'scale(1.1)' : 'scale(1)'};
  z-index: ${props => props.isActive ? 15 : 5};
  box-shadow: ${props => props.isActive ? '0 0 15px #ff4d79' : '0 4px 20px rgba(0, 0, 0, 0.2)'};
  left: ${props => props.position?.x || 0}px;
  top: ${props => props.position?.y || 0}px;

  @media (max-width: 768px) {
    position: relative !important;
    left: 0 !important;
    top: 0 !important;
    max-width: 100%;
    margin: 40px auto; /* Increased vertical margin for better spacing */
    transform: scale(1) !important; 
    border: 1px solid ${props => props.isActive ? '#ff4d79' : '#304878'};
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    margin: 30px auto; /* Better spacing */
    margin-top: 30px;
    width: 92%;
  }

  &:before {
    content: '${props => props.checkpoint_id || ''}';
    position: absolute;
    left: -15px;
    top: -15px;
    width: 32px; /* Slightly larger */
    height: 32px;
    background: ${props => props.isActive ? '#ff4d79' : '#304878'};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    z-index: 20;
    box-shadow: ${props => props.isActive ? '0 0 10px #ff4d79' : 'none'};
  }

  &:hover {
    transform: scale(1.1);
    border-color: #ff4d79;
    box-shadow: 0 0 15px #ff4d79;
    z-index: 15; /* Bring hovered checkpoints to the top */
  }
`;

const Title = styled.h3`
  color: white;
  margin: 0 0 8px; /* Increased margin */
  font-size: 1.1rem;
  
  @media (max-width: 480px) {
    font-size: 1.25rem; /* Increased font size for mobile */
    margin-bottom: 10px;
  }
`;

const Subtitle = styled.p`
  color: #b8c4d9;
  margin: 0 0 12px; /* Increased margin */
  font-size: 0.9rem;
  
  @media (max-width: 480px) {
    font-size: 1rem; /* Increased font size for mobile */
    margin-bottom: 14px;
  }
`;

const Details = styled.p`
  color: white;
  font-size: 0.85rem;
  margin: 0 0 14px; /* Increased margin */
  line-height: 1.5; /* Improved line height for readability */
  
  @media (max-width: 480px) {
    font-size: 0.95rem; /* Increased font size for mobile */
    line-height: 1.6;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px; /* Increased gap */
  margin-top: 12px;

  @media (max-width: 480px) {
    justify-content: flex-start; /* Changed to flex-start for better alignment */
    gap: 8px;
    margin-top: 16px;
  }
`;

const ViewMore = styled.div`
  display: inline-block;
  margin-top: 14px;
  padding: 6px 12px; /* Increased padding */
  background: #304878;
  border-radius: 4px;
  color: white;
  font-size: 0.8rem;
  transition: background 0.3s, transform 0.2s;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 8px 14px;
    margin-top: 18px;
  }

  ${CheckpointContainer}:hover & {
    background: #ff4d79;
    transform: translateY(-2px); /* Subtle lift effect */
  }
`;

const Checkpoint = React.forwardRef(({ data, isActive, onInView }, ref) => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // Combine refs for CheckpointContainer
  const setRefs = (node) => {
    ref && ref(node);
    inViewRef(node);
  };

  useEffect(() => {
    if (inView) {
      onInView(data.id);
    }
  }, [inView, data.id, onInView]);

  return (
    <Element name={`checkpoint-${data.id}`}>
      <StyledLink to={`/detail/${data.id}`}>
        <CheckpointContainer
          ref={setRefs}
          isActive={isActive}
          position={data.position}
          checkpoint_id={data.id}
        >
          <Title>{data.title}</Title>
          <Subtitle>{data.subtitle}</Subtitle>
          <Details>{data.details}</Details>

          <SkillsContainer>
            {data.skills.map((skill, index) => (
              <SkillBadge key={index} skill={skill} />
            ))}
          </SkillsContainer>

          <ViewMore>View Details</ViewMore>
        </CheckpointContainer>
      </StyledLink>
    </Element>
  );
});

// Prop validation
Checkpoint.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    details: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    skills: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isActive: PropTypes.bool,
  onInView: PropTypes.func.isRequired,
};

// Default props
Checkpoint.defaultProps = {
  isActive: false,
  data: {
    id: '',
    title: '',
    subtitle: '',
    details: '',
    position: { x: 0, y: 0 },
    skills: [],
  },
};

export default Checkpoint;