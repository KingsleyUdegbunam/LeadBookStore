import { createContext, useContext, useState, useMemo } from "react";
import { books } from "../data/inventory";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    const inCart = cart.find((cartItem) => cartItem.id === book.id);

    if (inCart) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === book.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.basePrice * (item.quantity + 1),
              }
            : item,
        ),
      );
    } else {
      setCart((prev) => [
        ...prev,
        {
          id: book.id,
          quantity: 1,
          basePrice: book.price.paperback,
          totalPrice: book.price.paperback,
        },
      ]);
    }
  };

  const cartInDetail = useMemo(
    () =>
      cart.map((item) => ({
        ...books.find((b) => b.id === item.id),
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      })),
    [cart],
  );

  const cartTotalPrice = useMemo(
    () =>
      cart.reduce((total, item) => {
        return item.totalPrice + total;
      }, 0),
    [cart],
  );

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, cartInDetail, cartTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
