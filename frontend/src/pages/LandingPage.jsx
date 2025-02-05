import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Footer from '../components/Footer';
import HowItWorks from '../components/HowItWorks';
import About from '../components/About';
import ContactUs from '../components/ContactUs';
const LandingPage = () => {

  return (
    <section className="bg-white scrollable-container dark:bg-gray-900">
        <Header />
        <HeroSection />
        <Features />
        <About />
        <HowItWorks />
        <ContactUs />
        <Footer />
    </section>
  );
};

export default LandingPage;
