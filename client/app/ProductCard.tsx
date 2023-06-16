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
    <div
      className="
   productCard bg-white rounded-t-lg max-w-[256px]  overflow-hidden "
    >
      <Link title={`${product.name}`} href={`/product/${product.id}`}>
        <div className="relative h-[300px] w-[256px] overflow-hidden">
          <Image
            width={350}
            height={350}
            src={product.image_url}
            className="zoom absolute  transition-all -left-[40px] "
            alt={`imagem ${product.name}`}
            priority
          />
        </div>

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
