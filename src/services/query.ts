import { QueryFunction } from "@tanstack/react-query";
import { ApiResponse, ProductFilters, QueryResult } from "../types/query";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProductsFiltered: QueryFunction<
  QueryResult,
  ["query", ProductFilters],
  number
> = async ({ pageParam = 1, queryKey }) => {
  const [_, filters] = queryKey;
  const params = new URLSearchParams({
    page: pageParam.toString(),

    ...(filters.name && { name: filters.name }),
    ...(filters.category && { category: filters.category }),
    ...(filters.price !== undefined && { price: filters.price.toString() }),
    ...(filters.prevPrice !== undefined && { prevPrice: filters.prevPrice.toString() }),
    ...(filters.visits !== undefined && { visits: filters.visits.toString() }),
    ...(filters.new !== undefined && { sortBy: "createdAt" }),
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