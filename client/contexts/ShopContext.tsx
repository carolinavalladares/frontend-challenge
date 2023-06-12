"use client";

import { IProduct } from "@/types";
import { createContext, useEffect, useState } from "react";

interface IShopContext {
  products: IProduct[];
  productCount: number;
  fetchAllProducts: () => void;
  fetchProductsByCategory: () => void;
  updateCurrentPage: (direction: string) => void;
  pagination: { totalPages: number; currentPage: number; itemsPerPage: number };
  currentCategory: string;
  updateCurrentCategory: (category: string) => void;
  setCurrentPage: (page: number) => void;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const ShopContext = createContext({} as IShopContext);

export default function ShoContextProvider({ children }: IProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productCount, setProductCount] = useState<number>(0);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [pagination, setPagination] = useState({
    totalPages: 0,
    currentPage: 0,
    itemsPerPage: 12,
  });

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    handlePagination(productCount);
  }, [productCount]);

  useEffect(() => {
    if (currentCategory == "all") {
      fetchAllProducts();
    } else {
      fetchProductsByCategory();
    }

    handlePagination(productCount);
  }, [currentCategory]);

  useEffect(() => {
    if (currentCategory == "all") {
      fetchAllProducts();
    } else {
      fetchProductsByCategory();
    }
  }, [pagination.currentPage]);

  const fetchAllProducts = async () => {
    try {
      const req = await fetch("http://localhost:3333", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          query: `query($page:Int,$perPage: Int){
            allProducts(page: $page, perPage: $perPage){
                name, 
                description,
                category,
                image_url,
                price_in_cents,
                id
              }
              
              _allProductsMeta{
                count
              }
    }`,
          variables: {
            page: pagination.currentPage,
            perPage: pagination.itemsPerPage,
          },
        }),
      });

      const resp: {
        data: { allProducts: IProduct[]; _allProductsMeta: { count: number } };
      } = await req.json();

      setProducts(resp.data.allProducts);
      setProductCount(resp.data._allProductsMeta.count);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductsByCategory = async () => {
    try {
      const req = await fetch("http://localhost:3333", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          query: `query ($filter:ProductFilter, $page: Int,$perPage: Int){
              allProducts(filter: $filter,page:$page,perPage:$perPage){
                  name, 
                  description,
                  category,
                  image_url,
                  price_in_cents,
                  id
                }
                
                _allProductsMeta(filter:$filter){
                  count
                }
      }`,
          variables: {
            filter: { category: currentCategory },
            page: pagination.currentPage,
            perPage: pagination.itemsPerPage,
          },
        }),
      });

      const resp: {
        data: { allProducts: IProduct[]; _allProductsMeta: { count: number } };
      } = await req.json();

      setProducts(resp.data.allProducts);
      setProductCount(resp.data._allProductsMeta.count);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePagination = (productCount: number) => {
    const pagesCount = productCount / pagination.itemsPerPage;

    if (Number.isInteger(pagesCount)) {
      setPagination({ ...pagination, currentPage: 0, totalPages: pagesCount });
    } else {
      setPagination({
        ...pagination,
        currentPage: 0,
        totalPages: Math.trunc(pagesCount) + 1,
      });
    }
  };

  const updateCurrentPage = (direction: string) => {
    if (direction == "+") {
      if (pagination.currentPage >= pagination.totalPages - 1) {
        return;
      }

      setPagination({ ...pagination, currentPage: pagination.currentPage + 1 });
    } else if (direction == "-") {
      if (pagination.currentPage <= 0) {
        return;
      }

      setPagination({ ...pagination, currentPage: pagination.currentPage - 1 });
    } else {
      return;
    }
  };

  const setCurrentPage = (page: number) => {
    if (page > pagination.totalPages - 1 || page < 0) {
      return;
    }

    setPagination({ ...pagination, currentPage: page });
  };

  const updateCurrentCategory = (category: string) => {
    setCurrentCategory(category);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        productCount,
        fetchAllProducts,
        fetchProductsByCategory,
        updateCurrentPage,
        pagination,
        currentCategory,
        updateCurrentCategory,
        setCurrentPage,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
