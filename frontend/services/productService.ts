import { Product } from "../types/Product";

export async function getProducts(): Promise<Product[]> {

  const response = await fetch("/api/products");

  if (!response.ok) {

    throw new Error("Erro ao carregar produtos");

  }

  const products: Product[] = await response.json();

  return products;

}