import { createContext, ReactNode, useContext } from 'react';
import { useLocalStorage } from '@utils/useLocalStorage';

import { MyProduct, Product } from '@framework/types';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export interface CartItem extends MyProduct {
  qty: number;
}

type ShoppingCartContext = {
  getItem: (productId: number) => CartItem | undefined;
  increaseCartQuantity: (product: CartItem) => void;
  decreaseCartQuantity: (product: CartItem) => void;
  addProductFromCart: (product: MyProduct) => void;
  removeProductFromCart: (product: CartItem) => void;
  clearCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
  totalPrice: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  );

  const cartQuantity = cartItems.length;

  function getItem(productId: number) {
    return cartItems.find((item) => item.id === productId);
  }
  function increaseCartQuantity(product: CartItem) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === product.id) === null) {
        return [...currItems, { ...product, qty: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(product: CartItem) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === product.id)?.qty === 1) {
        return currItems.filter((item) => item.id !== product.id);
      } else {
        return currItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function addProductFromCart(product: MyProduct) {
    setCartItems((currItems) => {
      return [...currItems, { ...product, qty: 1 }];
    });
  }

  function removeProductFromCart(product: CartItem) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== product.id);
    });
  }

  function clearCart() {
    setCartItems([]);
  }

  const totalPrice = cartItems.reduce((acc, curr) => {
    return (
      acc +
      (curr.sale_price ? curr.sale_price * curr.qty : curr.price * curr.qty)
    );
  }, 0);

  return (
    <ShoppingCartContext.Provider
      value={{
        getItem,
        increaseCartQuantity,
        decreaseCartQuantity,
        addProductFromCart,
        removeProductFromCart,
        clearCart,
        cartItems,
        cartQuantity,
        totalPrice,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
