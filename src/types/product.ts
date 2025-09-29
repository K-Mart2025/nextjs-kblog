import { RefObject } from "react";

interface defaultProductProps {
  name: string;
  price: number;
  description: string;
  ingredients: string;
  details: string;
}

interface Product {
  id: string;
  img?: string;
  thumb?: string;
  name: string;
  category: string;
  price: number;
  subtitle: string;
  description: string;
  ingredients: string;
  badge?: string;
}

type ProductComponentProps = {
  filteredProducts: Product[] | undefined
  gridRef?: RefObject<HTMLDivElement | null>
}

export type { defaultProductProps, Product, ProductComponentProps };
