import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoryMap from './components/StoryMap/StoryMap';
import DetailPage from './components/StoryMap/DetailPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoryMap />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;