"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Play } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    const text = textRef.current;
    const overlay = overlayRef.current;

    if (!hero || !video || !text || !overlay) return;

    // Initial animations
    gsap.set([text.children], { y: 100, opacity: 0 });

    const tl = gsap.timeline();
    tl.to(text.children, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.5,
    });

    // ScrollTrigger animations
    gsap.to(video, {
      scale: 1.1,
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(overlay, {
      opacity: 0.8,
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(text, {
      y: -100,
      opacity: 0,
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToLocation = () => {
    const locationSection = document.getElementById("location");
    if (locationSection) {
      locationSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover sm:object-center object-center"
        poster="/assets/blog/hero2.mp4"
        onCanPlay={() => {
          // Ensure muted is true programmatically and try play()
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {
              setTimeout(() => {
                videoRef.current?.play().catch(() => {});
              }, 2000); // retry after 2 seconds
            });
          }
        }}
      >
        <source src="/assets/blog/hero2.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div ref={textRef} className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            K Mart
          </h1>
          <p className="text-2xl md:text-3xl mb-4 font-light text-red-300">
            케이마트
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Descubre los auténticos sabores de Corea en el corazón de la ciudad.
            Productos frescos, ingredientes tradicionales y la mejor experiencia
            culinaria asiática.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 text-lg font-semibold">
              <Play size={20} />
              <span>Explorar Productos</span>
            </button>
            <button
              onClick={scrollToLocation}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg transition-all duration-300 text-lg font-semibold"
            >
              Ver Ubicación
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hover:text-red-300 transition-colors"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};
