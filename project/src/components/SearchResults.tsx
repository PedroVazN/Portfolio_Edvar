import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, DotSquare, Loader2 } from 'lucide-react';

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

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('https://backendimoveis.vercel.app/api/properties');
        if (!response.ok) throw new Error('Falha ao carregar imóveis');
        const data = await response.json();
        
        // Filter properties based on search parameters
        let filteredProperties = data;
        
        const location = searchParams.get('neighborhood');
        const bedrooms = searchParams.get('bedrooms');
        const bathrooms = searchParams.get('bathrooms');
        
        if (location) {
          filteredProperties = filteredProperties.filter((property: Property) =>
            property.location.toLowerCase().includes(location.toLowerCase())
          );
        }
        
        if (bedrooms) {
          filteredProperties = filteredProperties.filter((property: Property) =>
            property.bedrooms.toString() === bedrooms
          );
        }
        
        if (bathrooms) {
          filteredProperties = filteredProperties.filter((property: Property) =>
            property.bathrooms.toString() === bathrooms
          );
        }
        
        setProperties(filteredProperties);
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/" className="text-blue-600 hover:underline">Voltar para página inicial</Link>
        </div>
      </div>
    );
  }

  const filters = {
    neighborhood: searchParams.get('neighborhood'),
    bedrooms: searchParams.get('bedrooms'),
    bathrooms: searchParams.get('bathrooms'),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
          >
            ← Voltar para página inicial
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Resultados da Busca
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(filters).map(([key, value]) => 
              value && (
                <span key={key} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {key === 'neighborhood' && 'Bairro: '}
                  {key === 'bedrooms' && 'Quartos: '}
                  {key === 'bathrooms' && 'Banheiros: '}
                  {value}
                </span>
              )
            )}
          </div>
          
          <p className="text-gray-600">
            {properties.length} {properties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              Nenhum imóvel encontrado com os filtros selecionados.
            </p>
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Limpar filtros
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link
                key={property._id}
                to={`/property/${property._id}`}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {property.title}
                    </h3>
                    <p className="text-white/90 flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    R$ {property.price.toLocaleString('pt-BR')}
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Bed className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600">{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bath className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600">{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DotSquare className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600">{property.area}m²</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;