import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Search, Home, Bath, Bed } from 'lucide-react';
import { motion } from 'framer-motion';

const neighborhoods = [
  'Alto do Ipiranga',
  'Vila Mariana',
  'Saúde',
  'Cambuci',
  'Sacomã',
  'Ipiranga'
];

const Hero = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    bedrooms: '',
    bathrooms: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.location) queryParams.append('location', filters.location);
    if (filters.bedrooms) queryParams.append('bedrooms', filters.bedrooms);
    if (filters.bathrooms) queryParams.append('bathrooms', filters.bathrooms);
    
    navigate(`/properties/search?${queryParams.toString()}`);
  };

  return (
    <div className="relative h-screen bg-gray-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          filter: 'brightness(0.8)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold text-white text-center mb-8 leading-tight"
        >
          Encontre o Imóvel dos 
          <span className="block text-blue-400">Seus Sonhos</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-white/90 text-center mb-12 max-w-2xl leading-relaxed"
        >
          Explore nossa seleção exclusiva de imóveis em São Paulo e encontre o lugar perfeito para chamar de seu
        </motion.p>
        
        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onSubmit={handleSearch}
          className="w-full max-w-4xl backdrop-blur-md bg-white/95 rounded-2xl shadow-2xl p-8 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: 'Tipo de Negócio',
                value: filters.type,
                onChange: (value: string) => setFilters({ ...filters, type: value }),
                options: ['Venda', 'Locação'],
                icon: Building
              },
              {
                label: 'Localização',
                value: filters.location,
                onChange: (value: string) => setFilters({ ...filters, location: value }),
                options: neighborhoods,
                icon: Home
              },
              {
                label: 'Quartos',
                value: filters.bedrooms,
                onChange: (value: string) => setFilters({ ...filters, bedrooms: value }),
                options: ['1', '2', '3', '4', '5+'].map(num => `${num} ${num === '1' ? 'Quarto' : 'Quartos'}`),
                icon: Bed
              },
              {
                label: 'Banheiros',
                value: filters.bathrooms,
                onChange: (value: string) => setFilters({ ...filters, bathrooms: value }),
                options: ['1', '2', '3', '4', '5+'].map(num => `${num} ${num === '1' ? 'Banheiro' : 'Banheiros'}`),
                icon: Bath
              }
            ].map((field, index) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <div className="relative group">
                  <select
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-300 group-hover:border-blue-400"
                  >
                    <option value="">Selecione</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 
                                       group-hover:text-blue-500 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg 
                     font-semibold shadow-lg hover:shadow-xl transition-all duration-300 
                     flex items-center justify-center space-x-3"
          >
            <Search className="w-5 h-5" />
            <span>Buscar Imóveis</span>
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Hero;