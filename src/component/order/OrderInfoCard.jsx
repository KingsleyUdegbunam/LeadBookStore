import React from "react";

const OrderInfoCard = ({ title, bodyMain, additionalDetail, footer }) => {
  return (
    <div>
      <div className="shipping-billing-grid-cell">
        <p className="shipping-billing-header">{title}</p>
        <p className="shipping-billing-name">{bodyMain}</p>
        <div>
          <p className="shipping-billing-detail-regular">{additionalDetail}</p>
          <p className="shipping-billing-detail-regular">{footer}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoCard;

export const OrderDeliveryInfoCard = ({ title, bodyMain, footer }) => {
  return (
    <div>
      <div className="shipping-billing-grid-cell">
        <p className="shipping-billing-header">{title}</p>

        <div>
          <p className="shipping-billing-name">{bodyMain}</p>
          <p className="shipping-billing-detail-regular">{footer}</p>
        </div>
      </div>
    </div>
  );
};
