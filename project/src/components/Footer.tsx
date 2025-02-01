import React from 'react';
import { Building2, Instagram, Linkedin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center mb-4">
              <span className="ml-3 text-2xl font-extrabold tracking-wide">Edvar Ferreira</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Seu parceiro de confiança no mercado imobiliário, oferecendo soluções personalizadas para cada cliente.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-indigo-500 inline-block">Links Rápidos</h3>
            <ul className="space-y-3">
              {['Início', 'Sobre', 'Serviços', 'Depoimentos', 'Contato'].map((item, index) => (
                <li key={index}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-indigo-400 transition duration-300 ease-in-out">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-indigo-500 inline-block">Contato</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-indigo-500" /> (11) 94701-3673
              </li>
              <li>edvar@corretoredvar.com.br</li>
              <li>
                Ipiranga, Alto do Ipiranga, Vila Mariana, Saúde, Cambuci, Sacomã <br />
                <span className="block mt-1">Entre todos grandes bairros de São Paulo!</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-indigo-500 inline-block">Redes Sociais</h3>
            <div className="flex space-x-5">
              <a href="https://www.instagram.com/corretor.edvar/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition transform hover:scale-110">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition transform hover:scale-110">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition transform hover:scale-110">
                <Phone className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          <p className="text-sm">© 2024 Corretor Edvar. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
