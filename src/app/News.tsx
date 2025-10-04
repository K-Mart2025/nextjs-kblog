"use client"

import { newsItems } from '@/data/news';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Zap } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const News = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const news = newsRef.current;

    if (!section || !news) return;

    gsap.fromTo(
      news.children,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Productos': return 'bg-blue-100 text-blue-600';
      case 'Eventos': return 'bg-green-100 text-green-600';
      case 'Ofertas': return 'bg-red-100 text-red-600';
      case 'Servicios': return 'bg-purple-100 text-purple-600';
      case 'Colaboraciones': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') {
      return <Zap className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  return (
    <section id="news" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Noticias y Novedades
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mantente al día con las últimas novedades, productos, eventos y ofertas especiales
            de Korean Market. No te pierdas nada de lo que está pasando.
          </p>
        </div>

        <div ref={newsRef} className="space-y-8">
          {/* Featured News */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="md:flex">
              <div className="md:w-2/3 p-8 md:p-12 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-6 h-6 text-yellow-300" />
                  <span className="bg-yellow-400 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                    ¡DESTACADO!
                  </span>
                  <span className="text-red-200">•</span>
                  <span className="text-red-200">{newsItems[0].date}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  {newsItems[0].title}
                </h3>
                <p className="text-red-100 text-lg mb-6 leading-relaxed">
                  {newsItems[0].content}
                </p>
                <button className="bg-white text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg transition-colors font-semibold flex items-center space-x-2">
                  <span>Leer más</span>
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="md:w-1/3">
                <Image
                  width={500}
                  height={700}
                  src={newsItems[0].image}
                  alt={newsItems[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Regular News */}
          <div className="grid md:grid-cols-2 gap-8">
            {newsItems.slice(1).map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    width={734}
                    height={192}
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    {getPriorityIcon(item.priority)}
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={14} className="mr-2" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.content}
                  </p>
                  <button className="text-red-600 hover:text-red-700 font-semibold flex items-center space-x-1 transition-colors">
                    <span>Leer completo</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          {/* <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              ¿No quieres perderte nada?
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
              Suscríbete a nuestro boletín y recibe las últimas noticias, ofertas exclusivas 
              y consejos culinarios directamente en tu email.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold">
                Suscribirse
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              No spam. Solo las mejores noticias y ofertas.
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default News;