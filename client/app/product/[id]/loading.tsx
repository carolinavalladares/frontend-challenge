import Skeleton from "@/app/Skeleton";
import Image from "next/image";
import Link from "next/link";

export default function loading() {
  return (
    <div>
      <Link
        title="voltar"
        href={"/"}
        className="mt-6 text-[#617480] text-sm font-medium flex items-center justify-center gap-2 w-fit"
      >
        <Image
          width={20}
          height={20}
          alt="ícone de seta"
          src={"/icons/back-icon.png"}
        />
        <span>Voltar</span>
      </Link>

      <div className="flex gap-8 w-full mt-6">
        <div>
          <Skeleton className={`w-[640px] h-[580px] `} />
        </div>

        <div className="flex flex-col w-full">
          <Skeleton className="h-3 w-[200px]" />
          <Skeleton className=" h-8 mt-3 w-full" />

          <Skeleton className=" h-7 mt-1 w-[200px]" />

          <Skeleton className="h-3 mt-6 mb-14" />

          <div className="flex-1">
            <Skeleton className="h-4 mb-2" />

            <Skeleton className="h-[200px]" />
          </div>

          <Skeleton className=" h-11" />
        </div>
      </div>
    </div>
  );
}
