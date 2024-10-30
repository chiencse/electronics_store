import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturedCategories from './components/FeaturedCategories';
import PopularSection from './PopularSection';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <HeroSection />
      <FeaturedCategories />
      <PopularSection />
    </div>
  );
}

export default App;
