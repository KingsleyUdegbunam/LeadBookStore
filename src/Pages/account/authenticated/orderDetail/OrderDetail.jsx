import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderByRef } from "../../../../services/orderServices";
import { toast } from "sonner";
import { LoadingState } from "../../../../component/general/states/LoadingState";
import { OrderDetailsUI } from "../../../../feature/orders/OrderDetailsUI";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { ref } = useParams();

  useEffect(() => {
    if (!ref) return;
    async function fetchOrder() {
      setLoading(true);
      try {
        const data = await getOrderByRef(ref);
        setOrder(data);
      } catch {
        toast.error("Oops, we've got some book worms in this page");
      } finally {
        setLoading(false);
      }
    }

    if (ref) fetchOrder();
  }, [ref]);

  if (loading) return <LoadingState />;
  if (!order) return;
  return (
    <section className="pages-wrapper order-details-page-wrapper">
      <OrderDetailsUI
        order={order}
        backTo="Back to orders"
        path="/account/orders"
      />
    </section>
  );
};

export default OrderDetail;
