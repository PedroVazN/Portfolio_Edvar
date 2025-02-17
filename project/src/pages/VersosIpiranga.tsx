import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Car, Ruler, Sun, Trees as Tree, Shield, Bike, Package, Wind, Leaf, Phone, Calendar} from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';

const VersosIpiranga = () => {
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

  const unitTypes = [
    {
      type: "1 Dormitório",
      area: "A partir de 35m,19²",
      features: ["Sem Vaga", "Infraestrutura para Ar Condicionado"],
      floorPlan: "https://versosipiranga.com.br/imgs/plantas/35m2.jpg"
    },
    {
      type: "2 Dormitórios",
      area: "A partir de 45,78m²",
      features: ["1 Vaga de Bicicleta", "Infraestrutura para Ar Condicionado", "Vaga de Garagem"],
      floorPlan: "https://versosipiranga.com.br/imgs/plantas/45m.jpg"
    },
    {
      type: "3 Dormitórios",
      area: "A partir de 59,35m²",
      features: ["2 Vagas de Bicicleta", "Infraestrutura para Ar Condicionado", "Vaga de Garagem"],
      floorPlan: "https://versosipiranga.com.br/imgs/plantas/59m.jpg"
    }
  ];

  const propertyImages = [
    "https://www.versosipiranga.com/imgs/perspectivas/1.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/2m.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/3m.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/4m.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/5m.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/6m.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/7m.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/8m.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/9m.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/10m.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/11m.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/12m.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/13m.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/14m.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/16m.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/15m.jpg",
    "https://www.versosipiranga.com/imgs/perspectivas/17m.jpg"
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://versosipiranga.com.br/imgs/3d-perspectiva.jpg")',
            opacity: 0.7
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16">
          <motion.div variants={itemVariants} className="text-white">
            <h1 className="text-5xl font-bold mb-4">Versos Ipiranga</h1>
            <div className="flex items-center space-x-4 text-lg">
              <MapPin className="w-5 h-5" />
              <span>Rua Júlia Cortines, 95 - Ipiranga, São Paulo</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Carousel */}
      <motion.div 
        variants={itemVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8"
      >
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Galeria de Imagens</h2>
          <ImageCarousel images={propertyImages} />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Unit Types */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Tipos de Unidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {unitTypes.map((unit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={unit.floorPlan} 
                      alt={`Planta ${unit.type}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <Bed className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-semibold">{unit.type}</h3>
                    </div>
                    <p className="text-gray-600 flex items-center">
                      <Ruler className="w-4 h-4 mr-2" />
                      {unit.area}
                    </p>
                    <ul className="space-y-2">
                      {unit.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sustainability Features */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Leaf className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Sustentabilidade</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Sun className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Energia Solar</h3>
                      <p className="text-sm text-gray-600">Infraestrutura para instalação de placas solares</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Tree className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Água de Reuso</h3>
                      <p className="text-sm text-gray-600">Sistema de reaproveitamento para jardins</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Wind className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Eficiência Energética</h3>
                      <p className="text-sm text-gray-600">Sensores de presença em áreas comuns</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Bath className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Economia de Água</h3>
                      <p className="text-sm text-gray-600">Torneiras com arejador e bacias dual flush</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6" />
                    <div>
                      <p className="text-sm opacity-90">Entre em contato</p>
              
                    </div>
                  </div>
                </div>
                <a
                  href='https://api.whatsapp.com/send/?phone=11947013673&text&type=phone_number&app_absent=0'
                  className="w-full py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Agendar Visita</span>
                </a>
              </div>
              </div>

            {/* Additional Features */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">Diferenciais</h3>
              <div className="space-y-3">
                {[
                  { icon: Shield, text: "Segurança 24h" },
                  { icon: Bike, text: "Bicicletário" },
                  { icon: Car, text: "63 vagas de garagem" },
                  { icon: Package, text: "Área de delivery" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default VersosIpiranga;