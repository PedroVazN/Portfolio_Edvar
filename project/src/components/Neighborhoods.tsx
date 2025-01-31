import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const neighborhoods = [
  {
    name: 'Ipiranga',
    image: 'https://images.pexels.com/photos/29961172/pexels-photo-29961172/free-photo-of-vista-deslumbrante-do-exterior-do-museu-da-independencia-de-sao-paulo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Bairro histórico com excelente infraestrutura'
  },
  {
    name: 'Cambuci',
    image: 'https://www.ape11.com.br/wp-content/uploads/2022/11/cambuci_bairro_do_centro_de_sao_paulo.png',
    description: 'Região residencial tranquila e arborizada'
  },
  {
    name: 'Vila Mariana',
    image: 'https://www.mdl.com.br/wp-content/uploads/2019/09/bairro-vila-mariana.png',
    description: 'Ótima localização próxima ao metrô'
  },
  {
    name: 'Sacoma',
    image: 'https://portal.loft.com.br/wp-content/uploads/2023/03/morar-no-bairro-sacoma-em-sao-paulo.jpg',
    description: 'Área nobre com imóveis exclusivos'
  }
];

const Neighborhoods = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Regiões de Atuação
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça os principais bairros onde temos imóveis disponíveis na região do Ipiranga
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {neighborhoods.map((neighborhood) => (
            <div
              key={neighborhood.name}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={neighborhood.image}
                  alt={neighborhood.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {neighborhood.name}
                  </h3>
                  <p className="text-white/90 text-sm flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Ver imóveis disponíveis
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600">{neighborhood.description}</p>
                <Link
                  to={`/properties/neighborhood/${neighborhood.name}`}
                  className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                >
                  Ver imóveis
                  <svg
                    className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Neighborhoods;