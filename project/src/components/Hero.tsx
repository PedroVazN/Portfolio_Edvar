import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Search, Home, Bath, Bed } from 'lucide-react';

const locations = [
  'Ipiranga',
  'Vila Mariana',
  'Saúde',
  'Cambuci',
  'Sacomã'
];

function Hero() {
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
    
    navigate(`/properties?${queryParams.toString()}`);
  };

  return (
    <div className="h-auto bg-gray-50 overflow-hidden">
      <div className="relative h-[70vh] bg-cover bg-center" style={{
        backgroundImage: 'url("https://wallpapers.com/images/hd/small-luxury-house-4k-hd-oj9nyozvh7a9xbh2.jpg")'
      }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            Encontre o Imóvel Perfeito
          </h1>
          <p className="text-xl text-white/90 text-center mb-12 max-w-2xl">
            Busque entre nossa seleção de imóveis e encontre aquele que melhor atende suas necessidades
          </p>
          
          <form onSubmit={handleSearch} className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Negócio
                </label>
                <div className="relative">
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    <option value="Venda">Venda</option>
                    <option value="Locação">Locação</option>
                  </select>
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização
                </label>
                <div className="relative">
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quartos
                </label>
                <div className="relative">
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    {[1, 2, 3, 4, '5+'].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Quarto' : 'Quartos'}
                      </option>
                    ))}
                  </select>
                  <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banheiros
                </label>
                <div className="relative">
                  <select
                    value={filters.bathrooms}
                    onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    {[1, 2, 3, 4, '5+'].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Banheiro' : 'Banheiros'}
                      </option>
                    ))}
                  </select>
                  <Bath className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Buscar Imóveis</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Hero;