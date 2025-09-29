"use client"

import ConfigContext from '@/contexts/ConfigContext';
import { quickLinks, categories, socialLinks } from '@/data/footer';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useContext } from 'react';

const Footer = () => {
  const { config } = useContext(ConfigContext)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">K Mart</h3>
                <p className="text-sm text-gray-400">케이마트</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Tu mercado de confianza. 
              Acercando los sabores de Corea.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin size={16} className="text-red-400" />
                <span className="text-sm">Vedado Habana, Cuba</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={16} className="text-red-400" />
                <span className="text-sm">{config?.supportPhone}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail size={16} className="text-red-400" />
                <span className="text-sm">{config?.supportEmail}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-6">Categorías</h4>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((category, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-200 text-sm">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h4 className="text-lg font-bold mb-6">Horarios</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-red-400" />
                <div className="text-sm">
                  <div className="text-gray-300">Lun - Vie: 9:00 - 21:00</div>
                  <div className="text-gray-300">Sáb: 9:00 - 22:00</div>
                  <div className="text-gray-300">Dom: 10:00 - 20:00</div>
                </div>
              </div>
            </div>
            
            <h4 className="text-lg font-bold mb-4">Síguenos</h4>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="text-center">
            <h4 className="text-xl font-bold mb-4">Mantente informado</h4>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Suscríbete a nuestro boletín para recibir las últimas noticias, 
              ofertas especiales y consejos culinarios.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 K Mart. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                Términos de Servicio
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;