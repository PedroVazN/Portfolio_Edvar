import React from 'react';
import { Award, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6
    }
  }
};

const About = () => {
  return (
    <section id="sobre" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://github.com/PedroVazN/Portfolio_Edvar/blob/main/project/src/images/edvarlogo2.png?raw=truewsd"
              alt="Edvar Profissional"
              className="rounded-lg shadow-xl w-full h-[600px] object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
          
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              Sobre Edvar Ferreira
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8"
            >
              Com mais de 7 anos de experiência no mercado imobiliário, nossa missão é proporcionar 
              as melhores soluções para nossos clientes, sempre com transparência, profissionalismo 
              e dedicação.
            </motion.p>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.2 }}
              className="space-y-6"
            >
              <motion.div
                variants={featureVariants}
                className="flex items-start group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-8 w-8 text-blue-900 mr-4"
                >
                  <Award className="w-full h-full" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                    Experiência Comprovada
                  </h3>
                  <p className="text-gray-600">
                    Anos de atuação no mercado com centenas de negócios realizados com sucesso.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                variants={featureVariants}
                className="flex items-start group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-8 w-8 text-blue-900 mr-4"
                >
                  <Shield className="w-full h-full" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                    Segurança e Confiança
                  </h3>
                  <p className="text-gray-600">
                    Processos transparentes e documentação sempre em conformidade com a legislação.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                variants={featureVariants}
                className="flex items-start group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-8 w-8 text-blue-900 mr-4"
                >
                  <Users className="w-full h-full" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                    Atendimento Personalizado
                  </h3>
                  <p className="text-gray-600">
                    Cada cliente recebe atenção exclusiva, com soluções adaptadas às suas necessidades.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;