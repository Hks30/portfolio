import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoryMap from './components/StoryMap/StoryMap';
import DetailPage from './components/StoryMap/DetailPage';
import ContactSection from './components/Contact/ContactSection';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<StoryMap />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/contact" element={<ContactSection />} />
      </Routes>
    </Router>
  );
};

export default App;