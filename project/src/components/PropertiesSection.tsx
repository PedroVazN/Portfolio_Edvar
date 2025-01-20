import React from 'react';

const properties = [
  {
    id: 1,
    image: 'https://via.placeholder.com/400',
    title: 'Apartamento Luxuoso',
    location: 'São Paulo, SP',
    price: 'R$ 850.000',
    bedrooms: 3,
    bathrooms: 2,
    area: '120m²'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/400',
    title: 'Casa Moderna',
    location: 'Rio de Janeiro, RJ',
    price: 'R$ 1.200.000',
    bedrooms: 4,
    bathrooms: 3,
    area: '250m²'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/400',
    title: 'Studio Aconchegante',
    location: 'Belo Horizonte, MG',
    price: 'R$ 450.000',
    bedrooms: 1,
    bathrooms: 1,
    area: '45m²'
  },
  // Adicione mais imóveis conforme necessário
];

const PropertiesSection = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Nossos Imóveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-lg font-bold text-blue-600">{property.price}</p>
                <div className="mt-4 flex justify-between text-gray-700">
                  <span>{property.bedrooms} Quartos</span>
                  <span>{property.bathrooms} Banheiros</span>
                  <span>{property.area}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
