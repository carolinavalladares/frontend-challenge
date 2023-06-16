import { IProduct } from "@/types";
import formatPrice from "@/util/formatPrice";
import Image from "next/image";
import QuantitySelector from "./QuantitySelector";
import useShop from "@/hooks/useShop";

interface IProps {
  cartItem: { product: IProduct; quantity: number };
}

export default function CartItem({ cartItem }: IProps) {
  const { product } = cartItem;
  const { deleteItemInCart } = useShop();

  const handleDeleteItem = () => {
    deleteItemInCart(cartItem);
  };

  return (
    <div className="flex items-start bg-white mb-4 rounded-lg">
      <div className="relative h-[211px] w-[256px] min-w-[256px] overflow-hidden rounded-l-lg">
        <Image
          width={285}
          height={285}
          alt={`Imagem ${product.name}`}
          className="absolute  transition-all -left-[20px] -top-[20px]"
          src={product.image_url}
        />
      </div>
      <div className="pl-8 pr-4 pt-4 pb-6 flex flex-col h-[211px] flex-1">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[20px] font-light text-[#41414D] ">
            {product.name}
          </h2>

          <button
            onClick={() => handleDeleteItem()}
            title={`remove ${product.name} from cart`}
          >
            <Image
              alt="bin icon"
              width={24}
              height={24}
              src={"/icons/delete-icon.png"}
            />
          </button>
        </div>

        <p className="text-xs text-[#41414D] flex-1">{product.description}</p>
        <div className="flex items-center justify-between">
          <QuantitySelector item={cartItem} />
          <span className="font-semibold text-base text-[#09090A]">
            R$ {formatPrice(product.price_in_cents)}
          </span>
        </div>
      </div>
    </div>
  );
}
