import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StoryMap from './components/StoryMap/StoryMap';
import DetailPage from './components/StoryMap/DetailPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StoryMap />} />
      <Route path="/detail/:id" element={<DetailPage />} />
    </Routes>
  );
};

export default App;
