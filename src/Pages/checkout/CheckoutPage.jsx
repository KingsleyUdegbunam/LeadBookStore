import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
// import { DiscountField } from "../../feature/checkout/components/DiscountField";
import { TotalCost } from "../../feature/checkout/components/TotalCost";
import { ShippingInfo } from "../../feature/checkout/components/ShippingInfo";
import { CartItemsSummary } from "../../feature/checkout/components/CartItemsSummary";
import { CheckoutDetailSummary } from "../../feature/checkout/components/CheckoutDetailSummary";
import { initiatePayment } from "../../feature/checkout/utilities";
import { convertToNaira } from "../../utilities/money";
import "./CheckoutPage.css";

export default function CheckoutPage({
  setCart,
  cartInDetail,
  cartTotalPrice,
}) {
  // Shouldn't we have the house number as well?
  const [shippingDetails, setShippingDetails] = useState({
    country: "Nigeria",
    state: "",
    city: "",
    address: "",
    tel: "",
    email: "",
    firstName: "",
    lastName: "",
    deliveryNotes: "",
  });

  const [selectedShipping, setSelectedShipping] = useState({});
  const [showShippingDetailsForm, setShowShippingDetailsForm] = useState(true);
  const [showShippingOptForm, setShowShippingOptForm] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [editingForm, setEditingForm] = useState(null);

  const shippingDetailsFormRef = useRef(null);
  const deliveryOptionsFormRef = useRef(null);

  // Scrolll to top to properly display summary when shown
  useEffect(() => {
    !showShippingDetailsForm &&
      !showShippingOptForm &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  }, [showShippingDetailsForm, showShippingOptForm]);

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
            shippingDetails={shippingDetails}
          />

          {showSummary && (
            <CheckoutDetailSummary
              shippingDetailsFormRef={shippingDetailsFormRef}
              deliveryOptionsFormRef={deliveryOptionsFormRef}
              editingForm={editingForm}
              setEditingForm={setEditingForm}
              shippingDetails={shippingDetails}
              selectedShipping={selectedShipping}
              setShowShippingDetailsForm={setShowShippingDetailsForm}
              setShowShippingOptForm={setShowShippingOptForm}
              convertToNaira={convertToNaira}
            />
          )}

          <ShippingInfo
            shippingDetailsFormRef={shippingDetailsFormRef}
            deliveryOptionsFormRef={deliveryOptionsFormRef}
            showSummary={showSummary}
            showShippingOptForm={showShippingOptForm}
            showShippingDetailsForm={showShippingDetailsForm}
            setShowShippingDetailsForm={setShowShippingDetailsForm}
            setShowShippingOptForm={setShowShippingOptForm}
            setShowSummary={setShowSummary}
            selectedShipping={selectedShipping}
            setSelectedShipping={setSelectedShipping}
            shippingDetails={shippingDetails}
            setShippingDetails={setShippingDetails}
            cartTotalPrice={cartTotalPrice}
            cartInDetail={cartInDetail}
            setCart={setCart}
            initiatePayment={initiatePayment}
          />
        </div>
      </section>
    </section>
  );
}
