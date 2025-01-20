import React from 'react';

const Hero = () => {
  return (
    <section id="inicio" className="pt-16">
      <div className="relative h-[90vh] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80")'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">
              Seu parceiro de confiança no mercado imobiliário
            </h1>
            <p className="text-xl mb-8">
              Soluções personalizadas para compra, venda e investimento em imóveis
            </p>
            <div className="space-x-4">
              <button className="bg-blue-900 text-white px-8 py-3 rounded-md hover:bg-blue-800 transition">
                Conheça Nossos Serviços
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-blue-900 transition">
                Fale Conosco
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;