import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import SkillBadge from '../UI/SkillBadge';
import { journeyData } from '../../data/journey';

const DetailPageContainer = styled.div`
  min-height: 100vh;
  background: #0c0e1a;
  color: white;
  padding: 40px 20px;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  background: #304878;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background 0.3s;
  
  &:hover {
    background: #ff4d79;
  }
`;

const Title = styled.h1`
  color: #ff4d79;
  font-size: 2.5rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.h2`
  color: #b8c4d9;
  font-size: 1.5rem;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Section = styled.section`
  margin-bottom: 30px;
  background-color: rgba(20, 23, 37, 0.85);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #304878;
  
  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 20px;
  }
`;

const SectionTitle = styled.h3`
  color: white;
  margin-bottom: 15px;
  font-size: 1.2rem;
`;

const DetailText = styled.p`
  color: #b8c4d9;
  line-height: 1.6;
  margin-bottom: 15px;
  word-wrap: break-word;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const ButtonLink = styled.a`
  display: inline-flex;
  align-items: center;
  background: #304878;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 4px;
  margin-top: 20px;
  transition: background 0.3s;
  
  &:hover {
    background: #ff4d79;
  }
  
  svg {
    margin-right: 8px;
  }
`;

// Icon components
const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const DetailPage = () => {
  // In React Router v6, we use useParams instead of props.match
  const { id } = useParams();
  const idNumber = parseInt(id);
  
  // Get the data for the specific checkpoint
  const getCheckpointData = () => {
    const { education, projects } = journeyData;
    
    if (idNumber === education.id) {
      return education;
    } else {
      return projects.find(project => project.id === idNumber);
    }
  };
  
  const data = getCheckpointData();
  
  // Additional content based on the type of data
  const renderAdditionalContent = () => {
    if (idNumber === 1) {
      // Education specific content
      return (
        <>
          <Section>
            <SectionTitle>Educational Journey</SectionTitle>
            <DetailText>
              During my time at Temple University, I focused on developing a strong foundation in computer science principles and programming.
              My coursework included algorithms, data structures, software engineering, and various programming languages.
            </DetailText>
          </Section>
          
          <Section>
            <SectionTitle>Key Achievements</SectionTitle>
            <DetailText>
              - Maintained a GPA of 3.42 throughout the program
              - Participated in coding competitions and hackathons
              - Completed a capstone project focused on AI integration
            </DetailText>
          </Section>
        </>
      );
    } else {
      // Project specific content
      return (
        <>
          <Section>
            <SectionTitle>Project Overview</SectionTitle>
            <DetailText>
              {data.title} is a {data.subtitle} that I developed to {getProjectPurpose(data.id)}.
              This project demonstrates my skills in {data.skills.join(', ')} and my ability to create practical applications.
            </DetailText>
          </Section>
          
          <Section>
            <SectionTitle>Development Process</SectionTitle>
            <DetailText>
              {getProjectProcess(data.id)}
            </DetailText>
          </Section>
          
          <Section>
            <SectionTitle>Challenges & Solutions</SectionTitle>
            <DetailText>
              {getProjectChallenges(data.id)}
            </DetailText>
          </Section>
          
          {data.github && (
            <ButtonLink href={data.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon /> View on GitHub
            </ButtonLink>
          )}
        </>
      );
    }
  };
  
  // Helper functions for project-specific content
  const getProjectPurpose = (id) => {
    switch(id) {
      case 2:
        return "create an AI-powered workout assistant that provides personalized exercise routines";
      case 3:
        return "build a platform where travel enthusiasts can share their experiences and tips";
      case 4:
        return "facilitate multilingual communication with real-time translation capabilities";
      case 5:
        return "develop a feature-rich mobile web browsing experience for Android users";
      default:
        return "solve a specific problem in the tech industry";
    }
  };
  
  const getProjectProcess = (id) => {
    switch(id) {
      case 2:
        return "The development process involved integrating the ChatGPT API to generate workout routines based on user preferences and goals. I used Python and Django for the backend and created a RESTful API for the frontend to consume.";
      case 3:
        return "I approached this project by first designing the database schema to store user posts, comments, and profile information. Then I built the backend using Spring Boot and created a responsive UI with React to ensure a seamless experience across different devices.";
      case 4:
        return "The development of InSync focused on creating a real-time translation system using Node.js for the backend and Python for the natural language processing. I integrated multiple translation APIs to provide accurate translations across various languages.";
      case 5:
        return "I built this Android application using Kotlin, focusing on creating a smooth and intuitive browsing experience. The app includes features like bookmarks, history tracking, and a customizable home screen.";
      default:
        return "The development process involved careful planning, iterative implementation, and thorough testing to ensure the final product met all requirements.";
    }
  };
  
  const getProjectChallenges = (id) => {
    switch(id) {
      case 2:
        return "One major challenge was ensuring the AI-generated workout routines were appropriate for users' fitness levels. I solved this by implementing a detailed user profile system and adding validation rules to the AI's output.";
      case 3:
        return "Managing user-generated content and ensuring data persistence across multiple sessions was challenging. I addressed this by implementing a robust caching system and optimizing database queries for performance.";
      case 4:
        return "Achieving accurate real-time translations, especially for languages with complex grammar structures, was difficult. I overcame this by using a combination of translation services and implementing a feedback system to improve translations over time.";
      case 5:
        return "Optimizing the app's performance while maintaining a feature-rich experience was challenging. I solved this by implementing efficient resource management and lazy loading techniques.";
      default:
        return "Throughout the project, I encountered various technical challenges that required creative problem-solving and continuous learning to overcome.";
    }
  };
  
  if (!data) {
    return (
      <DetailPageContainer>
        <ContentWrapper>
          <Header>
            <BackButton to="/">
              <BackIcon /> Back to Journey Map
            </BackButton>
          </Header>
          <Title>Project Not Found</Title>
        </ContentWrapper>
      </DetailPageContainer>
    );
  }
  
  return (
    <DetailPageContainer>
      <ContentWrapper>
        <Header>
          <BackButton to="/">
            <BackIcon /> Back to Journey Map
          </BackButton>
        </Header>
        
        <Title>{data.title}</Title>
        <Subtitle>{data.subtitle}</Subtitle>
        
        <Section>
          <SectionTitle>Skills Used</SectionTitle>
          <SkillsContainer>
            {data.skills.map((skill, index) => (
              <SkillBadge key={index} skill={skill} />
            ))}
          </SkillsContainer>
        </Section>
        
        {renderAdditionalContent()}
      </ContentWrapper>
    </DetailPageContainer>
  );
};

export default DetailPage;