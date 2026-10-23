import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl transition-all hover:scale-[1.02] flex flex-col justify-between">
      <div>
        {product.imageUrl && (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-48 object-cover rounded-xl mb-4 shadow-sm"
          />
        )}
        
        {/* Título com tom escuro inspirado no Pantone 7725 C para forte contraste */}
        <h2 className="text-xl font-extrabold text-[#1B4D3E] tracking-tight">
          {product.name}
        </h2>

        <p className="mt-2 text-slate-600 text-sm leading-relaxed">
          {product.description}
        </p>

        {/* Categoria com cor Pantone 7480 C (#76A032) */}
        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#76A032] bg-[#76A032]/10 inline-block px-2.5 py-1 rounded-lg">
          Categoria: {product.category}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        {/* Preço misturando o Pantone 375 C ou tons vivos para destacar */}
        <span className="text-lg font-black text-[#5B8C00]">
          R$ {product.price.toFixed(2)}
        </span>

        <button
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition duration-200 shadow-sm cursor-pointer"
          onClick={() => onDelete(product.id)}
        >
          Deletar
        </button>
      </div>
    </div>
  );
}