import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bed, Bath, Home, Car, DotSquare as SquareFootage, MapPin } from 'lucide-react';

interface Property {
  _id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  vagas: number;
  images: string[];
  type: string;
}

const PropertyList = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Captura os parâmetros da URL
        const type = searchParams.get('type');
        const neighborhood = searchParams.get('neighborhood');
        const bedrooms = searchParams.get('bedrooms');
        const bathrooms = searchParams.get('bathrooms');

        // Monta a query de filtros
        const queryParams = new URLSearchParams();
        if (type) queryParams.append('type', type);
        if (neighborhood) queryParams.append('neighborhood', neighborhood);
        if (bedrooms) queryParams.append('bedrooms', bedrooms);
        if (bathrooms) queryParams.append('bathrooms', bathrooms);

        // Faz a requisição à API
        const response = await fetch(`https://backendimoveis.vercel.app/api/properties?${queryParams.toString()}`);
        const data = await response.json();
        setProperties(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Imóveis Encontrados</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-gray-600">Carregando imóveis...</span>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-gray-600">Nenhum imóvel encontrado com os filtros selecionados.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      {property.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-blue-600 font-bold">
                      R$ {property.price.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <p className="text-sm line-clamp-1">{property.location}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex items-center space-x-1">
                      <Bed className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bath className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Car className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{property.vagas || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SquareFootage className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{property.area}m²</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyList;