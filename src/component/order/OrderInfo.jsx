import React from "react";
import { OrderInfoCard } from "./OrderInfoCard";
import { capitalizeWords } from "../../utilities/capitalizeWords";
import "./OrderInfo.css";

export const OrderInfo = ({ order }) => {
  const shipping = {
    title: "Shipping To",
    bodyMain: `${order?.shipping_details?.firstName} ${order?.shipping_details?.lastName}`,
    additionalDetail: `${order?.shipping_details?.address}, ${order?.shipping_details?.city}, ${order?.shipping_details?.state}`,
    footer: `${order?.shipping_details?.tel}`,
  };

  const payment = {
    title: "Payment",
    bodyMain: "Paid",
    additionalDetail: order?.reference,
  };

  const delivery = {
    title: "Delivery",
    bodyMain: order?.courier_details.id,
    additionalDetail: capitalizeWords(`${order?.courier_details.desc}`),
    footer: `${order?.courier_details?.minDeliveryDay} - ${order?.courier_details?.maxDeliveryDay}`,
  };

  const deliveryNotes = {
    title: "Delivery Notes",
    additionalDetail: order?.shipping_details?.deliveryNotes,
  };
  return (
    <div className="shipping-billing-grid">
      <OrderInfoCard
        title={shipping.title}
        bodyMain={shipping.bodyMain}
        additionalDetail={shipping.additionalDetail}
        footer={shipping.footer}
      />

      <OrderInfoCard
        title={payment.title}
        bodyMain={payment.bodyMain}
        additionalDetail={payment.additionalDetail}
      />

      {order?.shipping_details?.deliveryNotes && (
        <OrderInfoCard
          title={deliveryNotes.title}
          additionalDetail={deliveryNotes.additionalDetail}
        />
      )}

      <OrderInfoCard
        title={delivery.title}
        bodyMain={delivery.bodyMain}
        additionalDetail={delivery.additionalDetail}
        footer={delivery.footer}
      />
    </div>
  );
};
