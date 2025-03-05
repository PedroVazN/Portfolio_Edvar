import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bath, Bed } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import AnimatedElement from './AnimatedElement';

const neighborhoods = [
  'Alto do Ipiranga',
  'Vila Mariana',
  'Saúde',
  'Cambuci',
  'Sacomã',
  'Ipiranga'
];


const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    bedrooms: '',
    bathrooms: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (filters.bedrooms) {
      const bedroomsNumber = filters.bedrooms.split(' ')[0];
      queryParams.append('bedrooms', bedroomsNumber);
    }
    if (filters.bathrooms) {
      const bathroomsNumber = filters.bathrooms.split(' ')[0];
      queryParams.append('bathrooms', bathroomsNumber);
    }
    
    navigate(`/properties/search?${queryParams.toString()}`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ 
          scale: 1,
          transition: { duration: 1.5, ease: [0.25, 1, 0.5, 1] }
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        {/* Gradient overlay with enhanced depth */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { duration: 1.2 }
          }}
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60" 
        />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32">
        <div className="flex flex-col items-center justify-center">
          {/* Hero Text Section */}
          <div className="text-center mb-10 sm:mb-16">
            <AnimatedElement 
              animation="fadeInUp" 
              className="mb-3 inline-block px-4 py-1.5 bg-blue-500/10 backdrop-blur-sm rounded-full"
            >
              <span className="text-blue-300 font-medium text-sm sm:text-base">
                Especialista em Imóveis na Zona Sul de São Paulo
              </span>
            </AnimatedElement>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <AnimatedText 
                text="Encontre o Imóvel dos Seus Sonhos"
                highlight={["Sonhos"]}
                highlightClassName="text-blue-400"
              />
            </h1>

            <AnimatedElement 
              animation="fadeInUp"
              delay={0.3}
              className="max-w-2xl mx-auto"
            >
              <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                Explore nossa seleção exclusiva de imóveis em São Paulo e encontre o lugar perfeito para chamar de seu
              </p>
            </AnimatedElement>
          </div>

          {/* Search Form with Glass Effect */}
          <AnimatedElement 
            animation="scale" 
            delay={0.5}
            className="w-full max-w-3xl mx-auto"
          >
            <form onSubmit={handleSearch} className="w-full">
              <motion.div 
                className="glass-dark rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 sm:p-8">
                  {/* Filter Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-6 sm:mb-8">
                    {[
                      {
                        label: 'Quartos',
                        value: filters.bedrooms,
                        onChange: (value: string) => setFilters({ ...filters, bedrooms: value }),
                        options: ['1', '2', '3', '4', '5+'],
                        icon: Bed
                      },
                      {
                        label: 'Banheiros',
                        value: filters.bathrooms,
                        onChange: (value: string) => setFilters({ ...filters, bathrooms: value }),
                        options: ['1', '2', '3', '4', '5+'],
                        icon: Bath
                      }
                    ].map((field, index) => (
                      <div key={field.label} className="relative">
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          {field.label}
                        </label>
                        <div className="relative group">
                          <motion.select
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-full pl-12 pr-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl
                                     text-white placeholder-white/70 appearance-none
                                     focus:ring-2 focus:ring-blue-500/70 focus:border-transparent
                                     hover:bg-white/15 transition-all duration-300 cursor-pointer"
                            whileFocus={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                          >
                            <option value="" className="bg-gray-900 text-white">Selecione</option>
                            {field.options.map((opt) => (
                              <option key={opt} value={opt} className="bg-gray-900 text-white">
                                {opt} {field.label.includes('Quartos') && opt !== '5+' ? (opt === '1' ? 'Quarto' : 'Quartos') : ''}
                                {field.label.includes('Banheiros') && opt !== '5+' ? (opt === '1' ? 'Banheiro' : 'Banheiros') : ''}
                              </option>
                            ))}
                          </motion.select>
                          <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 
                                           group-hover:text-blue-300 transition-colors duration-300 pointer-events-none" />
                          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                            <svg className="h-5 w-5 text-white/70" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Search Button with enhanced animation */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 15 
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl
                             font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 
                             flex items-center justify-center space-x-3 text-lg"
                  >
                    <Search className="w-5 h-5" />
                    <span>Buscar Imóveis</span>
                  </motion.button>
                </div>
              </motion.div>
            </form>
          </AnimatedElement>

          {/* Neighborhood chips */}
          <AnimatedElement 
            animation="fadeInUp" 
            delay={0.8}
            className="mt-8 sm:mt-10 flex flex-wrap justify-center items-center gap-2"
          >
            <span className="text-white/80 text-sm mr-2">Bairros populares:</span>
            {neighborhoods.map((neighborhood, index) => (
              <motion.button
                key={neighborhood}
                className="text-sm px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90
                         hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.9 + index * 0.05, duration: 0.5 } 
                }}
              >
                {neighborhood}
              </motion.button>
            ))}
          </AnimatedElement>
        </div>
      </div>

      {/* Floating decoration elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
    </div>
  );
};

export default Hero;