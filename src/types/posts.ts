interface Post {
  author: string;
  subtitle: string;
  description: string;
  readTime: number;
  visits: number;
  title: string;
  id: string;
  thumb: string;
  name: string;
  section: string;
  tags: Tag[];
  createdAt: string;
  content: PostElement[];
  PostSEO: PostSEO;
}

interface Tag {
  name: string;
  color: string;
}

interface PostSEO {
  seoTitle: string;
  seoDescription: string;
  keywords: string;
}

type PostElement =
  | { id: string; type: "image"; src: string }
  | { id: string; type: "paragraph"; content: string }
  | { id: string; type: "anchor"; content: string; url: string }
  | { id: string; type: "list"; items: string[] }
  | { id: string; type: "title"; content: string };

interface PostRequest {
  author: string;
  subtitle: string;
  description: string;
  readTime: number;
  visits: number;
  section: string;
  tag: string;
  date: string;
  thumb: string;
  type: string;
  id: string;
  title: string;
  content: PostElement[];
}

export type { Post, PostElement, PostRequest, PostSEO, Tag };
