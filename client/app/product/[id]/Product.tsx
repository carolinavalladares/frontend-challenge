"use client";
import { IProduct } from "@/types";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import formatPrice from "@/util/formatPrice";

export default function Product() {
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const resp = await fetch("http://localhost:3333", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: `query($id: ID!){
            Product(id:$id){
                name, 
                description,
                category,
                image_url,
                price_in_cents,
                id,
                sales,
                created_at
              }
    }`,
        variables: {
          id,
        },
      }),
    });

    const data = await resp.json();
    setProduct(data.data.Product);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-8">
      <div>
        <Image
          width={640}
          height={580}
          src={product.image_url as string}
          alt={`imagem ${product.name}`}
          priority
          className="max-w-none"
        />
      </div>

      <div className="flex flex-col">
        <p className="text-[#41414D] ">
          {product.category == "mugs"
            ? "Caneca"
            : product.category
            ? "Camisa"
            : "Categoria"}
        </p>
        <h2 className="font-light text-[32px] text-[#41414D] mt-3 leading-none">
          {product.name}
        </h2>
        <p className="text-[#09090A] font-semibold text-xl mt-1 ">
          R$ {formatPrice(product.price_in_cents)}
        </p>

        <p className="text-xs text-[#41414D] mt-6 mb-14">
          *Frete de R$40,00 para todo o Brasil. Grátis para compras acima de
          R$900,00.
        </p>

        <div className="flex-1">
          <h3 className="font-medium text-[#737380] text-base mb-2">
            DESCRIÇÃO
          </h3>
          <p className="text-sm text-[#41414D] leading-normal">
            {product.description}
          </p>
        </div>

        <button
          title={`adicionar ${product.name} ao carrinho`}
          className="uppercase text-white bg-[#115D8C] flex items-center justify-center h-11 gap-3 rounded"
        >
          <Image
            width={24}
            height={24}
            alt="ícone adicionar ao carrinho"
            src={"/icons/add-to-cart-icon.png"}
          />
          <span>Adicionar ao carrinho</span>
        </button>
      </div>
    </div>
  );
}
