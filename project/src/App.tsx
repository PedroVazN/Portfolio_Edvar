import React from 'react';
import { Building2, Phone, Mail, MapPin, Star, Shield, Trophy, Users } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PropertiesSection from './components/PropertiesSection';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <PropertiesSection />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;