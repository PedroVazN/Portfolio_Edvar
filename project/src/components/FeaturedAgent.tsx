import React from 'react';
import { Phone, Mail, MapPin, Award, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturedAgent = () => {
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
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Edvar Ferreira
              </h2>
              <p className="text-xl text-blue-600 font-medium">
                Especialista em Imóveis em São Paulo
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="prose prose-lg text-gray-600"
            >
              <p>
                Com mais de 7 anos de experiência no mercado imobiliário de São Paulo,
                ofereço um serviço personalizado e profissional para encontrar o imóvel
                ideal para você e sua família.
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Award, title: "CRECI", value: "219452" },
                { icon: Clock, title: "Experiência", value: "7+ anos" },
                { icon: Users, title: "Clientes", value: "10000+ atendidos" },
                { icon: MapPin, title: "Região", value: "Ipiranga, SP" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3"
                >
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-gray-600">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/5511947013673"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
              >
                <Phone className="w-5 h-5 mr-2" />
                (11) 94701-3673
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:edvar@corretoredvar.com.br"
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-lg text-blue-600 hover:bg-blue-50 transition shadow-lg hover:shadow-xl"
              >
                <Mail className="w-5 h-5 mr-2" />
                Enviar E-mail
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src="https://github.com/PedroVazN/Portfolio_Edvar/blob/main/project/src/images/edvarlogo2.png?raw=truewsd"
                alt="Edvar Santos - Corretor de Imóveis"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl"
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <motion.img
                      key={i}
                      whileHover={{ scale: 1.2, zIndex: 1 }}
                      className="w-8 h-8 rounded-full border-2 border-white relative"
                      src={`https://i.pravatar.cc/150?img=${i + 10}`}
                      alt="Cliente satisfeito"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-medium text-gray-900">32 avaliações</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedAgent;