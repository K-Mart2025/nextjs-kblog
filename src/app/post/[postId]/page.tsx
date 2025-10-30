import { apiUrl } from "@/data/config";
import { detectDeviceType, trackVisit } from "@/services/trackVisit";
import { Metadata } from "next";
import { headers } from "next/headers";
import { RenderPost } from "./RenderPost";

interface PageProps {
  params: { postId: string };
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function retrieveMetadata(
  { params }: Props,
): Promise<Metadata> {
  const slug = (await params).slug;

  // fetch post information
  const post = await fetch(`${apiUrl}/blogposts/client/${slug}`).then((res) =>
    res.json()
  );

  return {
    title: post.PostSEO.title,
    description: post.PostSEO.description,
    keywords: post.PostSEO.keywords,
  };
}

export default async function App({ params }: PageProps) {
  const { postId } = await params;
  
  const headersList = await headers();
  const host = headersList.get("host");
  const userAgent = headersList.get("user-agent") || "";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const deviceType = detectDeviceType(userAgent);
  const page = `${protocol}://${host}/posts/${postId}`;

  await trackVisit(page, deviceType);


  return <RenderPost id={postId}/>;
}
