import React from 'react';
import styled from 'styled-components';

const Badge = styled.span`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  background-color: rgba(255, 77, 121, 0.2);
  color: #ff4d79;
  font-size: 0.7rem;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 77, 121, 0.3);
    transform: translateY(-2px);
  }
`;

const SkillBadge = ({ skill }) => {
  return <Badge>{skill}</Badge>;
};

export default SkillBadge;