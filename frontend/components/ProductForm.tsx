"use client";

import { useState } from "react";

interface ProductFormProps {

  onAddProduct: (product: {

    name: string;

    category: string;

    description: string;

    price: number;

    imageUrl: string;

  }) => void;

}

export default function ProductForm({

  onAddProduct,

}: ProductFormProps) {

  const [name, setName] = useState("");

  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  function handleSubmit() {

    if (!name.trim()) return;

    onAddProduct({

      name,

      category,

      description,

      price: Number(price),

      imageUrl,

    });

    setName("");

    setCategory("");

    setDescription("");

    setPrice("");

    setImageUrl("");

  }

  return (

    <div className="mb-6 flex flex-col gap-3">

      <input

        className="border p-2 rounded"

        placeholder="Nome"

        value={name}

        onChange={(e) => setName(e.target.value)}

      />

      <input

        className="border p-2 rounded"

        placeholder="Categoria"

        value={category}

        onChange={(e) => setCategory(e.target.value)}

      />

      <textarea

        className="border p-2 rounded"

        placeholder="Descrição"

        value={description}

        onChange={(e) => setDescription(e.target.value)}

      />

      <input

        className="border p-2 rounded"

        placeholder="Preço"

        type="number"

        value={price}

        onChange={(e) => setPrice(e.target.value)}

      />

      <input

        className="border p-2 rounded"

        placeholder="URL da imagem"

        value={imageUrl}

        onChange={(e) => setImageUrl(e.target.value)}

      />

      <button

        onClick={handleSubmit}

        className="

          bg-blue-500

          text-white

          px-4

          py-2

          rounded

          cursor-pointer

          hover:bg-blue-700

          hover:scale-105

          transition

        "

      >

        Adicionar Produto

      </button>

    </div>

  );

}