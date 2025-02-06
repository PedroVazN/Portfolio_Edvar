import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, DotSquare, Loader2, X, Filter, ArrowLeft, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Property {
  _id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  type: string;
}

const neighborhoods = [
  'Alto do Ipiranga',
  'Vila Mariana',
  'Saúde',
  'Cambuci',
  'Sacomã',
  'Ipiranga'
];

const PropertyList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    location: searchParams.get('location') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    minPrice: '',
    maxPrice: ''
  });

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      minPrice: '',
      maxPrice: ''
    });
    setSearchParams(new URLSearchParams());
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams(searchParams);
        const response = await fetch(`https://back-end-portfolio-edvar.vercel.app/api/properties?${queryParams.toString()}`);
        if (!response.ok) throw new Error('Falha ao carregar imóveis');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Não foi possível carregar os imóveis. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  const filteredProperties = properties.filter(property => {
    // Type filter (Venda/Locação)
    if (filters.type && property.type.toLowerCase() !== filters.type.toLowerCase()) return false;
    
    // Location filter - check if the location contains the selected neighborhood
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    
    // Bedrooms filter
    if (filters.bedrooms) {
      const bedroomsNum = parseInt(filters.bedrooms);
      if (filters.bedrooms === '5+') {
        if (property.bedrooms < 5) return false;
      } else if (property.bedrooms !== bedroomsNum) {
        return false;
      }
    }
    
    // Bathrooms filter
    if (filters.bathrooms) {
      const bathroomsNum = parseInt(filters.bathrooms);
      if (filters.bathrooms === '5+') {
        if (property.bathrooms < 5) return false;
      } else if (property.bathrooms !== bathroomsNum) {
        return false;
      }
    }
    
    // Price filters
    if (filters.minPrice && property.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) return false;
    
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-600 font-medium">Carregando imóveis...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Imóveis Encontrados
            </h1>
            <p className="text-gray-600">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-4">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700
                       text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Negócio
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={filters.type}
                        onChange={(e) => updateFilter('type', e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Todos os tipos</option>
                        <option value="Venda">Venda</option>
                        <option value="Locação">Locação</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localização
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={filters.location}
                        onChange={(e) => updateFilter('location', e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Todas as localizações</option>
                        {neighborhoods.map(neighborhood => (
                          <option key={neighborhood} value={neighborhood}>
                            {neighborhood}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quartos
                    </label>
                    <div className="relative">
                      <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={filters.bedrooms}
                        onChange={(e) => updateFilter('bedrooms', e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Qualquer quantidade</option>
                        {[1, 2, 3, 4, '5+'].map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Quarto' : 'Quartos'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Banheiros
                    </label>
                    <div className="relative">
                      <Bath className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={filters.bathrooms}
                        onChange={(e) => updateFilter('bathrooms', e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Qualquer quantidade</option>
                        {[1, 2, 3, 4, '5+'].map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Banheiro' : 'Banheiros'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preço Mínimo
                    </label>
                    <input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) => updateFilter('minPrice', e.target.value)}
                      placeholder="R$ Mínimo"
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preço Máximo
                    </label>
                    <input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) => updateFilter('maxPrice', e.target.value)}
                      placeholder="R$ Máximo"
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {Object.values(filters).some(value => value) && (
                  <button
                    onClick={clearFilters}
                    className="mt-6 text-red-600 hover:text-red-700 text-sm font-medium
                             flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Limpar todos os filtros
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg"
          >
            <p className="text-gray-600 text-xl mb-6">
              Nenhum imóvel encontrado com os filtros selecionados.
            </p>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-700 font-medium text-lg"
            >
              Limpar filtros
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/property/${property._id}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl
                           transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500
                               group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                        {property.title}
                      </h3>
                      <p className="text-white/90 flex items-center text-sm drop-shadow-lg">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-2xl font-bold text-blue-600 mb-4">
                      R$ {property.price.toLocaleString('pt-BR')}
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Bed className="w-5 h-5" />
                        <span>{property.bedrooms} {property.bedrooms === 1 ? 'Quarto' : 'Quartos'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Bath className="w-5 h-5" />
                        <span>{property.bathrooms} {property.bathrooms === 1 ? 'Banho' : 'Banhos'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <DotSquare className="w-5 h-5" />
                        <span>{property.area}m²</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PropertyList;