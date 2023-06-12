"use client";

import Image from "next/image";
import { styled } from "styled-components";

const SearchBox = styled.form`
  background-color: #f3f5f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 352px;
  height: 42px;
  padding: 0 16px;
  border-radius: 8px;

  & > input {
    background: transparent;
    font-size: 14px;
    flex: 1;
    outline: none;
  }
`;

export default function Search() {
  return (
    <SearchBox>
      <input type="text" placeholder="Procurando por algo específico?" />

      <button>
        <Image
          width={24}
          height={24}
          alt="search icon"
          src={"/icons/search-icon.png"}
        />
      </button>
    </SearchBox>
  );
}
