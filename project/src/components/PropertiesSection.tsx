import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PropertiesSection = ({ properties }: { properties: any[] }) => {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Nossos Imóveis</h2>

        {properties.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum imóvel cadastrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => navigate(`/property/${property.id}`)}
              >
                <img src={property.images[0] || 'https://via.placeholder.com/400'} alt={property.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
                  <p className="text-gray-600">{property.location}</p>
                  <p className="text-lg font-bold text-blue-600">{property.price}</p>
                  <div className="mt-4 flex justify-between text-gray-700">
                    <span>{property.bedrooms} Quartos</span>
                    <span>{property.bathrooms} Banheiros</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesSection;
