import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bed, Bath, MapPin, Heart, Share2, DotSquare as SquareFootage, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Property {
  _id: string;
  title: string;
  location: string;
  area: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
}

interface PropertiesSectionProps {
  properties: Property[];
}

const PropertiesSection: React.FC<PropertiesSectionProps> = ({ properties }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Show only first 6 properties in the main section
  const displayedProperties = properties.slice(0, 6);

  // Filter properties based on search query
  const filteredProperties = useMemo(() => {
    if (!searchQuery.trim()) return displayedProperties;

    const query = searchQuery.toLowerCase();
    return displayedProperties.filter(property =>
      property.location.toLowerCase().includes(query) ||
      property.title.toLowerCase().includes(query)
    );
  }, [displayedProperties, searchQuery]);

  const toggleFavorite = (e: React.MouseEvent, propertyId: string) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  const handleShare = async (e: React.MouseEvent, property: Property) => {
    e.stopPropagation();
    try {
      await navigator.share({
        title: property.title,
        text: `Confira este imóvel: ${property.title} em ${property.location}`,
        url: window.location.origin + `/property/${property._id}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Imóveis em Destaque
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
            Explore nossa seleção de imóveis premium e encontre o lugar perfeito para você e sua família
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Busque por localização..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:border-blue-500 
                       focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-700 
                       placeholder-gray-400 shadow-sm hover:shadow-md"
            />
          </div>
        </motion.div>

        <AnimatePresence>
          {filteredProperties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 text-lg mb-2">
                Nenhum imóvel encontrado para "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Limpar busca
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate(`/property/${property._id}`)}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 
                           overflow-hidden cursor-pointer relative transform hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => toggleFavorite(e, property._id)}
                        className={`p-2 rounded-full ${
                          favorites.has(property._id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 text-gray-700 hover:bg-white'
                        } shadow-lg transition-all`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.has(property._id) ? 'fill-current' : ''
                          }`}
                        />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleShare(e, property)}
                        className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-white shadow-lg transition-all"
                      >
                        <Share2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <p className="text-2xl font-bold text-white">
                        R$ {property.price.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <p className="line-clamp-1">{property.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-gray-700">
                        <Bed className="w-5 h-5 mr-2" />
                        <span>{property.bedrooms} {property.bedrooms === 1 ? 'Quarto' : 'Quartos'}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Bath className="w-5 h-5 mr-2" />
                        <span>{property.bathrooms} {property.bathrooms === 1 ? 'Banheiro' : 'Banheiros'}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <SquareFootage className="w-5 h-5 mr-2" />
                        <span>{property.area}m²</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Properties Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            onClick={() => navigate('/properties')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r 
                     from-blue-600 to-blue-700 text-white rounded-lg font-semibold
                     shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span className="mr-2">Ver Todos os Imóveis</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <p className="mt-4 text-gray-600">
            Explore nossa coleção completa de {properties.length} imóveis disponíveis
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PropertiesSection;