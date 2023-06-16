"use client";
import { ShopContext } from "@/contexts/ShopContext";
import { useContext } from "react";

export default function useShop() {
  const {
    products,
    productCount,
    updateCurrentPage,
    pagination,
    currentCategory,
    updateCurrentCategory,
    setCurrentPage,
    order,
    updateOrder,
    cart,
    addToCart,
    updateItemQuantityInCart,
    deleteItemInCart,
  } = useContext(ShopContext);

  return {
    products,
    productCount,
    updateCurrentPage,
    pagination,
    currentCategory,
    updateCurrentCategory,
    setCurrentPage,
    order,
    updateOrder,
    cart,
    addToCart,
    updateItemQuantityInCart,
    deleteItemInCart,
  };
}
