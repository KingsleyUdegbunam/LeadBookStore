import { TbTruckDelivery } from "react-icons/tb";

export const OrderShippingAddress = ({ order }) => {
  return (
    <article className="order-details-card">
      <div className="order-details-card-left">
        <div className="details-card-icon-wrapper">
          <TbTruckDelivery />
        </div>

        <div className="order-details-card-text-flex">
          <p className="details-card-header">Shipping Address</p>
          <div className="card-text-body">
            <p className="client">
              {`${order?.shipping_details?.firstName} ${order?.shipping_details?.lastName},`}
            </p>
            <p className="client">
              {`${order?.shipping_details?.address} ${order?.shipping_details?.city},`}
            </p>

            <p className="client">
              {`${order?.shipping_details?.state}, ${order?.shipping_details?.country}.`}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
