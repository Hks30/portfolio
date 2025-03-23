import React from 'react';
import styled from 'styled-components';
import { Element } from 'react-scroll';

const ContactContainer = styled.div`
  position: absolute;
  bottom: 0; 
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0c0e1a;
  z-index: 10; 

  @media (max-width: 768px) {
    height: 8vh;
  }
    @media (max-width: 380px) {
    height: 80vh;
  }
`;

const ContactCard = styled.div`
  background: rgba(20, 23, 37, 0.85);
  border-radius: 8px;
  padding: 10px;
  width: 50%;
  max-width: 2000px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 0.5px solid #304878;
  @media (max-width: 768px) {
    width: 100%;
  }
    @media (max-width: 480px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  color: #ff4d79;
  margin-bottom: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 24px;
  transition: color 0.3s;
  
  &:hover {
    color: #ff4d79;
  }
`;

const DownloadLink = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background: #ff4d79;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: #e63946;
  }
`;

const DownloadContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ContactSection = () => {
  

  return (
    <Element name="contact">
      <ContactContainer>
        <ContactCard>
          <Title>About Me</Title>
          <h2>Himanshi Sheth</h2>
          <h5>Permanet Resident of USA - No sponsorship required</h5>

          <p>I am an aspiring software developer with hands-on experience in React, Java, Spring Boot, SQL, and Android development. Through academic projects and self-driven initiatives,
             I have built full-stack web applications, mobile apps, and API-driven systems. 
             My passion lies in developing efficient, scalable solutions that enhance user experience. 
             I am eager to apply my technical skills in a dynamic software development role, contributing to impactful projects and continuously growing as an engineer.</p>
             <Title>Contact Me</Title>

          <SocialLinks>
            <SocialLink href="https://github.com/Hks30" target="_blank">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/himanshi-sheth-423627257/" target="_blank">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </SocialLink>
            <SocialLink href="mailto:shethhimanshi75@gmail.com">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
              </svg>
            </SocialLink>
          </SocialLinks>
          
          <DownloadContainer>
            <DownloadLink href="/Himanshi-Resume.pdf" download>
              Download Resume
            </DownloadLink>
          </DownloadContainer>
        </ContactCard>
      </ContactContainer>
    </Element>
  );
};

export default ContactSection;
