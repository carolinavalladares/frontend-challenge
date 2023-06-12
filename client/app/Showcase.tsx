"use client";
import useShop from "@/hooks/useShop";
import { styled } from "styled-components";
import { useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  & > button {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 400;
    color: #737380;
    border-bottom: 4px solid transparent;

    &.active {
      font-weight: 600;
      color: #41414d;
      border-bottom: 4px solid #ffa585;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 32px;
  row-gap: 24px;
`;

export default function Showcase() {
  const { products, updateCurrentCategory, currentCategory } = useShop();

  const handleTabs = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.target as HTMLButtonElement;
    const buttonName = button.getAttribute("name");

    updateCurrentCategory(buttonName as string);
  };

  return (
    <div className="mt-8 mb-16">
      <div className="mb-6 flex items-center justify-between">
        <TabsContainer>
          <button
            className={`${currentCategory == "all" ? "active" : null}`}
            onClick={(e) => handleTabs(e)}
            name="all"
          >
            todos os produtos
          </button>
          <button
            className={`${currentCategory == "t-shirts" ? "active" : null}`}
            onClick={(e) => handleTabs(e)}
            name="t-shirts"
          >
            camisetas
          </button>
          <button
            className={`${currentCategory == "mugs" ? "active" : null}`}
            onClick={(e) => handleTabs(e)}
            name="mugs"
          >
            canecas
          </button>
        </TabsContainer>

        <div>filter</div>
      </div>

      <div>
        <Pagination />

        <div className="mt-8 mb-[74px]">
          <Grid>
            {products.map((product, index) => {
              return <ProductCard product={product} key={index} />;
            })}
          </Grid>
        </div>

        <Pagination />
      </div>
    </div>
  );
}
