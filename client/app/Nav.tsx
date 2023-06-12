"use client";

import { styled } from "styled-components";
import { Saira_Stencil_One } from "next/font/google";
import Link from "next/link";
import Search from "./Search";
import Image from "next/image";

const sairaStencilOne = Saira_Stencil_One({
  subsets: ["latin"],
  weight: ["400"],
});

const Logo = styled.h1`
  color: #5d5d6d;
  font-weight: 400;
  font-size: 40px;
  line-height: 1;
`;

const AmountBadge = styled.div`
  position: absolute;
  bottom: -7px;
  left: 15px;
  height: 17px;
  width: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  background-color: #de3838;
  border-radius: 50%;
  color: #ffffff;
  line-height: 1;
`;

export default function Nav() {
  return (
    <nav className="bg-white pt-[33px] pb-[23px]">
      <div className="max-w-screen-lg m-auto flex items-center justify-between">
        <Link title="capputeeno" href={"/"}>
          <Logo className={`${sairaStencilOne.className}`}>capputeeno</Logo>
        </Link>

        <div className="flex gap-6 items-center justify-center">
          <Search />

          <Link title="carrinho" href={"/cart"}>
            <button className="flex items-center justify-center relative">
              <Image
                alt="ícone do carrinho"
                src={"/icons/cart-icon.png"}
                width={24}
                height={24}
              />

              {/* <AmountBadge>0</AmountBadge> */}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
