import React from 'react';
import { Building, Users, Home, Award } from 'lucide-react';

const Stats = () => {
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">250+</div>
            <div className="text-blue-100">Imóveis Vendidos</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-blue-100">Clientes Satisfeitos</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl mb-4">
              <Home className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">100+</div>
            <div className="text-blue-100">Imóveis Disponíveis</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">7+</div>
            <div className="text-blue-100">Anos de Experiência</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;