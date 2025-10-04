import { apiUrl } from "@/data/config";
import { ApiResponse, ProductFilters } from "../types/query";

export const getProductsFiltered = async (filters:ProductFilters) => {
    const params = new URLSearchParams({
      ...(filters.name && { name: filters.name }),
      ...(filters.category && { category: filters.category }),
      ...(filters.price !== undefined && { price: filters.price.toString() }),
      ...(filters.prevPrice !== undefined && { prevPrice: filters.prevPrice.toString() }),
      ...(filters.badge && { badge: filters.badge }),
      ...(filters.sortBy && { sortBy: filters.sortBy }),
      ...(filters.sortDirection && { sortDirection: filters.sortDirection }),
    });
    const url = `${apiUrl}/api/client/?${params.toString()}`
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error en la petición");
    }

    const data: ApiResponse = await response.json();
    return {
      products: data.result,
      nextCursor: Number(data.nextCursor),
      hasMore: data.hasMore,
    };
  };  