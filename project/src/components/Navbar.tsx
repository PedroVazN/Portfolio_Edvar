import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navItems = [
    { name: 'Início', href: 'inicio' },
    { name: 'Sobre', href: 'sobre' },
    { name: 'Cadastrar Imóvel', href: '/add-property', isExternal: true },
    { name: 'Serviços', href: 'servicos' },
    { name: 'Depoimentos', href: 'depoimentos' },
    { name: 'Contato', href: 'contato' }
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
      }}
      transition={{ duration: 0.3 }}
      className="fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="https://corretoredvar.com.br" target="_blank" rel="noopener noreferrer">
              <img
                src="https://github.com/PedroVazN/Portfolio_Edvar/blob/main/project/src/images/logoedvar1.png?raw=true"
                className="w-32 md:w-48 lg:w-48 max-w-full h-auto"
                alt="Logo"
              />
            </a>
          </motion.div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group px-1"
              >
                {item.isExternal ? (
                  <a
                    href={item.href}
                    className="text-gray-700 px-4 py-2 rounded-lg transition-all duration-300
                             hover:text-blue-600 group-hover:bg-blue-50"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    smooth={true}
                    duration={500}
                    className="text-gray-700 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer
                             hover:text-blue-600 group-hover:bg-blue-50 flex items-center"
                  >
                    {item.name}
                  </Link>
                )}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100
                           transition-transform duration-300 origin-left"
                />
              </motion.div>
            ))}
            <a href='https://api.whatsapp.com/send/?phone=11947013673&text&type=phone_number&app_absent=0'>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
  
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2.5 rounded-lg
                       font-medium shadow-md hover:shadow-lg transition-all duration-300
                       hover:from-blue-700 hover:to-blue-900"
            >
              Agende uma Consulta
            </motion.button>
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:hidden flex items-center"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      className="block px-4 py-2.5 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600
                               transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      smooth={true}
                      duration={500}
                      className="block px-4 py-2.5 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600
                               transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                className="w-full mt-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg
                         font-medium shadow-md hover:shadow-lg transition-all duration-300
                         hover:from-blue-700 hover:to-blue-900"
              >
                Agende uma Consulta
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;