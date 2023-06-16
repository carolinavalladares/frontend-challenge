"use client";

import useShop from "@/hooks/useShop";
import formatPrice from "@/util/formatPrice";
import Image from "next/image";
import Link from "next/link";
import CartItem from "./CartItem";

export default function Page() {
  const { cart } = useShop();

  const handleCheckout = () => {
    console.log(cart);
  };

  return (
    <div className="mb-4">
      <div>
        <Link
          title="voltar"
          href={"/"}
          className="mt-6 text-[#617480] text-sm font-medium flex items-center justify-center gap-2 w-fit"
        >
          <Image
            width={20}
            height={20}
            alt="ícone de seta"
            src={"/icons/back-icon.png"}
          />
          <span>Voltar</span>
        </Link>
      </div>

      <div className="flex gap-8 mt-6 max-[1140px]:flex-col ">
        <div className="flex-1">
          <h1 className="uppercase font-normal text-[#41414D] text-2xl mb-1">
            Seu carrinho
          </h1>
          <p className="font-light text-base text-[#41414D] mb-6">
            Total ({cart.items.length} produtos){" "}
            <span className="font-semibold text-lg">
              R${formatPrice(cart.subtotal)}
            </span>
          </p>

          <div className="w-full ">
            {cart.items.map((item) => {
              return <CartItem key={item.product.id} cartItem={item} />;
            })}
          </div>
        </div>

        <div className="bg-white pt-4 px-6 pb-6 h-full w-[352px] text-[#41414D] max-[1140px]:w-full">
          <h2 className=" font-semibold text-xl uppercase mb-7">
            Resumo do pedido
          </h2>

          <div className="flex items-center justify-between mb-3">
            <span>Subtotal de produtos</span>
            <span>R$ {formatPrice(cart.subtotal)}</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span>Entrega</span>
            <span>R$ {formatPrice(cart.shipping_price)}</span>
          </div>

          <div className="border-t border-[#DCE2E6] pt-2 flex items-center justify-between font-semibold mb-10">
            <span>Total</span>
            <span>R$ {formatPrice(cart.total)}</span>
          </div>

          <button
            onClick={() => handleCheckout()}
            title="finalizar compra"
            className="flex items-center justify-center h-11 w-full  bg-[#51B853] text-[#F5F5FA] uppercase font-medium rounded"
          >
            Finalizar Compra
          </button>

          <ul className="mt-40 text-[#737380] uppercase underline text-sm font-medium max-[1140px]:mt-8">
            <li className="mb-3">
              <Link title="ajuda" href={"/help"}>
                Ajuda
              </Link>
            </li>
            <li className="mb-3">
              <Link title="reembolso" href={"/refund"}>
                Reembolso
              </Link>
            </li>
            <li className="mb-3">
              <Link title="entregas e frete" href={"/shipping"}>
                Entregas e frete
              </Link>
            </li>
            <li className="">
              <Link title="trocas e devoluções" href={"/returns"}>
                Trocas e devoluções
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
