import React from 'react';
import { Phone, Mail, MapPin, Award, Clock, Users } from 'lucide-react';

const FeaturedAgent = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Edvar Ferreira
              </h2>
              <p className="text-xl text-blue-600 font-medium">
                Especialista em Imóveis no Ipiranga
              </p>
            </div>

            <div className="prose prose-lg text-gray-600">
              <p>
                Com mais de 7 anos de experiência no mercado imobiliário do Ipiranga,
                ofereço um serviço personalizado e profissional para encontrar o imóvel
                ideal para você e sua família.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">CRECI</p>
                  <p className="text-gray-600">219452</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Experiência</p>
                  <p className="text-gray-600">7+ anos</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Clientes</p>
                  <p className="text-gray-600">500+ atendidos</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Região</p>
                  <p className="text-gray-600">Ipiranga, SP</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/5511947013673"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                <Phone className="w-5 h-5 mr-2" />
                (11) 94701-3673
              </a>
              <a
                href="mailto:edvar@corretoredvar.com.br"
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-lg text-blue-600 hover:bg-blue-50 transition"
              >
                <Mail className="w-5 h-5 mr-2" />
                Enviar E-mail
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://github.com/PedroVazN/Portfolio_Edvar/blob/main/project/src/images/edvarlogo2.png?raw=truewsd"
                alt="Edvar Santos - Corretor de Imóveis"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <img
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white"
                      src={`https://i.pravatar.cc/150?img=${i + 10}`}
                      alt="Cliente satisfeito"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-medium text-gray-900">32 avaliações</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAgent;