"use client"

import ConfigContext from '@/contexts/ConfigContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, MessageCircle, Phone, Send, User } from 'lucide-react';
import React, { useContext, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const {config} = useContext(ConfigContext)

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;

    if (!section || !form) return;

    gsap.fromTo(
      form.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: 'Teléfono',
      info: config?.supportPhone,
      description: 'Llámanos durante horario comercial'
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email',
      info: config?.supportEmail,
      description: 'Te respondemos en 24 horas'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'WhatsApp',
      info: config?.orderPhone,
      description: 'Chat directo con nosotros'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Visitanos',
      info: 'Calle Principal 123',
      description: 'Vedado, La Habana, Cuba'
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contacto
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ¿Tienes alguna pregunta sobre nuestros productos o servicios? 
            Estamos aquí para ayudarte. Contáctanos de la forma que prefieras.
          </p>
        </div>

        <div ref={formRef}>
          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className="text-red-600 mb-4 flex justify-center">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-red-600 font-semibold mb-2">
                  {method.info}
                </p>
                <p className="text-gray-600 text-sm">
                  {method.description}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Envíanos un Mensaje
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Completa el formulario y nos pondremos en contacto contigo lo antes posible. 
                También puedes visitarnos directamente en nuestra tienda.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h4 className="font-bold text-gray-900 mb-3">⏰ Horarios de Atención</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Lunes - Viernes: 9:00 - 21:00</p>
                    <p>Sábado: 9:00 - 22:00</p>
                    <p>Domingo: 10:00 - 20:00</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h4 className="font-bold text-gray-900 mb-3">🚚 Entregas</h4>
                  <p className="text-sm text-gray-600">
                    Realizamos entregas en Madrid y área metropolitana. 
                    Consulta disponibilidad y tarifas.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="Tu nombre"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="+53 51-234-567"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Asunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="productos">Consulta sobre productos</option>
                      <option value="pedidos">Pedidos y entregas</option>
                      <option value="recetas">Recetas y consejos</option>
                      <option value="otros">Otros</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-lg font-semibold"
                >
                  <Send size={20} />
                  <span>Enviar Mensaje</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;