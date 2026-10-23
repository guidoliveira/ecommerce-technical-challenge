import {create} from "zustand";
import { Product } from "../types/Product";

interface ProductStore {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  setProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  deleteProduct: (id) =>
    set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
}));