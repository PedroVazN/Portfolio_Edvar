import React from 'react';
import { Home, TrendingUp, Calculator, Key } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Compra e Venda de Imóveis',
    description: 'Encontre o imóvel dos seus sonhos ou venda com segurança.'
  },
  {
    icon: TrendingUp,
    title: 'Consultoria de Investimentos',
    description: 'Maximize seus investimentos no mercado imobiliário.'
  },
  {
    icon: Calculator,
    title: 'Avaliação de Imóveis',
    description: 'Saiba o valor real do seu imóvel.'
  },
  {
    icon: Key,
    title: 'Locação',
    description: 'Alugue ou coloque seu imóvel para locação com facilidade.'
  }
];

const Services = () => {
  return (
    <section id="servicos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
          <p className="text-xl text-gray-600">Soluções completas para todas as suas necessidades imobiliárias</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
                <Icon className="h-12 w-12 text-blue-900 mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-blue-900 text-white px-8 py-3 rounded-md hover:bg-blue-800 transition">
            Entre em contato para saber mais!
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;