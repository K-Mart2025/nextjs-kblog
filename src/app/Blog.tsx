"use client"

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Eye, User } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const articles = articlesRef.current;

    if (!section || !articles) return;

    gsap.fromTo(
      articles.children,
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

  const blogPosts = [
    {
      id: 1,
      title: 'Los Secretos del Kimchi Perfecto',
      excerpt: 'Descubre la técnica tradicional para preparar el kimchi más auténtico en casa. Una guía completa paso a paso.',
      image: '/assets/blog/kimchi-coreano-receta-facil.png',
      author: 'Chef Kim',
      date: '15 Septiembre 2025',
      category: 'Recetas',
      readTime: '8 min',
      views: '2.1k'
    },
    {
      id: 2,
      title: 'Historia del K-Food: De Corea al Mundo',
      excerpt: 'Un viaje fascinante por la evolución de la cocina coreana y su impacto global en la cultura gastronómica.',
      image: '/assets/blog/Flag_of_South_Korea.svg.png',
      author: 'María González',
      date: '12 Septiembre 2025',
      category: 'Cultura',
      readTime: '12 min',
      views: '3.5k'
    },
    {
      id: 3,
      title: 'Guía Completa del Ramen Coreano',
      excerpt: 'Todo lo que necesitas saber sobre los diferentes tipos de ramen coreano y cómo prepararlos correctamente.',
      image: '/assets/blog/ramencompleto.jpg',
      author: 'Chef Park',
      date: '10 Septiembre 2025',
      category: 'Recetas',
      readTime: '6 min',
      views: '1.8k'
    },
    {
      id: 4,
      title: 'Beneficios Nutricionales de los Alimentos Fermentados',
      excerpt: 'Explora los increíbles beneficios para la salud de los alimentos fermentados tradicionales coreanos.',
      image: '/assets/blog/beneficios.webp',
      author: 'Dr. Lee',
      date: '8 Septiembre 2025',
      category: 'Salud',
      readTime: '10 min',
      views: '4.2k'
    }
  ];

  return (
    <section id="blog" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Blog Gastronómico
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sumérgete en el fascinante mundo de la gastronomía coreana con nuestros
            artículos, recetas y consejos de expertos.
          </p>
        </div>

        <div ref={articlesRef} className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Featured Article */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
            <div className="md:flex">
              <div className="md:w-1/2 relative overflow-hidden">
                <Image
                  width={752}
                  height={1127}
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Destacado
                  </span>
                </div>
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                    {blogPosts[0].category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye size={14} />
                    <span>{blogPosts[0].views}</span>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                  {blogPosts[0].title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{blogPosts[0].author}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{blogPosts[0].readTime} lectura</span>
                  </div>
                  <button className="text-red-600 hover:text-red-700 font-semibold flex items-center space-x-1 transition-colors">
                    <span>Leer más</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Regular Articles */}
          {blogPosts.slice(1).map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative overflow-hidden">
                <Image
                  width={734}
                  height={192}
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye size={14} />
                    <span>{post.views}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{post.author}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{post.readTime}</span>
                  </div>
                  <button className="text-red-600 hover:text-red-700 font-semibold flex items-center space-x-1 transition-colors">
                    <span>Leer</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg transition-colors duration-300 text-lg font-semibold">
            Ver Todos los Artículos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;