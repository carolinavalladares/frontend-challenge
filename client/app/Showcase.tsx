"use client";
import useShop from "@/hooks/useShop";

import Filter from "./Filter";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import Skeleton from "./Skeleton";

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
        <div className="flex items-center gap-10 ">
          <button
            className={`${
              currentCategory == "all"
                ? "font-semibold border-b-[#ffa585] text-[#41414d]"
                : "border-b-transparent"
            } uppercase text-base font-normal text-[#737380] border-b-4`}
            onClick={(e) => handleTabs(e)}
            name="all"
          >
            todos os produtos
          </button>
          <button
            className={`${
              currentCategory == "t-shirts"
                ? "font-semibold border-b-[#ffa585] text-[#41414d]"
                : "border-b-transparent"
            } uppercase text-base font-normal text-[#737380] border-b-4`}
            onClick={(e) => handleTabs(e)}
            name="t-shirts"
          >
            camisetas
          </button>
          <button
            className={`${
              currentCategory == "mugs"
                ? "font-semibold border-b-[#ffa585] text-[#41414d]"
                : "border-b-transparent"
            } uppercase text-base font-normal text-[#737380] border-b-4 `}
            onClick={(e) => handleTabs(e)}
            name="mugs"
          >
            canecas
          </button>
        </div>

        <Filter />
      </div>

      <div>
        <Pagination />

        <div className="mt-8 mb-[74px]">
          {products.length > 0 ? (
            <div className="grid grid-cols-4 gap-x-8 gap-y-6">
              {products.map((product, index) => {
                return <ProductCard product={product} key={index} />;
              })}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-x-8 gap-y-6">
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
            </div>
          )}
        </div>

        <Pagination />
      </div>
    </div>
  );
}
