import { GrNotes } from "react-icons/gr";

export const OrderDelivery = ({ order }) => {
  return (
    order?.shipping_details?.deliveryNotes && (
      <article className="order-details-card">
        <div className="order-details-card-left">
          <div className="details-card-icon-wrapper">
            <GrNotes />
          </div>

          <div className="order-details-card-text-flex">
            <p className="details-card-header">Delivery Notes</p>
            <div className="card-text-body">
              <p className="client">{order?.shipping_details?.deliveryNotes}</p>
            </div>
          </div>
        </div>
      </article>
    )
  );
};
