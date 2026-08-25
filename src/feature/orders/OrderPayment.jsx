import { MdPayment } from "react-icons/md";

export const OrderPayment = () => {
  return (
    <article className="order-details-card">
      <div className="order-details-card-left">
        <div className="details-card-icon-wrapper">
          <MdPayment />
        </div>

        <div className="order-details-card-text-flex">
          <p className="details-card-header">Payment Method</p>
          <div className="card-text-body">
            <p className="client">Paystack </p>
          </div>
        </div>
      </div>
      <p className="detail-card-pill green">Paid</p>
    </article>
  );
};
