import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyInterest: '',
    message: '',
  });

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

  return (
    <section id="contato" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h2>
          <p className="text-xl text-gray-600">Estamos prontos para atender você</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="propertyInterest" className="block text-sm font-medium text-gray-700 mb-1">
                  Imóvel de Interesse ( código do imovel ou endereço )
                </label>
                <input
                  type="text"
                  id="propertyInterest"
                  value={formData.propertyInterest}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-blue-900 mr-4" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Telefone</h3>
                <p className="text-gray-600">(11) 94701-3673</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="h-6 w-6 text-blue-900 mr-4" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">E-mail</h3>
                <p className="text-gray-600">edvar@purimoveis.com.br</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-blue-900 mr-4" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Endereço</h3>
                <p className="text-gray-600">
                  Ipiranga - 
                  Alto do Ipiranga - 
                  Vila Mariana - 
                  Saúde - 
                  Cambuci - 
                  Sacomã - <br />
                  Entre todos grandes Bairros de São Paulo!!!
                  
                </p>
              </div>
            </div>

            <div className="h-64 w-full rounded-lg overflow-hidden">
              <iframe
                title="Localização"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.455968504006!2d-46.61196808502199!3d-23.582048984686556!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a3b847a9633%3A0xbce786debb9f94ab!2sIpiranga%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1645754562348!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
