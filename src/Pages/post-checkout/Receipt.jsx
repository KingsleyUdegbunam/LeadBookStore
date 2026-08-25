import { OrderInfo } from "../../component/order/OrderInfo";
import {
  BooksPurchased,
  OrderCostBreakDown,
} from "../../component/order/OrderSummary";
import { AuthenticatedBanner } from "../../feature/post-checkout/components/Banner";
import "./Receipt.css";

export const Receipt = ({ order }) => {
  return (
    <section id="receipt" className="receipt-wrapper pages-wrapper">
      <AuthenticatedBanner order={order} />
      <OrderInfo order={order} />
      <BooksPurchased order={order} />
      <OrderCostBreakDown order={order} />
    </section>
  );
};
