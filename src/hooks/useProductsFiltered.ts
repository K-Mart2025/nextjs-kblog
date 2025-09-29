import { useQuery } from "@tanstack/react-query";
import { getProductsFiltered } from "../services/query";
import { ProductFilters } from "../types/query";

export const useProductsFiltered = (filters: Partial<ProductFilters>) => {
  return useQuery({
    queryKey: ["query", filters],
    queryFn: getProductsFiltered,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
};
