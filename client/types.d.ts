export interface IProduct {
  name: string;
  category: string;
  price_in_cents: number;
  id: string;
  image_url: string;
  description: string;
  sales: number;
  created_at: string;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
  subtotal: number;
  total: number;
  shipping_price: number;
}
