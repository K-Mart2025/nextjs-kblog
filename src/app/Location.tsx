"use client"

import ConfigContext from "@/contexts/ConfigContext";
import { hours } from "@/data/location";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, MapPin, Phone } from "lucide-react";
import { useContext, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Location = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { config } = useContext(ConfigContext);

  const time = new Date().getHours();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    gsap.fromTo(
      content.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

 

  return (
    <section id="location" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div ref={contentRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Dónde encontrarnos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Visítanos frente al parqueo del Calixto. Fácil acceso en
              transporte público y aparcamiento gratuito disponible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Map Section */}
            <div className="relative">
              <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-w-16 aspect-h-12">
                  <div className="w-full h-96 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <MapPin size={48} className="mx-auto mb-4 text-red-600" />
                      <p className="text-lg font-semibold">Mapa Interactivo</p>
                      <p className="text-sm">Calle Principal 123, Centro</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
                <div className="flex items-center space-x-2 text-red-600 font-semibold">
                  <MapPin size={16} />
                  <span>K-Mart</span>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              {/* Address */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <div className="flex items-start space-x-4 mb-6">
                  <MapPin className="w-8 h-8 text-red-600 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Dirección
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Calle Principal 123
                      <br />
                      La Habana, Cuba
                    </p>
                  </div>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold">
                  Ver en Google Maps
                </button>
              </div>

              {/* Hours */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <div className="flex items-center space-x-4 mb-6">
                  <Clock className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Horarios</h3>
                </div>
                <div className="space-y-3">
                  {hours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                    >
                      <span className="text-gray-700 font-medium">
                        {schedule.day}
                      </span>
                      <span className="text-gray-900 font-bold">
                        {schedule.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-green-100 rounded-lg">
                  <p className="text-green-800 font-medium">
                    {time > 8 && time < 19
                      ? "🟢 Abierto ahora"
                      : "🔴 Cerrado ahora"}
                  </p>
                  <p className="text-green-600 text-sm">Cierra a las 19:00</p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <div className="flex items-center space-x-4 mb-6">
                  <Phone className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Contacto</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{config?.supportPhone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{config?.supportEmail}</span>
                  </div>
                </div>
                <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold w-full">
                  Llamar Ahora
                </button>
              </div>
            </div>
          </div>

          {/* Transport Options */}
          {/*
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Cómo Llegar
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {transportOptions.map((option, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-red-600 mb-4 flex justify-center">
                    {option.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {option.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Location;
