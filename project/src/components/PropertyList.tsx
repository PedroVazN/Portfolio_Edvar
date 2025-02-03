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

  const currentFilters = {
    type: searchParams.get('type') || '',
    location: searchParams.get('location') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
  };

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const removeFilter = (key: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
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
        setError(null);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Não foi possível carregar os imóveis. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600 font-medium">Carregando imóveis...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para página inicial
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium
                       transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar para página inicial
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

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        label: 'Tipo de Negócio',
                        value: currentFilters.type,
                        onChange: (value: string) => updateFilter('type', value),
                        options: ['Venda', 'Locação'],
                        icon: <Building2 className="w-5 h-5 text-gray-400" />
                      },
                      {
                        label: 'Localização',
                        value: currentFilters.location,
                        onChange: (value: string) => updateFilter('location', value),
                        options: neighborhoods,
                        icon: <MapPin className="w-5 h-5 text-gray-400" />
                      },
                      {
                        label: 'Quartos',
                        value: currentFilters.bedrooms,
                        onChange: (value: string) => updateFilter('bedrooms', value),
                        options: ['1', '2', '3', '4', '5+'].map(num => `${num} ${num === '1' ? 'Quarto' : 'Quartos'}`),
                        icon: <Bed className="w-5 h-5 text-gray-400" />
                      },
                      {
                        label: 'Banheiros',
                        value: currentFilters.bathrooms,
                        onChange: (value: string) => updateFilter('bathrooms', value),
                        options: ['1', '2', '3', '4', '5+'].map(num => `${num} ${num === '1' ? 'Banheiro' : 'Banheiros'}`),
                        icon: <Bath className="w-5 h-5 text-gray-400" />
                      }
                    ].map((field, index) => (
                      <motion.div
                        key={field.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                        </label>
                        <div className="relative group">
                          <select
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                   transition-all duration-200 appearance-none
                                   hover:border-blue-400"
                          >
                            <option value="">Todos</option>
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none
                                      group-hover:text-blue-500 transition-colors duration-200">
                            {field.icon}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {Object.values(currentFilters).some(value => value) && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={clearAllFilters}
                      className="mt-6 text-red-600 hover:text-red-700 text-sm font-medium
                               flex items-center gap-2 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                      Limpar todos os filtros
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4"
          >
            Imóveis Encontrados
          </motion.h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(currentFilters).map(([key, value]) => 
              value && (
                <motion.span
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium
                           flex items-center gap-2 shadow-sm"
                >
                  {key === 'type' && 'Tipo: '}
                  {key === 'location' && 'Localização: '}
                  {key === 'bedrooms' && 'Quartos: '}
                  {key === 'bathrooms' && 'Banheiros: '}
                  {value}
                  <button 
                    onClick={() => removeFilter(key)}
                    className="hover:text-blue-900 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.span>
              )
            )}
          </div>
          
          <p className="text-gray-600 font-medium">
            {properties.length} {properties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
          </p>
        </motion.div>

        {properties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg"
          >
            <p className="text-gray-600 text-xl mb-6">
              Nenhum imóvel encontrado com os filtros selecionados.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearAllFilters}
              className="text-blue-600 hover:text-blue-700 font-medium text-lg
                       transition-colors duration-200"
            >
              Limpar filtros
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {properties.map((property, index) => (
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