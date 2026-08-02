import { toast } from "sonner";
import { bookRemovedToast } from "../../helper/notifications/notifications";

const MAX_CART_QUANTITY = 100;
// delete cart item
export const deleteItem = (itemId, setCart) => {
  setCart((prev) => prev.filter((book) => book.id !== itemId));
};

export const restoreItem = (item, index, setCart) => {
  setCart((prev) => {
    const updatedCart = [...prev];
    updatedCart.splice(index, 0, item);

    return updatedCart;
  });
};

// update the quantity of an item in cart
export const updateCartItemQty = (newQty, item, setCart, addToCart, index) => {
  const itemId = item.id;
  if (newQty === 0) {
    deleteItem(itemId, setCart);
    bookRemovedToast(() => {
      restoreItem(item, index, setCart);
    });

    return;
  }

  if (newQty < 0) {
    toast.warning("Quantity can't be negative.");
    return;
  }

  if (newQty > 100) {
    toast.warning(
      `You can add up to ${MAX_CART_QUANTITY} copies of this book.`,
    );
    return;
  }
  setCart((prev) =>
    prev.map((item) =>
      item.id === itemId
        ? { ...item, quantity: newQty, totalPrice: item.basePrice * newQty }
        : item,
    ),
  );
};
