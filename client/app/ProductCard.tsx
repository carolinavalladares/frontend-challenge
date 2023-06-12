import { IProduct } from "@/types";
import formatPrice from "@/util/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { styled } from "styled-components";

interface IProps {
  product: IProduct;
}

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px 8px 0px 0px;
  max-width: 256px;
  height: 300px;
  overflow: hidden;

  .price {
    font-weight: 600;
    font-size: 14px;
    color: #09090a;
    padding-top: 8px;
  }
  .name {
    font-weight: 300;
    font-size: 16px;
    color: #41414d;
    padding-bottom: 8px;
    border-bottom: 1px solid #dce2e6;
  }
`;

export default function ProductCard({ product }: IProps) {
  return (
    <Card>
      <Link title={`${product.name}`} href={"/"}>
        <Image
          width={256}
          height={300}
          src={product.image_url}
          alt={`imagem ${product.name}`}
          priority
        ></Image>
        <div className="px-3 py-2">
          <p className="name">{product.name}</p>
          <p className="price">{`R$ ${formatPrice(product.price_in_cents)}`}</p>
        </div>
      </Link>
    </Card>
  );
}
