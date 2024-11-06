import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturedCategories from './FeaturedCategories';
import PopularSection from './PopularSection';
import Footer from './Footer';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <HeroSection />
      <FeaturedCategories />
      <PopularSection />
      <Footer />
    </div>
  );
}

export default App;
