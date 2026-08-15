import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { books } from "../data/inventory";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (bookId) => {
    const itemId = Number(bookId);

    setCart((prev) => {
      const inCart = prev.find((cartItem) => cartItem.id === itemId);
      if (inCart) {
        return prev.map((item) => {
          return item.id === itemId
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.basePrice * (item.quantity + 1),
              }
            : item;
        });
      } else {
        const book = books.find((book) => book.id === itemId);

        return [
          ...prev,
          {
            id: book.id,
            quantity: 1,
            basePrice: book.price.paperback,
            totalPrice: book.price.paperback,
          },
        ];
      }
    });
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
