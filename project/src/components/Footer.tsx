import React from 'react';
import { Building2, Instagram, Linkedin, Phone, Mail, MapPin, Calendar, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img
                src="https://github.com/PedroVazN/Portfolio_Edvar/blob/main/project/src/images/favicon-16x16.png?raw=true"
                className="h-12 w-auto"
                alt="Edvar Corretor"
              />
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Há mais de 7 anos no mercado imobiliário, oferecendo soluções personalizadas e atendimento exclusivo para realizar o sonho da sua casa própria.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://www.instagram.com/corretor.edvar/" icon={<Instagram className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Linkedin className="h-5 w-5" />} />
              <SocialLink href="tel:+5511947013673" icon={<Phone className="h-5 w-5" />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Links Rápidos
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500" />
            </h3>
            <ul className="space-y-3">
              {[
                'Início',
                'Sobre',
                'Imóveis à Venda',
                'Imóveis para Locação',
                'Avaliação de Imóveis',
                'Contato'
              ].map((item) => (
                <li key={item} className="group flex items-center">
                  <ArrowRight className="h-4 w-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 mr-2" />
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Contato
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500" />
            </h3>
            <ul className="space-y-4">
              <ContactItem icon={<Phone className="h-5 w-5" />} href="tel:+5511947013673">
                (11) 94701-3673
              </ContactItem>
              <ContactItem icon={<Mail className="h-5 w-5" />} href="mailto:edvar@corretoredvar.com.br">
                edvar@corretoredvar.com.br
              </ContactItem>
              <ContactItem icon={<MapPin className="h-5 w-5" />}>
                <p>Atendimento em toda São Paulo:</p>
                <p className="text-gray-400 text-sm mt-1">
                  Ipiranga, Alto do Ipiranga, Vila Mariana, Saúde, Cambuci, Sacomã e região
                </p>
              </ContactItem>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Newsletter
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500" />
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Receba novidades sobre o mercado imobiliário e ofertas exclusivas.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-300"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Corretor Edvar. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gray-800 hover:bg-blue-600 p-2 rounded-lg transition-colors duration-300"
  >
    {icon}
  </a>
);

const ContactItem = ({ icon, children, href }: { icon: React.ReactNode; children: React.ReactNode; href?: string }) => {
  const content = (
    <div className="flex items-start">
      <span className="text-blue-500 mr-3">{icon}</span>
      <div className="flex-1">{children}</div>
    </div>
  );

  return href ? (
    <li>
      <a href={href} className="hover:text-blue-400 transition-colors duration-300">
        {content}
      </a>
    </li>
  ) : (
    <li>{content}</li>
  );
};

export default Footer;