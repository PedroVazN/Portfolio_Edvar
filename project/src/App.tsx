import React, { useEffect, useState } from 'react';
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
import PropertyDetail from './pages/PropertyDetail';

interface Property {
  _id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
}

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const addNewProperty = (newProperty: Property) => {
    setProperties((prev) => [...prev, newProperty]);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/properties');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Property[] = await response.json();
        setProperties(data);
        setError(null);
      } catch (error) {
        console.error('Erro de conexão:', error);
        setError('Não foi possível carregar os imóveis. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProperties();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
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
              <Route path="/property/:id" element={<PropertyDetail />} />
            </Routes>
          )}
        </main>
        <Footer />

        <a 
          href="https://wa.me/5511947013673" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
        >
          <img 
            src="https://cdn-icons-png.flaticon.com/512/124/124034.png" 
            alt="WhatsApp" 
            className="w-10 h-10"  
          />
        </a>
      </div>
    </Router>
  );
}

export default App;