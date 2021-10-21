import { createContext, ReactNode, useContext, useEffect } from "react";

type Product = {
    name: string;
    provider: string;
    code: string;
    category: string;
    price: number;
    amount: number;
    createdAt: string;
  }

  interface SidebarDrawerProviderProps {
    children: ReactNode;
  }