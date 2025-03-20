import React, { useEffect } from 'react';
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
  position: relative;
  width: 100%;
  max-width: 220px;
  background-color: rgba(20, 23, 37, 0.85);
  border-radius: 8px;
  padding: 15px;
  border: 1px solid ${props => props.isActive ? '#ff4d79' : '#304878'};
  transition: all 0.3s ease;
  transform: ${props => props.isActive ? 'scale(1.05)' : 'scale(1)'};
  z-index: ${props => props.isActive ? 10 : 5};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  left: ${props => props.position?.x}px;
  top: ${props => props.position?.y}px;
  
  @media (max-width: 768px) {
    position: relative !important;
    left: 0 !important;
    top: 0 !important;
    max-width: 100%;
    margin: 40px auto;
  }
  
  &:before {
    content: '${props => props.checkpoint_id}';
    position: absolute;
    left: -15px;
    top: -15px;
    width: 30px;
    height: 30px;
    background: ${props => props.isActive ? '#ff4d79' : '#304878'};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
  }
  
  &:hover {
    border-color: #ff4d79;
    transform: scale(1.05);
  }
`;

const Title = styled.h3`
  color: white;
  margin: 0 0 5px;
  font-size: 1rem;
`;

const Subtitle = styled.p`
  color: #b8c4d9;
  margin: 0 0 10px;
  font-size: 0.85rem;
`;

const Details = styled.p`
  color: white;
  font-size: 0.8rem;
  margin: 0 0 10px;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
`;

const ViewMore = styled.div`
  display: inline-block;
  margin-top: 10px;
  padding: 4px 8px;
  background: #304878;
  border-radius: 4px;
  color: white;
  font-size: 0.75rem;
  transition: background 0.3s;
  
  ${CheckpointContainer}:hover & {
    background: #ff4d79;
  }
`;

const Checkpoint = ({ data, isActive, onInView }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false
  });
  
  useEffect(() => {
    if (inView) {
      onInView(data.id);
    }
  }, [inView, data.id, onInView]);

  return (
    <Element name={`checkpoint-${data.id}`}>
      <StyledLink to={`/detail/${data.id}`}>
        <CheckpointContainer 
          ref={ref}
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
};

export default Checkpoint;