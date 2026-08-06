import shop from "../assets/empty-states/shop.svg";
import cart from "../assets/empty-states/cart.svg";
import orders from "../assets/empty-states/orders.svg";

export const EMPTY_STATES = {
  search: {
    image: shop,
    title: "No books found",
    body: "We couldn't find any books matching your search.",
    actionText: "Browse All Books",
  },
  shop: {
    image: shop,
    title: "No books found",
    body: "No books match your filters, Try adjusting or clearing them.",
    actionText: "Clear Filters",
  },
  cart: {
    image: cart,
    title: "Your cart is empty",
    body: "Looks like you haven't added any books yet.",
    actionText: "Start Shopping",
  },
  orders: {
    image: orders,
    title: "No orders yet",
    body: "You haven't placed any orders yet.",
    actionText: "Start Shopping",
  },
};
