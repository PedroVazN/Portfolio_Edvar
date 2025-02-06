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
    
    // Format the bedrooms and bathrooms values to match the PropertyList expectations
    if (filters.type) {
      queryParams.append('type', filters.type);
    }
    if (filters.location) {
      queryParams.append('location', filters.location);
    }
    if (filters.bedrooms) {
      // Extract just the number from strings like "2 Quartos"
      const bedroomsNumber = filters.bedrooms.split(' ')[0];
      queryParams.append('bedrooms', bedroomsNumber);
    }
    if (filters.bathrooms) {
      // Extract just the number from strings like "2 Banheiros"
      const bathroomsNumber = filters.bathrooms.split(' ')[0];
      queryParams.append('bathrooms', bathroomsNumber);
    }
    
    navigate(`/properties/search?${queryParams.toString()}`);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-7xl mx-auto">
          {/* Hero Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            >
              Encontre o Imóvel dos{' '}
              <span className="text-blue-400">Seus Sonhos</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed px-4"
            >
              Explore nossa seleção exclusiva de imóveis em São Paulo e encontre o lugar perfeito para chamar de seu
            </motion.p>
          </motion.div>

          {/* Search Form */}
          <motion.form 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onSubmit={handleSearch}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="backdrop-blur-md bg-white/95 rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8">
              {/* Filter Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
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
                    options: ['1', '2', '3', '4', '5+'].map(num => num),
                    icon: Bed
                  },
                  {
                    label: 'Banheiros',
                    value: filters.bathrooms,
                    onChange: (value: string) => setFilters({ ...filters, bathrooms: value }),
                    options: ['1', '2', '3', '4', '5+'].map(num => num),
                    icon: Bath
                  }
                ].map((field, index) => (
                  <motion.div
                    key={field.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="relative"
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {field.label}
                    </label>
                    <div className="relative group">
                      <select
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg 
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-all duration-300 group-hover:border-blue-400
                                 text-gray-700 text-base appearance-none cursor-pointer"
                      >
                        <option value="">Selecione</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt} {field.label.includes('Quartos') && opt !== '5+' ? (opt === '1' ? 'Quarto' : 'Quartos') : ''}
                            {field.label.includes('Banheiros') && opt !== '5+' ? (opt === '1' ? 'Banheiro' : 'Banheiros') : ''}
                          </option>
                        ))}
                      </select>
                      <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 
                                           group-hover:text-blue-500 transition-colors duration-300 pointer-events-none" />
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Search Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg 
                         font-semibold shadow-lg hover:shadow-xl transition-all duration-300 
                         flex items-center justify-center space-x-3"
              >
                <Search className="w-5 h-5" />
                <span className="text-base sm:text-lg">Buscar Imóveis</span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Hero;