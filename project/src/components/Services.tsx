import React from 'react';
import { Home, TrendingUp, Calculator, Key } from 'lucide-react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Home,
    title: 'Compra e Venda de Imóveis',
    description: 'Encontre o imóvel dos seus sonhos ou venda com segurança.'
  },
  {
    icon: TrendingUp,
    title: 'Consultoria de Investimentos',
    description: 'Maximize seus investimentos no mercado imobiliário.'
  },
  {
    icon: Calculator,
    title: 'Avaliação de Imóveis',
    description: 'Saiba o valor real do seu imóvel.'
  },
  {
    icon: Key,
    title: 'Locação',
    description: 'Alugue ou coloque seu imóvel para locação com facilidade.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Services = () => {
  return (
    <section id="servicos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
          <p className="text-xl text-gray-600">Soluções completas para todas as suas necessidades imobiliárias</p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="h-12 w-12 text-blue-900 mb-6" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link 
            to="contato" 
            smooth={true} 
            duration={800} 
            className="inline-block bg-blue-900 text-white px-8 py-3 rounded-md hover:bg-blue-800 transition-all duration-300 transform hover:scale-105"
          >
            Entre em Contato para Saber Mais
          </Link>   
        </motion.div>
      </div>
    </section>
  );
};

export default Services;