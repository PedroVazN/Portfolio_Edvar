import React from 'react';
import { Home, TrendingUp, Calculator, Key } from 'lucide-react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Home,
    title: 'Compra e Venda de Imóveis',
    description: 'Encontre o imóvel dos seus sonhos ou venda com segurança e tranquilidade.',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: TrendingUp,
    title: 'Consultoria de Investimentos',
    description: 'Maximize seus investimentos no mercado imobiliário com nossa expertise.',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    icon: Calculator,
    title: 'Avaliação de Imóveis',
    description: 'Avaliação profissional e precisa do valor real do seu imóvel.',
    gradient: 'from-green-500 to-green-600'
  },
  {
    icon: Key,
    title: 'Locação',
    description: 'Processo simplificado e seguro para alugar ou disponibilizar seu imóvel.',
    gradient: 'from-orange-500 to-orange-600'
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
    <section id="servicos" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluções completas e personalizadas para todas as suas necessidades imobiliárias
          </p>
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
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="p-8">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient}`} />
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-16 h-16 rounded-lg bg-gradient-to-r ${service.gradient} 
                              flex items-center justify-center mb-6 transform group-hover:rotate-6 
                              transition-transform duration-300`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
                <div className={`h-1 w-full bg-gradient-to-r ${service.gradient} transform scale-x-0 
                                group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link 
            to="contato" 
            smooth={true} 
            duration={800}
            className="inline-block"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-10 py-4 rounded-lg
                         font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Entre em Contato para Saber Mais
            </motion.button>
          </Link>   
        </motion.div>
      </div>
    </section>
  );
};

export default Services;