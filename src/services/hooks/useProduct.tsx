import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../api";

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

interface ProductProviderProps {
    children: ReactNode;
}

interface UpdateProductAmount {
    productCode: number;
    amount: number;
}

interface ProductContextData {
    products: Product[];
    addProduct: (productCode: number) => Promise<void>;
    removeProduct: (productCode: number) => void;
    updateProductAmount: ({ productCode, amount }: UpdateProductAmount) => void;
}

const ProductContext = createContext<ProductContextData>({} as ProductContextData);

export function ProductProvider({ children }: ProductProviderProps) {
    const [products, setProducts] = useState<Product[]>(() => {
        const storagedInventory = localStorage.getItem("@JamesTipDash:inventory");

        if (storagedInventory) {
            return JSON.parse(storagedInventory);
        }

        return [];
    });

    const addProduct = async (productCode: number) => {
        try {
            const newCart = [...products];
            const verifyProduct = newCart.find((product) => product.code === productCode);

            const stock = await api.get(`/stock/${productCode}`);
            const stockAmount = stock.data.amount;

            const currentAmount = verifyProduct ? verifyProduct.amount : 0;
            const amount = currentAmount + 1;

            if (amount > stockAmount) {
                // toast.error("Quantidade solicitada fora de estoque");
                return;
            }

            if (verifyProduct) {
                verifyProduct.amount = amount;
            } else {
                const product = await api.get(`/products/${productCode}`);
                const newProduct = {
                    ...product.data,
                    amount: 1,
                };
                newCart.push(newProduct);
            }

            setProducts(newCart);
            localStorage.setItem("@JamesTipDash:inventory", JSON.stringify(newCart));
        } catch {
            //   toast.error("Erro na adição do produto");
        }
    };

    const removeProduct = (productCode: number) => {
        try {
            const newCart = [...products];
            const productIndex = newCart.findIndex(
                (product) => product.code === productCode
            );

            if (productIndex >= 0) {
                newCart.splice(productIndex, 1);
                setProducts(newCart);
                localStorage.setItem("@JamesTipDash:inventory", JSON.stringify(newCart));
            } else {
                throw Error();
            }
        } catch {
            //   toast.error("Erro na remoção do produto");
        }
    };

    const updateProductAmount = async ({
        productCode,
        amount,
    }: UpdateProductAmount) => {
        try {
            if (amount <= 0) {
                return;
            }

            const stock = await api.get(`/stock/${productCode}`);
            const stockAmount = stock.data.amount;

            if (amount > stockAmount) {
                // toast.error("Quantidade solicitada fora de estoque");
                return;
            }

            const newCart = [...products];
            const verifyProduct = newCart.find((product) => product.code === productCode);

            if (verifyProduct) {
                verifyProduct.amount = amount;
                setProducts(newCart);
                localStorage.setItem("@JamesTipDash:inventory", JSON.stringify(newCart));
            } else {
                throw Error();
            }
        } catch {
            //   toast.error("Erro na alteração de quantidade do produto");
        }
    };

    return (
       <ProductContext.Provider value={{ products, addProduct, removeProduct, updateProductAmount }}>
       {children}
       </ProductContext.Provider>
    )
}

export function useProducts(): ProductContextData {
    const context = useContext(ProductContext);

    return context;
}