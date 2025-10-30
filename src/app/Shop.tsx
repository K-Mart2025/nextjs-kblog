"use client"

import { useProductsFiltered } from '@/hooks/useProductsFiltered';
import { ProductFilters } from '@/types/query';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';

gsap.registerPlugin(ScrollTrigger);

const getFilter = (category: string): Partial<ProductFilters> => {
  if (category === "Nuevo") {
    return { sortBy: "createdAt", sortDirection: "desc" }
  } else if (category === "Popular") {
    return { sortBy: "visits", sortDirection: "desc" }
  } else if (category === "Descuento") {
    return { badge: "Descuento" }
  } else {
    throw Error
  }
}

const categories = ["Nuevo", "Descuento", "Popular"]

export const Shop = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('Nuevo');
  const [filter, setFilter] = useState<Partial<ProductFilters>>({})

  const data = useProductsFiltered(filter);

  useEffect(() => {

    const section = sectionRef.current;
    const grid = gridRef.current;

    if (!section || !grid) return;

    gsap.fromTo(
      grid.children,
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [selectedCategory]);

  useEffect(() => {
    try {
      if (categories && categories.length > 0 && selectedCategory === 'all') {
        setSelectedCategory(categories[0]);
        return;
      }
      const nextFilter = getFilter(selectedCategory);

      setFilter((currentFilter) => {
        const isSameFilter = Object.entries(nextFilter).every(
          ([key, value]) => currentFilter[key as keyof ProductFilters] === value
        );
        if (!isSameFilter) {
          return nextFilter;
        }
        return currentFilter;
      });
    } catch (error) {
      console.error('Failed to get filter:', error);
    }
  }, [selectedCategory]);

  if (!data) return <div>Loading...</div>;

  return (
    <section id="shop" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tienda Online
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubre nuestra selección curada de productos auténticos coreanos.
            Desde ingredientes esenciales hasta delicias gourmet.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories && categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${selectedCategory === category
                ? 'bg-red-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {data &&
          <ProductsGrid filteredProducts={data} gridRef={gridRef} />
        }

        <div className="text-center mt-12">
          <button className="bg-red-600 hover:bg-red-800 text-white px-8 py-4 rounded-lg transition-colors duration-300 text-lg font-semibold">
            Ver Catálogo Completo
          </button>
        </div>
      </div>
    </section>
  );
};