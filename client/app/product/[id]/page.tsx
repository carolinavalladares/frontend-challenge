import Image from "next/image";
import Product from "./Product";
import Link from "next/link";

export default async function page() {
  return (
    <div>
      <Link
        title="voltar"
        href={"/"}
        className="mt-6 text-[#617480] text-sm font-medium flex items-center justify-center gap-2 w-fit "
      >
        <Image
          width={20}
          height={20}
          alt="ícone de seta"
          src={"/icons/back-icon.png"}
        />
        <span>Voltar</span>
      </Link>
      <div className="">
        <Product />
      </div>
    </div>
  );
}
