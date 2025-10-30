"use client";

import { PrettyText } from "@/components/PrettyText";
import { apiUrl } from "@/data/config";
import { PostRequest } from "@/types/posts";
import { gsap } from "gsap";
import { ArrowRight, Calendar, Eye, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export const PostsCollection = ({
  searchParams,
}: {
  searchParams: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [posts, setPosts] = useState<PostRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Early return if no searchParams
    if (!searchParams) {
      setPosts([]);
      return;
    }

    async function fetchPosts() {
      try {
        setIsLoading(true);
        // TypeScript now knows searchParams is string here
        const encodedCategory = encodeURIComponent(searchParams);
        const res = await fetch(
          `${apiUrl}/blogposts/client?category=${encodedCategory}`
        );
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        data.result.forEach((post: PostRequest) => {
          if (typeof post.content === "string") {
            try {
              post.content = JSON.parse(post.content);
            } catch (e) {
              setError("Error parsing post content:" + e);
              setIsLoading(false);
            }
          }
        });
        setIsLoading(false);
        setPosts(data.result as PostRequest[]);
        return;
      } catch (e) {
        console.error(e);
        setPosts([]);
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [searchParams]);

  // GSAP animation on posts container children on posts or filtered posts update
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" }
      );
    }
  }, [posts, searchTerm]);

  // Filter posts by search term in title
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return <PrettyText>Cargando... </PrettyText>;
  }

  if (error) {
    return <PrettyText>Ocurrio un error! Intentalo más tarde </PrettyText>;
  }

  return (
    <section className="max-w-4xl mx-auto p-5">
      <input
        type="search"
        aria-label="Search posts by title"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={onSearchChange}
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div ref={containerRef} className="space-y-10">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative overflow-hidden">
                <Image
                  width={734}
                  height={192}
                  src={apiUrl + post.thumb}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {post.section}
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
                    <span>{post.visits}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{post.author}</span>
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
          ))
        ) : (
          <PrettyText>No posts found in this category.</PrettyText>
        )}
      </div>
    </section>
  );
};

export default PostsCollection;
