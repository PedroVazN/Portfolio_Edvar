import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="inicio" className="pt-16">
      <div className="relative h-[90vh] bg-cover bg-center" style={{
        backgroundImage: 'url("https://wallpapers.com/images/hd/small-luxury-house-4k-hd-oj9nyozvh7a9xbh2.jpg")'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-black"
        />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-bold mb-4"
            >
              Seu parceiro de confiança no mercado imobiliário
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl mb-8"
            >
              Soluções personalizadas para compra, venda e investimento em imóveis
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-x-4"
            >
              <Link 
                to="depoimentos" 
                smooth={true} 
                duration={800} 
                className="inline-block bg-blue-900 text-white px-8 py-3 rounded-md hover:bg-blue-800 transition-all duration-300 transform hover:scale-105"
              >
                Conheça Nossos Serviços
              </Link>
              <Link 
                to="contato" 
                smooth={true}  
                duration={800} 
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105"
              >
                Fale Conosco
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;