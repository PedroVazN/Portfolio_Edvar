import React from 'react';
import { Award, Shield, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="sobre" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://github.com/PedroVazN/Portfolio_Edvar/blob/main/image%20(1).png?raw=true"
              alt="Edvar Profissional"
              className="rounded-lg shadow-xl w-full h-[600px] object-cover"
            />
          </div>
          
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Sobre Edvar Profissional</h2>
            <p className="text-lg text-gray-600 mb-8">
              Com mais de 15 anos de experiência no mercado imobiliário, nossa missão é proporcionar 
              as melhores soluções para nossos clientes, sempre com transparência, profissionalismo 
              e dedicação.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Award className="h-8 w-8 text-blue-900 mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Experiência Comprovada</h3>
                  <p className="text-gray-600">
                    Anos de atuação no mercado com centenas de negócios realizados com sucesso.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="h-8 w-8 text-blue-900 mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Segurança e Confiança</h3>
                  <p className="text-gray-600">
                    Processos transparentes e documentação sempre em conformidade com a legislação.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="h-8 w-8 text-blue-900 mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Atendimento Personalizado</h3>
                  <p className="text-gray-600">
                    Cada cliente recebe atenção exclusiva, com soluções adaptadas às suas necessidades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;