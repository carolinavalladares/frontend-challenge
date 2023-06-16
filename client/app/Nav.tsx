"use client";

import { Saira_Stencil_One } from "next/font/google";
import Link from "next/link";
import Search from "./Search";
import Image from "next/image";
import useShop from "@/hooks/useShop";

const sairaStencilOne = Saira_Stencil_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Nav() {
  const { cart } = useShop();
  return (
    <nav className="bg-white pt-[33px] pb-[23px]">
      <div className="max-w-[1120px] m-auto flex items-center justify-between max-[780px]:flex-col max-[1155px]:px-4">
        <Link title="capputeeno" href={"/"}>
          <h1
            className={`${sairaStencilOne.className} text-[#5d5d6d] font-normal text-[40px] leading-none`}
          >
            capputeeno
          </h1>
        </Link>

        <div className="flex gap-6 items-center justify-center max-[780px]:w-full max-[780px]:mt-6">
          <Search />

          <Link title="carrinho" href={"/cart"}>
            <button className="flex items-center justify-center relative">
              <Image
                alt="ícone do carrinho"
                src={"/icons/cart-icon.png"}
                width={24}
                height={24}
              />

              {cart.items.length > 0 && (
                <div className="absolute -bottom-2 left-[15px] w-[17px] h-[17px] flex items-center justify-center text-[10px] bg-[#de3838] rounded-full text-white leading-none">
                  {cart.items.length}
                </div>
              )}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
