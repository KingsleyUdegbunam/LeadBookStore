import { Link } from "react-router-dom";
import { useState } from "react";
// import { DiscountField } from "../../feature/checkout/components/DiscountField";
import { TotalCost } from "../../feature/checkout/components/TotalCost";
import { ShippingInfo } from "../../feature/checkout/components/ShippingInfo";
import { ActionButton } from "../../feature/checkout/components/ActionButton";
import { CartItemsSummary } from "../../feature/checkout/components/CartItemsSummary";
import { CheckoutDetailSummary } from "../../feature/checkout/components/CheckoutDetailSummary";
import { initiatePayment } from "../../feature/checkout/utilities";
import { convertToNaira } from "../../utilities/money";
import "./CheckoutPage.css";

export default function CheckoutPage({
  cart,
  setCart,
  cartInDetail,
  cartTotalPrice,
}) {
  // Shouldn't we have the house number as well?
  const [address, setAddress] = useState({
    country: "Nigeria",
    state: "",
    city: "",
  });

  const [shippingDetails, setShippingDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    tel: "",
  });

  const [selectedShipping, setSelectedShipping] = useState(null);

  const [showShippingDetailsForm, setShowShippingDetailsForm] = useState(true);
  const [showShippingOptForm, setShowShippingOptForm] = useState(true);

  const [showSummary, setShowSummary] = useState(false);

  // Is the display of forms a good qualifier for being ready to pay?
  const isReadyToPay = !showShippingDetailsForm && !showShippingOptForm;

  console.log(shippingDetails);
  console.log(address);

  console.log(cart);

  return (
    <section className="checkout-section">
      {/* A conditional based on cart should be added for empty state */}
      <section className="main-section">
        <div className="checkout-header">
          <h2>Your Order</h2>
          <Link className="checkout-links" to={"/cart"}>
            <p>Edit Your Cart</p>
          </Link>
        </div>

        <CartItemsSummary
          cartInDetail={cartInDetail}
          convertToNaira={convertToNaira}
        />

        <div className="checkout-main">
          {/* Should we remove discount? */}
          {/* {!isReadyToPay && <DiscountField convertToNaira={convertToNaira} />} */}

          {/* COST DIPSPLAY */}
          <TotalCost
            convertToNaira={convertToNaira}
            cartTotalPrice={cartTotalPrice}
            selectedShipping={selectedShipping}
          />

          {showSummary && (
            <CheckoutDetailSummary
              shippingDetails={shippingDetails}
              selectedShipping={selectedShipping}
              setShowShippingDetailsForm={setShowShippingDetailsForm}
              setShowShippingOptForm={setShowShippingOptForm}
              convertToNaira={convertToNaira}
            />
          )}

          <ShippingInfo
            address={address}
            setAddress={setAddress}
            showShippingOptForm={showShippingOptForm}
            showShippingDetailsForm={showShippingDetailsForm}
            shippingDetails={shippingDetails}
            setShippingDetails={setShippingDetails}
            selectedShipping={selectedShipping}
            setSelectedShipping={setSelectedShipping}
          />

          <ActionButton
            isReadyToPay={isReadyToPay}
            cartTotalPrice={cartTotalPrice}
            cartInDetail={cartInDetail}
            shippingDetails={shippingDetails}
            selectedShipping={selectedShipping}
            address={address}
            setCart={setCart}
            setShowSummary={setShowSummary}
            initiatePayment={initiatePayment}
          />
        </div>
      </section>
    </section>
  );
}
