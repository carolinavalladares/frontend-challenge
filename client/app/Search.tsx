"use client";
import Image from "next/image";

export default function Search() {
  return (
    <form className="bg-[#f3f5f6] flex items-center justify-between w-[352px] h-[42px] px-4 rounded-lg max-[780px]:flex-1 ">
      <input
        className="bg-transparent text-sm flex-1 outline-none"
        type="text"
        placeholder="Procurando por algo específico?"
      />

      <button>
        <Image
          width={24}
          height={24}
          alt="search icon"
          src={"/icons/search-icon.png"}
        />
      </button>
    </form>
  );
}
