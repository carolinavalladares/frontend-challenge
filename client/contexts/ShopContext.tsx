"use client";

import { ICart, IProduct } from "@/types";
import { createContext, useEffect, useState } from "react";

interface IShopContext {
  products: IProduct[];
  productCount: number;
  updateCurrentPage: (direction: string) => void;
  pagination: { totalPages: number; currentPage: number; itemsPerPage: number };
  currentCategory: string;
  updateCurrentCategory: (category: string) => void;
  setCurrentPage: (page: number) => void;
  order: { sortOrder?: string; sortField?: string } | null;
  updateOrder: (field: string) => void;
  cart: ICart;
  addToCart: (product: IProduct) => void;
  updateItemQuantityInCart: (
    item: { product: IProduct; quantity: number },
    newQuantity: number
  ) => void;
  deleteItemInCart: (item: { product: IProduct; quantity: number }) => void;
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
  const [order, setOrder] = useState<{
    sortOrder?: string;
    sortField?: string;
  } | null>(null);
  const [cart, setCart] = useState<ICart>({
    items: [],
    total: 0,
    shipping_price: 0,
    subtotal: 0,
  });

  useEffect(() => {
    fetchAllProducts();

    const storedCart: ICart = JSON.parse(
      localStorage.getItem("capputeeno.cart") as string
    );
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    handlePagination(productCount);
    updateOrder();
  }, [productCount]);

  useEffect(() => {
    if (currentCategory == "all") {
      fetchAllProducts();
    } else {
      fetchProductsByCategory();
    }

    handlePagination(productCount);
    updateOrder();
  }, [currentCategory]);

  useEffect(() => {
    if (currentCategory == "all") {
      if (order == null) {
        fetchAllProducts();
      } else {
        fetchAllProductsInOrder();
      }
    } else {
      if (order == null) {
        fetchProductsByCategory();
      } else {
        fetchProductsByCategoryInOrder();
      }
    }
  }, [pagination.currentPage]);

  useEffect(() => {
    if (currentCategory == "all") {
      fetchAllProductsInOrder();
    } else {
      fetchProductsByCategoryInOrder();
    }
  }, [order]);

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
                id,
                sales,
                created_at
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
                  id,
                  sales,
                  created_at
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

  const fetchAllProductsInOrder = async () => {
    try {
      const req = await fetch("http://localhost:3333", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          query: `query($page:Int,$perPage: Int, $sortOrder: String, $sortField: String){
            allProducts(page: $page, perPage: $perPage, sortField:$sortField, sortOrder:$sortOrder){
                name, 
                description,
                category,
                image_url,
                price_in_cents,
                id,
                sales,
                created_at
              }
              
              _allProductsMeta{
                count
              }
    }`,
          variables: {
            page: pagination.currentPage,
            perPage: pagination.itemsPerPage,
            sortOrder: order?.sortOrder,
            sortField: order?.sortField,
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

  const fetchProductsByCategoryInOrder = async () => {
    try {
      const req = await fetch("http://localhost:3333", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          query: `query ($filter:ProductFilter, $page: Int,$perPage: Int,$sortOrder: String, $sortField: String){
              allProducts(filter: $filter,page:$page,perPage:$perPage, sortField:$sortField, sortOrder:$sortOrder){
                  name, 
                  description,
                  category,
                  image_url,
                  price_in_cents,
                  id, 
                  sales,
                  created_at
                }
                
                _allProductsMeta(filter:$filter){
                  count
                }
      }`,
          variables: {
            filter: { category: currentCategory },
            page: pagination.currentPage,
            perPage: pagination.itemsPerPage,
            sortOrder: order?.sortOrder,
            sortField: order?.sortField,
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

  const updateOrder = (field?: string) => {
    if (!field) {
      setOrder(null);
      return;
    }

    if (field == "new") {
      setOrder({ sortOrder: "DESC", sortField: "created_at" });
    } else if (field == "price-desc") {
      setOrder({ sortOrder: "DESC", sortField: "price_in_cents" });
    } else if (field == "price-asc") {
      setOrder({ sortOrder: "ASC", sortField: "price_in_cents" });
    } else if (field == "sales") {
      setOrder({ sortOrder: "DESC", sortField: "sales" });
    }
  };

  useEffect(() => {
    console.log(cart);

    localStorage.setItem("capputeeno.cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: IProduct) => {
    const item = { product, quantity: 1 };

    const itemAlreadyInCart = cart.items.find((obj) => {
      return obj.product.name == item.product.name;
    });

    if (!itemAlreadyInCart) {
      const cartItemsTemp = [...cart.items, { ...item }];

      const valuesArr = cartItemsTemp.map(
        (item) => item.product.price_in_cents * item.quantity
      );

      const subtotal = valuesArr.reduce((acc, current) => acc + current);

      setCart({
        ...cart,
        subtotal: subtotal,
        shipping_price: 4000,
        total: subtotal + cart.shipping_price,
        items: [...cartItemsTemp],
      });
    } else {
      console.log(`${item.product.name} is already in the cart...`);
    }
  };

  const updateItemQuantityInCart = (
    item: { product: IProduct; quantity: number },
    newQuantity: number
  ) => {
    const itemAlreadyInCart = cart.items.find((obj) => {
      return obj.product.name == item.product.name;
    });

    if (!itemAlreadyInCart) {
      return;
    } else {
      const cartItemsTemp = [...cart.items];
      cartItemsTemp.splice(cartItemsTemp.indexOf(itemAlreadyInCart), 1, {
        product: item.product,
        quantity: newQuantity,
      });

      const valuesArr = cartItemsTemp.map(
        (item) => item.product.price_in_cents * item.quantity
      );
      const subtotal = valuesArr.reduce((acc, current) => acc + current);
      setCart({
        subtotal,
        shipping_price: 4000,
        total: subtotal + cart.shipping_price,
        items: [...cartItemsTemp],
      });
    }
  };

  const deleteItemInCart = (item: { product: IProduct; quantity: number }) => {
    const itemAlreadyInCart = cart.items.find((obj) => {
      return obj.product.name == item.product.name;
    });

    if (!itemAlreadyInCart) {
      return;
    } else {
      const cartItemsTemp = [...cart.items];
      cartItemsTemp.splice(cartItemsTemp.indexOf(itemAlreadyInCart), 1);

      let subtotal;
      if (cartItemsTemp.length <= 0) {
        subtotal = 0;
      } else {
        const valuesArr = cartItemsTemp.map(
          (item) => item.product.price_in_cents * item.quantity
        );
        subtotal = valuesArr.reduce((acc, current) => acc + current);
      }

      setCart({
        subtotal,
        shipping_price: 4000,
        total: subtotal + cart.shipping_price,
        items: [...cartItemsTemp],
      });
    }
  };

  return (
    <ShopContext.Provider
      value={{
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
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
