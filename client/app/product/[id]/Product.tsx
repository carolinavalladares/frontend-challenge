"use client";
import { IProduct } from "@/types";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

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
    <div>
      <div>
        <Image
          width={640}
          height={580}
          src={product.image_url as string}
          alt={`imagem ${product.name}`}
          priority
        />
      </div>

      <div>
        <p>{product.category}</p>
        <p>{product.name}</p>
        <p>{product.name}</p>

        <p>
          *Frete de R$40,00 para todo o Brasil. Grátis para compras acima de
          R$900,00.
        </p>

        <div>
          <h2>Descrição</h2>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
