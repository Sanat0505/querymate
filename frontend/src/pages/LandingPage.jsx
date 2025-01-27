import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Footer from '../components/Footer';
const LandingPage = () => {

  return (
    <section className="bg-white scrollable-container dark:bg-gray-900">
        <Header />
        <HeroSection />
        <Features />
        <Footer />
    </section>
  );
};

export default LandingPage;
