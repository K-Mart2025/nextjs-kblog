import { getProductsFiltered } from "@/services/query";
import { Product } from "@/types/product";
import { ProductFilters } from "@/types/query";
import { useEffect, useState } from "react";

export const useProductsFiltered = (filters: ProductFilters): Product[] | null => {
    const [products, setProducts] = useState<Product[] | null>(null);
    useEffect(() => {
        let isMounted = true;

        async function loadConfig() {
            try {
                const data = await getProductsFiltered(filters);
                if (isMounted) setProducts(data.products);
            } catch (error) {
                console.error(error);
            }
        }

        loadConfig();

        return () => {
            isMounted = false;
        }
    }, [filters]);

    return products;
};
