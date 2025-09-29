import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product";

export const useProductsSection = (category: string) => {
    return useQuery({
        queryKey: ["products", category],
        queryFn: getProducts,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1,
        retryDelay: 1000,
      });
}