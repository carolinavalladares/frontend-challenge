"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import useShop from "@/hooks/useShop";

export default function Filter() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { order, updateOrder } = useShop();
  const [buttonName, setButtonName] = useState("Organizar por");

  useEffect(() => {
    if (order == null) {
      setButtonName("Organizar por");
    }
  }, [order]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.target as HTMLButtonElement;

    const name = button.getAttribute("name");

    updateOrder(name as string);
    setButtonName(button.textContent as string);
    setDropdownOpen(false);
  };

  return (
    <div>
      <div className="relative ">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center justify-center gap-2"
        >
          <span className="text-[#737380] text-sm font-normal">
            {buttonName}
          </span>
          <Image
            width={24}
            height={24}
            alt="seta para baixo"
            src={"/icons/down-arrow.png"}
          />
        </button>

        {dropdownOpen && (
          <div className="bg-white shadow-md rounded flex flex-col absolute z-50 right-0 py-3 px-4 w-44">
            <button
              className="text-[#737380] text-sm font-normal py-[5px] w-full text-left"
              onClick={(e) => handleClick(e)}
              name="new"
            >
              Novidades
            </button>
            <button
              className="text-[#737380] text-sm font-normal py-[5px] w-full text-left"
              onClick={(e) => handleClick(e)}
              name="price-desc"
            >
              Preço: Maior - menor
            </button>
            <button
              className="text-[#737380] text-sm font-normal py-[5px] w-full text-left"
              onClick={(e) => handleClick(e)}
              name="price-asc"
            >
              Preço: Menor - maior
            </button>
            <button
              className="text-[#737380] text-sm font-normal py-[5px] w-full text-left"
              onClick={(e) => handleClick(e)}
              name="sales"
            >
              Mais vendidos
            </button>
          </div>
        )}
      </div>

      {dropdownOpen && (
        <div
          onClick={() => setDropdownOpen(false)}
          className="w-full h-full fixed bg-transparent left-0 top-0 z-30"
        ></div>
      )}
    </div>
  );
}
