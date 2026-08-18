import React from "react";
import { SlPrinter } from "react-icons/sl";
import { SignUpPostCheckoutForm } from "./SignUpPostCheckout";
import { convertToNaira } from "../../../utilities/money";
import orderBox from "../../../assets/order-box.webp";
import dayjs from "dayjs";
import "./Banner.css";

export function GuestBanner({ order }) {
  return (
    <div className="banner-and-signup">
      <div className="banner-signup-wrapper pages-wrapper-variation">
        <section className="banner-section">
          <div className="banner-section-wrapper order-section-wrapper">
            <div>
              <p className="orderpage-header">
                Thanks you for{" "}
                <span className="header-red">shopping with us!</span>
              </p>
            </div>

            <div className="order-img-wrapper">
              <img
                loading="eager"
                className="post-checkout-hero-img"
                width={3692}
                height={2649}
                src={orderBox}
                alt="Order box"
              />
            </div>

            <p className="order-details-header hero-msg-support">
              Your books are being carefully prepared for shipment.
            </p>

            <div className="order-details">
              <div>
                <p className="order-details-header">
                  An email confirmation has been sent to
                </p>

                <p className="order-details-detail">
                  {order.shipping_details.email}
                </p>
              </div>

              <div className="user-order-details">
                <div>
                  <p className="order-details-header">Order Ref.</p>

                  <p className="order-details-detail">{order.reference}</p>
                </div>
                <div>
                  <p className="order-details-header">Order Date</p>

                  <p className="order-details-detail">
                    {dayjs(order.created_at).format("D, MMM YYYY h:mm A")}
                  </p>
                </div>
                <div>
                  <p className="order-details-header">Order Total</p>

                  <p className="order-details-detail">
                    {convertToNaira(order.total)}
                  </p>
                </div>
              </div>
            </div>

            <button className="print-btn">
              <SlPrinter />
              <p className="order-details-header">Print receipt</p>
            </button>
          </div>
        </section>

        <section className="signup-checkout pages-wrapper-variaton order-section-wrapper">
          <SignUpPostCheckoutForm
            prefilledEmail={order?.email}
            lastName={order?.shipping_details?.lastName}
            firstName={order?.shipping_details?.firstName}
          />
        </section>
      </div>
    </div>
  );
}

export function AuthenticatedBanner({ order }) {
  return (
    <section className="banner-section-authenticated">
      <div className="authenticated-banner-wrapper pages-wrapper-variation">
        <div>
          <p className="orderpage-header">
            Thanks you for <span className="header-red">shopping with us!</span>
          </p>
        </div>

        <div className="order-img-wrapper">
          <img
            loading="eager"
            className="post-checkout-hero-img"
            width={3692}
            height={2649}
            src={orderBox}
            alt="Order box"
          />
        </div>

        <p className="order-details-header hero-msg-support">
          Your books are being carefully prepared for shipment.
        </p>

        <div className="order-details">
          <div>
            <p className="order-details-header">
              An email confirmation has been sent to
            </p>

            <p className="order-details-detail">
              {order.shipping_details.email}
            </p>
          </div>

          <div className="user-order-details">
            <div>
              <p className="order-details-header">Order Ref.</p>

              <p className="order-details-detail">{order.reference}</p>
            </div>
            <div>
              <p className="order-details-header">Order Date</p>

              <p className="order-details-detail">
                {dayjs(order.created_at).format("D, MMM YYYY h:mm A")}
              </p>
            </div>
            <div>
              <p className="order-details-header">Order Total</p>

              <p className="order-details-detail">
                {convertToNaira(order.total)}
              </p>
            </div>
          </div>
        </div>

        <button className="print-btn">
          <SlPrinter />
          <p className="order-details-header">Print receipt</p>
        </button>
      </div>
    </section>
  );
}
