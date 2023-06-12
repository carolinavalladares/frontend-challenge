"use client";
import useShop from "@/hooks/useShop";
import Image from "next/image";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  & button {
    background: #e9e9f0;
    border-radius: 8px;
    font-weight: 400;
    font-size: 16px;
    color: #737380;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:disabled {
      opacity: 60%;
    }
    &.current {
      background: #f5f5fa;
      border: 1px solid #ffa585;
      font-weight: 600;
      color: #ffa585;
    }
  }
`;

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
    <PaginationContainer>
      <div className="numbers flex items-center justify-center gap-[2px]">
        {pages.map((number) => {
          return (
            <button
              className={`${
                pagination.currentPage + 1 == number ? "current" : null
              }`}
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
          className="prev"
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
          className="next "
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
    </PaginationContainer>
  );
}
