import { OrderDetailsUI } from "../../../../feature/orders/OrderDetailsUI";
import { useParams, useLocation } from "react-router-dom";

export const GuestOrder = () => {
  const { ref } = useParams();
  const location = useLocation();

  const stateOrder = location.state?.order;
  const storedOrder = sessionStorage.getItem(`order:${ref}`);

  const order = stateOrder ?? (storedOrder ? JSON.parse(storedOrder) : null);
  return (
    <div className="pages-wrapper">
      <OrderDetailsUI order={order} backTo="Back to Home" path="/" />
    </div>
  );
};
