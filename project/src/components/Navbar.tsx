import React, { useState } from 'react';
import { Menu, X, Building2 } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img
              src="https://github.com/PedroVazN/Portfolio_Edvar/blob/main/project/src/images/logo.png?raw=true"
              className="w-32 md:w-48 lg:w-48 max-w-full h-auto mt-6 mb-4"
              alt="Logo"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-blue-900">Início</a>
            <a href="#sobre" className="text-gray-700 hover:text-blue-900">Sobre</a>
            <a href="/add-property" className="text-gray-700 hover:text-blue-900">Cadastrar Imóvel</a>
            <a href="#servicos" className="text-gray-700 hover:text-blue-900">Serviços</a>
            <a href="#depoimentos" className="text-gray-700 hover:text-blue-900">Depoimentos</a>
            <a href="#contato" className="text-gray-700 hover:text-blue-900">Contato</a>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">
              Agende uma Consulta
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#inicio" className="block px-3 py-2 text-gray-700 hover:text-blue-900">Início</a>
            <a href="#sobre" className="block px-3 py-2 text-gray-700 hover:text-blue-900">Sobre</a>
            <a href="#servicos" className="block px-3 py-2 text-gray-700 hover:text-blue-900">Serviços</a>
            <a href="#depoimentos" className="block px-3 py-2 text-gray-700 hover:text-blue-900">Depoimentos</a>
            <a href="#contato" className="block px-3 py-2 text-gray-700 hover:text-blue-900">Contato</a>
            <button className="w-full mt-2 bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">
              Agende uma Consulta
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;