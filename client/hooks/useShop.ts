"use client";
import { ShopContext } from "@/contexts/ShopContext";
import { useContext } from "react";

export default function useShop() {
  const {
    products,
    productCount,
    fetchAllProducts,
    fetchProductsByCategory,
    updateCurrentPage,
    pagination,
    currentCategory,
    updateCurrentCategory,
    setCurrentPage,
    order,
    updateOrder,
  } = useContext(ShopContext);

  return {
    products,
    productCount,
    fetchAllProducts,
    fetchProductsByCategory,
    updateCurrentPage,
    pagination,
    currentCategory,
    updateCurrentCategory,
    setCurrentPage,
    order,
    updateOrder,
  };
}
