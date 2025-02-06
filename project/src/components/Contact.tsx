import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyInterest: '',
    message: '',
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:edvar@edvarcorretor.com.br?subject=Interesse%20em%20Imóvel&body=
      Nome: ${formData.name}%0D%0A
      Email: ${formData.email}%0D%0A
      Telefone: ${formData.phone}%0D%0A
      Imóvel de Interesse: ${formData.propertyInterest}%0D%0A
      Mensagem: ${formData.message}`;

    window.location.href = mailtoLink;
  };

  const InputField = ({ label, id, type = "text", ...props }: any) => (
    <motion.div variants={itemVariants}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...props}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
      />
    </motion.div>
  );

  return (
    <section id="contato" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h2>
          <p className="text-xl text-gray-600">Estamos prontos para atender você</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <InputField
                label="Nome Completo"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <InputField
                label="E-mail"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <InputField
                label="Telefone"
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <InputField
                label="Imóvel de Interesse (código do imóvel ou endereço)"
                id="propertyInterest"
                value={formData.propertyInterest}
                onChange={handleChange}
                required
              />

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
                ></textarea>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
              >
                Enviar Mensagem
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="space-y-8"
          >
            {[
              {
                icon: Phone,
                title: "Telefone",
                content: "(11) 94701-3673",
                href: "tel:+5511947013673"
              },
              {
                icon: Mail,
                title: "E-mail",
                content: "edvar@corretoredvar.com.br",
                href: "mailto:edvar@corretoredvar.com.br"
              },
              {
                icon: MapPin,
                title: "Regiões Atendidas",
                content: "Ipiranga, Alto do Ipiranga, Vila Mariana, Saúde, Cambuci, Sacomã e todos os grandes Bairros de São Paulo!"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="flex items-start p-6 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg transition-all duration-200"
              >
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <item.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-gray-600 hover:text-blue-600 transition-colors">
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-gray-600">{item.content}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div
              variants={itemVariants}
              className="h-80 w-full rounded-2xl overflow-hidden shadow-xl"
            >
              <iframe
                title="Localização"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.455968504006!2d-46.61196808502199!3d-23.582048984686556!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a3b847a9633%3A0xbce786debb9f94ab!2sIpiranga%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1645754562348!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;