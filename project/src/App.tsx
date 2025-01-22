import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import PropertiesSection from './components/PropertiesSection';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AddProperty from './components/AddProperty';

function App() {
  const [properties, setProperties] = useState<any[]>([]);

  const addNewProperty = (newProperty: any) => {
    setProperties((prev) => [...prev, newProperty]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Hero />
                  <Services />
                  <About />
                  <PropertiesSection properties={properties} />
                  <Testimonials />
                  <Contact />
                </>
              } 
            />
            <Route 
              path="/add-property" 
              element={<AddProperty onAddProperty={addNewProperty} />} 
            />
            <Route path="/property/:id" element={<h1>Detalhes do Imóvel</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
