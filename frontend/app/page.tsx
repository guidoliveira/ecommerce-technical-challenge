"use client";

import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { Product } from "../types/Product";
import { getProducts } from "../services/productService";
import { useProductStore } from "../store/productStore";

export default function Home() {
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const addProduct = useProductStore((state) => state.addProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
      setLoaded(true);
      return;
    }
    async function loadProducts() {
      const productsData = await getProducts();
      setProducts(productsData);
      setLoaded(true);
    }
    loadProducts();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("products", JSON.stringify(products));
  }, [products, loaded]);

  function handleAddProduct(productData:{
    name: string;
    category: string;
    description: string;
    price: number;
    imageUrl: string;
  }) {
    const newProduct: Product = {
      id: Date.now(),
      ...productData,
    };
    addProduct(newProduct);
  }

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      minPrice === "" ? true : product.price >= Number(minPrice)
    )
    .filter((product) =>
      maxPrice === "" ? true : product.price <= Number(maxPrice)
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  const PRODUCTS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
  <main className="min-h-screen bg-[#0033A0] text-white p-4 md:p-10 font-sans">
        {/* Cabeçalho com Título e Logo no canto direito */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-white/10 pb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
            Gerenciamento de Produtos
          </h1>
          
          <div className="bg-white/1 backdrop-blur-md p-2">
            <img 
              src="https://cdn.prod.website-files.com/6511cfd2606eaef1830868c7/6862d33dd9ba75e35a63e760_Open%20Graph%20-%20Large%20-%201200x630.png" 
              alt="Logo Suzano" 
              className="h-10 md:h-15 w-auto object-contain"
            />
          </div>
        </header>
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        className="border border-blue-300/30 bg-white/10 backdrop-blur-md p-3 rounded-xl w-full mb-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white transition-all shadow-sm"
      />
    
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="number"
          placeholder="Preço mínimo"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-blue-300/30 bg-white/10 backdrop-blur-md p-3 rounded-xl w-full text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white transition-all shadow-sm"
        />
        <input
          type="number"
          placeholder="Preço máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-blue-300/30 bg-white/10 backdrop-blur-md p-3 rounded-xl w-full text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white transition-all shadow-sm"
        />
      </div>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        className="border border-blue-300/30 bg-[#002880] p-3 rounded-xl mb-6 w-full md:w-auto text-white focus:outline-none focus:ring-2 focus:ring-white transition-all shadow-sm cursor-pointer"
      >
        <option value="asc" className="bg-[#002880] text-white">Preço: Crescente</option>
        <option value="desc" className="bg-[#002880] text-white">Preço: Decrescente</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProductForm onAddProduct={handleAddProduct} />
        </div>

        <div className="md:col-span-3">
          <ProductList
            products={paginatedProducts}
            onDelete={deleteProduct}
          />
          <div className="flex items-center justify-center mt-6 gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm backdrop-blur-sm"
            >
              Anterior
            </button>
            <span className="px-4 py-2 font-medium text-blue-100">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm backdrop-blur-sm"
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}