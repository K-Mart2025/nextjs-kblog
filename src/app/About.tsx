"use client"

import { features } from '@/data/about';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div ref={contentRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Conócenos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Somos más que un mercado, somos un puente cultural que conecta los sabores
              auténticos de Corea con tu paladar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className='relative w-full h-full'>
              <Image
                width={728}
                height={354}
                src="/assets/blog/aboutus.webp"
                alt="Interior del mercado coreano"
                className="rounded-2xl shadow-2xl object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Nuestra Historia
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Hemos marcado un antes y un después de los sabores coreanos más auténticos en Cuba.
                Comenzamos como un pequeño negocio con el sueño de compartir
                la rica cultura de Corea.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Hoy, somos reconocidos como el mercado coreano más completo de La Habana,
                ofreciendo desde bebidas hasta comidas directamente desde Seúl.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-red-600 mb-2">1+</div>
                  <div className="text-gray-600">Años de experiencia</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
                  <div className="text-gray-600">Productos únicos</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className="text-red-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};