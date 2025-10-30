
import { Post } from "@/types/posts";
import { CategoryResponse } from "../types/query";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Get all Posts
export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(
    `${apiUrl}/blog`
  );

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  return await response.json();
};

export const getBlogPosts = async (): Promise<Post[]> => {
  const response = await fetch(
    `${apiUrl}/blogposts/client/?category=blog`
  );
  const data = await response.json()
  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  return data.result;
};


export const getNewsPosts = async (): Promise<Post[]> => {
  const response = await fetch(
    `${apiUrl}/blogposts/client/?category=news`
  );
  const data = await response.json()
  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  return data.result;
};

// Get unique product
export const getSinglePost = async (postId: string) => {
  try {
    const response = await fetch(`${apiUrl}/blogposts/client/${postId}`);
    if (!response.ok) throw new Error("Request failed");
    const data = await response.json();
    return data.result || "";
  } catch (error) {
    console.error("Error en la peticion:", error);
    return "";
  }
};

export const getTags = async (
  requireTags = "false"
): Promise<Array<string>> => {
  try {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(
      `${apiURL}/blogposts/blog/?requireTags=${requireTags}`
    );
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data = await response.json();
    const result: CategoryResponse = data.result;
    return result || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

