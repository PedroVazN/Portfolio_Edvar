import React from 'react';

const properties = [
  {
    id: 1,
    image: 'https://github.com/PedroVazN/Portfolio_Edvar/blob/main/project/src/images/imv1/ft_im_1.jpg?raw=true',
    title: 'Apartamento Ipiranga',
    location: 'São Paulo, SP',
    price: 'R$ 4.992,00/mês ',
    bedrooms: 3,
    bathrooms: 2,
    area: '70 m²'
  },
  {
    id: 2,
    image: 'https://github.com/PedroVazN/Portfolio_Edvar/blob/main/project/src/images/imv2/ft_imv_15.jpg?raw=true',
    title: 'Casa Moderna',
    location: 'São Paulo - SP, Ipiranga',
    price: ' R$ 4.992,00/mês',
    bedrooms: 3,  
    bathrooms: 3,
    area: '115 m² '
  },
  {
    id: 3,
    image: 'https://imgs.kenlo.io/VWRCUkQ2Tnp3d1BJRDBJVe1szkhnWr9UfpZS9ftWwjXgr7v5Znen3XVcMHllDVRJJeIbi3YwVYEtu2E+2uxcujlnku0yZ7aRrQeI59uKuNeiskbG39b4go7ljsbgWsjU2Lwj-KzMNE6znJ5CV4IkE2JSP7VNTxXIeYK+DWF8nmS2jxX-EuBIXVEJ+jljoAhV+XSyT7aq5mcg+CL5PNidsAjcQYHEIXZ-HOBHR9ox7ltMqBezU0J8p0oF7Jq1qTLdaOenJpi9yWxNWAZ8vJq+TqjzwtiOK59nSeUyO3cb51URUaJf1-aKA+9jrwcLou-TCwSW3hrDkec3f8vtBcFKnqAFiA7KE+FJ7Ui7l9fCgfD-OkuGMVo9ob3JrqfnO-amS6DxOWSjh5Y8-5DXLcNXLIu0BGcLQnhwYn5R+x-n+KGLrkerLniV5BBfQwGA.jpg',
    title: 'Apartamento de Luxo',
    location: 'São Paulo - SP, Ipiranga ',
    price: 'R$ 7.500/mês',
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
