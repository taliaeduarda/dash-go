import { api } from "../api";
import { useQuery } from "react-query";

type Product = {
    name: string;
    provider: string;
    code: number;
    category: string;
    price: string;
    amount: number;
    createdAt: string;
}

type GetProductsResponse = {
    totalCount: number;
    products: Product[];
}

export async function getProducts(page: number): Promise<GetProductsResponse> {
    const { data, headers } = await api.get("products", {
        params: {
            page,
        }
    });

    const totalCount = Number(headers['x-total-count'])

    const products = data.products.map(prod => {
        return {
            name: prod.name,
            code: prod.code,
            category: prod.category,
            price: prod.price,
            amount: prod.amount,
            provider: prod.provider,
            createdAt: new Date(prod.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return {
        products,
        totalCount
    }

}

export function useProducts(page: number) {
    return useQuery(["products", page], () => getProducts(page), {
        staleTime: 1000 * 60 * 10, // 10 minutes

    })
}