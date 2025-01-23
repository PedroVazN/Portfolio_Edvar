import React from 'react';
import { Building2, Instagram, Linkedin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
    
              <span className="ml-2 text-xl font-bold">Edvar Ferreira</span>
            </div>
            <p className="text-gray-400">
              Seu parceiro de confiança no mercado imobiliário.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-gray-400 hover:text-white">Início</a></li>
              <li><a href="#sobre" className="text-gray-400 hover:text-white">Sobre</a></li>
              <li><a href="#servicos" className="text-gray-400 hover:text-white">Serviços</a></li>
              <li><a href="#depoimentos" className="text-gray-400 hover:text-white">Depoimentos</a></li>
              <li><a href="#contato" className="text-gray-400 hover:text-white">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">(11) 94701-3673</li>
              <li className="text-gray-400">edvar@corretoredvar.com.br</li>
              <li className="text-gray-400">
              Ipiranga - 
                  Alto do Ipiranga - 
                  Vila Mariana - 
                  Saúde - 
                  Cambuci - 
                  Sacomã - <br />
                  Entre todos grandes Bairros de São Paulo!!!
                  
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/corretor.edvar/" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Phone className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 Edvar Profissional. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;