import React, { useState } from 'react';
import { Search, MapPin, Bed, Bath } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const locations = [
  'Ipiranga',
  'Vila Mariana',
  'São Caetano',
  'Sacomã',
  'Cambuci',
  'Alto Ipiranga'
];

interface SearchFilters {
  location: string;
  bedrooms: string;
  bathrooms: string;
}

const SearchBanner = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    bedrooms: '',
    bathrooms: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (filters.location) queryParams.append('location', filters.location);
    if (filters.bedrooms) queryParams.append('bedrooms', filters.bedrooms);
    if (filters.bathrooms) queryParams.append('bathrooms', filters.bathrooms);
    
    navigate(`/properties/search?${queryParams.toString()}`);
  };

  return (
    <div className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80"
          alt="Real Estate Banner"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Encontre o Imóvel dos Seus Sonhos
          </h1>
          <p className="text-xl text-white/90">
            Busque entre centenas de opções na região que você deseja
          </p>
        </div>

        <form 
          onSubmit={handleSearch}
          className="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Location Filter */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Localização
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecione a região</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bedrooms Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quartos
              </label>
              <div className="relative">
                <Bed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Qualquer</option>
                  {[1, 2, 3, 4, '5+'].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Quarto' : 'Quartos'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bathrooms Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banheiros
              </label>
              <div className="relative">
                <Bath className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={filters.bathrooms}
                  onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Qualquer</option>
                  {[1, 2, 3, '4+'].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Banheiro' : 'Banheiros'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Buscar Imóveis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBanner;