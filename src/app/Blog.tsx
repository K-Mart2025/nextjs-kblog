"use client";

import { PrettyText } from "@/components/PrettyText";
import { apiUrl } from "@/data/config";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, Eye, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);
  const blogPosts = useBlogPosts();

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
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  if (!Array.isArray(blogPosts) || blogPosts.length === 0) {
    return (
      <section id="blog" ref={sectionRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <PrettyText>Cargando Posts...</PrettyText>
        </div>
      </section>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <section id="blog" ref={sectionRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p>No hay artículos disponibles en este momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Blog Gastronómico
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sumérgete en el fascinante mundo de la gastronomía coreana con
            nuestros artículos, recetas y consejos de expertos.
          </p>
        </div>
        {blogPosts && (
          <div ref={articlesRef} className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Featured Article */}
            <div className="md:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="md:flex">
                <div className="md:w-1/2 relative overflow-hidden">
                  <Image
                    width={752}
                    height={1127}
                    src={apiUrl  + blogPosts[0].thumb}
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
                    <span className={`text-white px-3 py-1 rounded-full`} style={{ backgroundColor: blogPosts[0].tags[0].color }}>
                      {blogPosts[0].tags[0].name}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{blogPosts[0].createdAt.slice(0,10)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye size={14} />
                      <span>{blogPosts[0].visits}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {blogPosts[0].PostSEO.seoDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {blogPosts[0].author}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">
                        {blogPosts[0].readTime} min
                      </span>
                    </div>
                    <a
                      href={"/post/" + blogPosts[0].id}
                      className="text-red-600 hover:text-red-700 font-semibold flex items-center space-x-1 transition-colors"
                    >
                      <span>Leer más</span>
                      <ArrowRight size={16} />
                    </a>
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
                    src={apiUrl  + post.thumb}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-white px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: post.tags[0].color }}>
                      {post.tags[0].name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{post.createdAt.slice(0,10)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye size={14} />
                      <span>{post.visits}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.PostSEO.seoDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {post.author}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">
                        {post.readTime} min
                      </span>
                    </div>
                    <Link
                      href={"/post/" + post.id}
                      className="text-red-600 hover:text-red-700 font-semibold flex items-center space-x-1 transition-colors"
                    >
                      <span>Leer</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            href="/post?category=blog"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg transition-colors duration-300 text-lg font-semibold"
          >
            Ver Todos los Artículos
          </Link>
        </div>
      </div>
    </section>
  );
};
