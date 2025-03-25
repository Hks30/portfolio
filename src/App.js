import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StoryMap from './components/StoryMap/StoryMap';
import DetailPage from './components/StoryMap/DetailPage';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    background-color: #0c0e1a;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
  
  body {
    overflow-x: hidden;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<StoryMap />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </>
  );
};

export default App;
