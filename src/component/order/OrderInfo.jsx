import React from "react";
import OrderInfoCard, { OrderDeliveryInfoCard } from "./OrderInfoCard";

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
    bodyMain: `${order?.courier_details?.minDeliveryDay} - ${order?.courier_details?.maxDeliveryDay}`,
    footer: order?.courier_details.id,
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

      <OrderDeliveryInfoCard
        title={delivery.title}
        bodyMain={delivery.bodyMain}
        footer={delivery.footer}
      />
    </div>
  );
};
