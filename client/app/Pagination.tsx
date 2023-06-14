"use client";
import useShop from "@/hooks/useShop";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Pagination() {
  const { pagination, updateCurrentPage, setCurrentPage } = useShop();
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < pagination.totalPages; i++) {
      arr.push(i + 1);
    }
    setPages(arr);
  }, [pagination]);

  return (
    <div className="flex items-center justify-end gap-2">
      <div className="numbers flex items-center justify-center gap-[2px]">
        {pages.map((number) => {
          return (
            <button
              className={`${
                pagination.currentPage + 1 == number
                  ? "bg-[#f5f5fa] border border-[#ffa585] font-semibold text-[#ffa585]"
                  : null
              } bg-[#e9e9f0] rounded-lg text-base font-normal text-[#737380] w-8 h-8 flex items-center justify-center`}
              key={number}
              onClick={() => setCurrentPage(number - 1)}
            >
              {number}
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-1">
        <button
          className="prev bg-[#e9e9f0] rounded-lg text-base font-normal text-[#737380] w-8 h-8 flex items-center justify-center disabled:opacity-60"
          onClick={() => updateCurrentPage("-")}
          disabled={pagination.currentPage <= 0 ? true : false}
        >
          <Image
            width={24}
            height={24}
            alt={"previous page"}
            src={"/icons/left-arrow.png"}
          />
        </button>
        <button
          className="next  bg-[#e9e9f0] rounded-lg text-base font-normal text-[#737380] w-8 h-8 flex items-center justify-center disabled:opacity-60"
          onClick={() => updateCurrentPage("+")}
          disabled={
            pagination.currentPage >= pagination.totalPages - 1 ? true : false
          }
        >
          <Image
            width={24}
            height={24}
            alt={"next page"}
            src={"/icons/right-arrow.png"}
          />
        </button>
      </div>
    </div>
  );
}
