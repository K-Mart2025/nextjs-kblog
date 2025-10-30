import { Product } from "@/types/product";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

let cachedConfig: Product[];

export const fetchConfig = async () => {
  if (cachedConfig) return cachedConfig;

  const response = await fetch(`${apiUrl}/config/`);
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  const data = await response.json();
  cachedConfig = data;
  return data;
};
