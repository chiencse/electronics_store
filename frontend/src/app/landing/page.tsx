import React from 'react';
import Header from '../../Layouts/Header';
import HeroSection from './HeroSection';
import PopularSection from './PopularSection';
import Footer from '../../Layouts/Footer';
import ShowProduct from './ShowProduct';
import Article from './components/Article';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <HeroSection />
      <ShowProduct />
      <Article />
      <Footer />
    </div>
  );
}

export default App;
