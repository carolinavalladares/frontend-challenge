import { IProduct } from "@/types";
import formatPrice from "@/util/formatPrice";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "./Skeleton";

interface IProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProps) {
  return (
    <div className="bg-white rounded-t-lg max-w-[256px]  overflow-hidden">
      <Link title={`${product.name}`} href={`/product/${product.id}`}>
        <Image
          width={256}
          height={300}
          src={product.image_url}
          alt={`imagem ${product.name}`}
        ></Image>
        <div className="px-3 py-2">
          <p className="font-light text-base text-[#41414d] pb-2 border-b border-b-[#dce2e6]">
            {product.name}
          </p>
          <p className="font-semibold text-sm text-[#09090a] pt-2">{`R$ ${formatPrice(
            product.price_in_cents
          )}`}</p>
        </div>
      </Link>
    </div>
  );
}
