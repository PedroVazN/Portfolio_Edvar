import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    setInitialLoad(false);

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

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
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
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={initialLoad ? { opacity: 0, x: -20 } : false}
            animate={initialLoad ? { opacity: 1, x: 0 } : false}
            transition={{ duration: 0.5 }}
          >
            <RouterLink to="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md">
              <motion.img
                src="https://github.com/PedroVazN/Portfolio_Edvar/blob/main/project/src/images/logoedvar1.png?raw=true"
                className="w-32 md:w-40 max-w-full h-auto object-contain"
                alt="Logo"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              />
            </RouterLink>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={initialLoad ? { opacity: 0, y: -20 } : false}
                animate={initialLoad ? { opacity: 1, y: 0 } : false}
                transition={initialLoad ? { duration: 0.5, delay: index * 0.1 } : {}}
                className="relative group px-1"
              >
                {item.isExternal ? (
                  <RouterLink
                    to={item.href}
                    className="text-gray-700 px-4 py-2 rounded-lg transition-all duration-300
                             hover:text-blue-600 group-hover:bg-blue-50 inline-flex items-center"
                  >
                    {item.name}
                  </RouterLink>
                ) : (
                  <ScrollLink
                    to={item.href}
                    smooth={true}
                    duration={800}
                    offset={-80}
                    className="text-gray-700 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer
                             hover:text-blue-600 group-hover:bg-blue-50 inline-flex items-center"
                  >
                    {item.name}
                  </ScrollLink>
                )}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 origin-left"
                  initial={false}
                  animate={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}

            <a 
              href='https://api.whatsapp.com/send/?phone=11947013673&text&type=phone_number&app_absent=0'
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                initial={initialLoad ? { opacity: 0, scale: 0.9 } : false}
                animate={initialLoad ? { opacity: 1, scale: 1 } : false}
                transition={initialLoad ? { duration: 0.5, delay: navItems.length * 0.1 } : {}}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg
                         font-medium shadow-md transition-all duration-300
                         hover:from-blue-700 hover:to-blue-800"
              >
                Agende uma Consulta
              </motion.button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={initialLoad ? { opacity: 0, scale: 0.9 } : false}
            animate={initialLoad ? { opacity: 1, scale: 1 } : false}
            transition={initialLoad ? { duration: 0.5 } : {}}
            className="md:hidden flex items-center"
          >
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(243, 244, 246, 1)" }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
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
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden overflow-hidden glass"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={menuItemVariants}
                  custom={index}
                >
                  {item.isExternal ? (
                    <RouterLink
                      to={item.href}
                      className="block px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600
                               transition-all duration-300 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </RouterLink>
                  ) : (
                    <ScrollLink
                      to={item.href}
                      smooth={true}
                      duration={800}
                      offset={-80}
                      className="block px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600
                               transition-all duration-300 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </ScrollLink>
                  )}
                </motion.div>
              ))}
              
              <motion.div variants={menuItemVariants}>
                <a 
                  href='https://api.whatsapp.com/send/?phone=11947013673&text&type=phone_number&app_absent=0'
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg
                             font-medium shadow-md hover:shadow-lg transition-all duration-300
                             hover:from-blue-700 hover:to-blue-800"
                  >
                    Agende uma Consulta
                  </motion.button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;