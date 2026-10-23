import ProductCard from "./ProductCard";
import { Product } from "../types/Product";

interface ProductListProps {
  products: Product[];
  onDelete: (id: number) => void;
}

export default function ProductList({ products, onDelete }: ProductListProps) {
    if (products.length === 0) {
  return(
    <div className="text-center text-gray-500 mt-8">
      <p>No products available.</p>
    </div>
  );
}
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onDelete={onDelete} />
      ))}
    </div>
  );
}