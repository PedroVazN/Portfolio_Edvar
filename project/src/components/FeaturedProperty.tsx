import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Train, Bike, Car, Leaf, Shield, Calculator as Elevator, Package, Wind, MapPin, Building, ArrowRight } from 'lucide-react';

const FeaturedProperty = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const highlights = [
    { icon: Bike, text: "Vagas de bicicleta para todas as unidades", color: "text-emerald-600" },
    { icon: Shield, text: "Segurança perimetral 24h", color: "text-blue-600" },
    { icon: Car, text: "63 vagas vinculadas às unidades", color: "text-indigo-600" },
    { icon: Package, text: "Área de delivery com geladeira", color: "text-purple-600" },
    { icon: Elevator, text: "6 elevadores exclusivos", color: "text-pink-600" },
    { icon: Wind, text: "Infraestrutura para ar-condicionado", color: "text-orange-600" }
  ];

  const sustainabilityFeatures = [
    "Água de reuso para jardim",
    "Bacias com sistema dual flush",
    "Torneiras com arejador",
    "Infraestrutura para placas solares",
    "Sensores de presença"
  ];

  const nearbyPlaces = [
    { place: "Metrô Sacomã", distance: "240m", time: "1 min", icon: Train },
    { place: "Universidade São Camilo", time: "7 min", icon: Building },
    { place: "Academia Smart Fit", time: "1 min", icon: Building },
    { place: "Parque da Independência", time: "10 min", icon: Leaf },
    { place: "Hospital São Camilo", time: "12 min", icon: Building },
    { place: "Hirota Supermercado", time: "8 min", icon: Package }
  ];

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div 
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
            Lançamento Exclusivo
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={itemVariants}
            className="relative aspect-square"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-900/10">
              <img
                src="https://versosipiranga.com.br/imgs/torre.jpg"
                alt="Versos Ipiranga"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                Versos Ipiranga
              </h1>
              <div className="flex items-center text-gray-600 space-x-3 bg-gray-50 px-4 py-2 rounded-lg w-fit">
                <MapPin className="w-5 h-5 text-blue-600" />
                <p className="font-medium">Rua Júlia Cortines, 95 - Ipiranga</p>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-3"
            >
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0`} />
                  <p className="text-sm font-medium text-gray-700">{item.text}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Leaf className="w-5 h-5 mr-2 text-green-600" />
                Compromisso com Sustentabilidade
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {sustainabilityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <p className="text-sm font-medium text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Localização Privilegiada
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <place.icon className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{place.place}</p>
                      <p className="text-sm text-blue-600">{place.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                onClick={() => navigate('/versos-ipiranga')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg
                         font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300
                         shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
              >
                <span>Conhecer o Empreendimento</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedProperty;