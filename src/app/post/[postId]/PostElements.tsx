import { apiUrl } from "@/data/config";
import { PostElement } from "@/types/posts";
import Image from "next/image";

export const PostElements = ({ content }: { content: PostElement[] }) => {
  return (
    <>
      {content.map((element) => {
        switch (element.type) {
          case "image":
            return <ImageElement key={element.id} element={element} />;
          case "title":
            return <TitleElement key={element.id} element={element} />;
          case "paragraph":
            return <ParagraphElement key={element.id} element={element} />;
          case "list":
            return <ListElement key={element.id} element={element} />;
          case "anchor":
            return <AnchorElement key={element.id} element={element} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export const ImageElement = ({ element }: { element: PostElement }) => {
  if (element.type !== "image") return null;
  return (
    <Image
      key={element.id}
      width={600}
      height={600}
      alt="Post Image"
      src={apiUrl + element.src}
    />
  );
};

export const TitleElement = ({ element }: { element: PostElement }) => {
  if (element.type !== "title") return null;
  return (
    <h2
      key={element.id}
      className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
    >
      {element?.content}
    </h2>
  );
};

export const ParagraphElement = ({ element }: { element: PostElement }) => {
  if (element.type !== "paragraph") return null;
  return (
    <p
      key={element.id}
      className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
    >
      {element?.content}
    </p>
  );
};

export const ListElement = ({ element }: { element: PostElement }) => {
  if (element.type !== "list") return null;
  return (
    <ol className="text-gray-600" key={element.id}>
      {element.items?.map((item, idx) => (
        <li
          className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          key={idx}
        >
          {item}
        </li>
      ))}
    </ol>
  );
};

export const AnchorElement = ({ element }: { element: PostElement }) => {
  if (element.type !== "anchor") return null;
  return (
    <a
      className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
      key={element.id}
      href={element.url}
    >
      {element?.content}
    </a>
  );
};
