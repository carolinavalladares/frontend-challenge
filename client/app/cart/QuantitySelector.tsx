"use client";
import useShop from "@/hooks/useShop";
import { IProduct } from "@/types";
import Image from "next/image";
import { useState } from "react";

interface IProps {
  item: { product: IProduct; quantity: number };
}

export default function QuantitySelector({ item }: IProps) {
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const { updateItemQuantityInCart } = useShop();

  const handleQuantityUpdate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const button = e.target as HTMLButtonElement;
    const number = parseInt(button.getAttribute("name") as string);

    updateItemQuantityInCart(item, number);

    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          setDropdownOpen((prev) => !prev);
        }}
        className="cursor-pointer h-10 w-16 flex items-center justify-between px-2 bg-[#F3F5F6] border border-[#A8A8B3] rounded-lg gap-2 "
      >
        <span className="text-base uppercase text-[#737380]">
          {item.quantity}
        </span>

        <Image
          alt="seta para baixo"
          src={"/icons/down-arrow.png"}
          height={24}
          width={24}
        />
      </button>

      {dropDownOpen && (
        <div className="absolute  bg-[#ffffff] shadow-lg p-2 flex flex-col w-full rounded-lg z-50">
          <button
            name="1"
            onClick={(e) => handleQuantityUpdate(e)}
            className="w-full py-1 hover:bg-[#F3F5F6] text-[#737380]"
          >
            1
          </button>
          <button
            name="2"
            onClick={(e) => handleQuantityUpdate(e)}
            className="w-full py-1 hover:bg-[#F3F5F6] text-[#737380]"
          >
            2
          </button>
          <button
            name="3"
            onClick={(e) => handleQuantityUpdate(e)}
            className="w-full py-1 hover:bg-[#F3F5F6] text-[#737380]"
          >
            3
          </button>
          <button
            name="4"
            onClick={(e) => handleQuantityUpdate(e)}
            className="w-full py-1 hover:bg-[#F3F5F6] text-[#737380]"
          >
            4
          </button>
          <button
            name="5"
            onClick={(e) => handleQuantityUpdate(e)}
            className="w-full py-1 hover:bg-[#F3F5F6] text-[#737380]"
          >
            5
          </button>
        </div>
      )}

      {dropDownOpen && (
        <div
          onClick={() => setDropdownOpen(false)}
          className="fixed inset-0 bg-transparent z-10"
        ></div>
      )}
    </div>
  );
}
