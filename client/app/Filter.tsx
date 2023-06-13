"use client";
import Image from "next/image";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import useShop from "@/hooks/useShop";

const Dropdown = styled.div`
  position: relative;

  .display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    span {
      color: #737380;
      font-weight: 400;
      font-size: 14px;
    }
  }

  .options {
    background: #ffffff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1000;
    right: 0;
    padding: 12px 16px;
    min-width: 176px;

    button {
      color: #737380;
      font-weight: 400;
      font-size: 14px;
      padding: 5px 0;
      width: 100%;
      text-align: left;
    }
  }
`;

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
      <Dropdown>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="display"
        >
          <span>{buttonName}</span>
          <Image
            width={24}
            height={24}
            alt="seta para baixo"
            src={"/icons/down-arrow.png"}
          />
        </button>

        {dropdownOpen && (
          <div className="options">
            <button onClick={(e) => handleClick(e)} name="new">
              Novidades
            </button>
            <button onClick={(e) => handleClick(e)} name="price-desc">
              Preço: Maior - menor
            </button>
            <button onClick={(e) => handleClick(e)} name="price-asc">
              Preço: Menor - maior
            </button>
            <button onClick={(e) => handleClick(e)} name="sales">
              Mais vendidos
            </button>
          </div>
        )}
      </Dropdown>

      {dropdownOpen && (
        <div
          onClick={() => setDropdownOpen(false)}
          className="w-full h-full fixed bg-transparent left-0 top-0 z-50"
        ></div>
      )}
    </div>
  );
}
