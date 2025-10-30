"use client";

import { PrettyText } from "@/components/PrettyText";
import { apiUrl } from "@/data/config";
import { PostRequest } from "@/types/posts";
import { useEffect, useState } from "react";
import { PostElements } from "./PostElements";

export const RenderPost = ({ id }: { id: string }) => {
  const [post, setPost] = useState<PostRequest>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPost = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const res = await fetch(`${apiUrl}/blogposts/client/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        if (typeof data.result.content === "string") {
          try {
            data.result.content = JSON.parse(data.result.content);
          } catch (e) {
            setError("Error parsing post content");
            setIsLoading(false);
            console.log(e)
            return;
          }
        }
        setPost(data.result);
        console.log(data);
        console.log(data.result);
      } catch (err) {
        if (err instanceof ReferenceError) {
          setError(err.message);
          console.error(err.message);
        }
        setError("Error obteniendo el post");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (isLoading) {
    return <PrettyText className="mt-20">Cargando... </PrettyText>;
  }

  if (error != "") {
    return <PrettyText className="mt-20">Ocurrió un error: {error}</PrettyText>;
  }

  if (!post?.content || post.content.length === 0) {
    return <PrettyText className="mt-20">No se encontró el post</PrettyText>;
  }

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <PostElements content={post.content} />
    </div>
  );
};
