// delete cart item
export const deleteItem = (cartItem, setCart) => {
  setCart((prev) => prev.filter((book) => book.id !== cartItem.id));
};

// update the quantity of an item in cart
export const updateCartItemQty = (newQty, cartItem, setCart) => {
  if (newQty < 1) {
    deleteItem(cartItem);
    return;
  }
  setCart((prev) =>
    prev.map((item) =>
      item.id === cartItem.id
        ? { ...item, quantity: newQty, totalPrice: item.basePrice * newQty }
        : item,
    ),
  );
};
