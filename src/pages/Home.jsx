import React from 'react';
import Hero from '../components/landing/Hero';
import WhyChooseUs from '../components/landing/WhyChooseUs';
import HowItWorks from '../components/landing/HowItWorks';
import Testimonials from '../components/landing/Testimonials';
import FAQ from '../components/landing/FAQ';

const Home = () => {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </>
  );
};

export default Home;