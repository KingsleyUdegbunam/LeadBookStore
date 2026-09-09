import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { TotalCost } from "../../feature/checkout/components/TotalCost";
import { ShippingInfo } from "../../feature/checkout/components/ShippingInfo";
import { CartItemsSummary } from "../../feature/checkout/components/CartItemsSummary";
import { CheckoutDetailSummary } from "../../feature/checkout/components/CheckoutDetailSummary";
import { initiatePayment } from "../../feature/checkout/utilities";
import { convertToNaira } from "../../utilities/money";
import { useCart } from "../../context/CartContext";
import "./CheckoutPage.css";
import { EmptyState } from "../../component/general/states/EmptyState";
import image from "../../assets/empty-states/checkout.svg";

export default function CheckoutPage() {
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

  const { setCart, cartInDetail, cartTotalPrice } = useCart();
  const navigate = useNavigate();

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

  if (cartInDetail.length === 0) {
    return (
      <div className="pages-wrapper">
        <EmptyState
          title="No books to checkout"
          body="Your cart is empty. Add some books before heading to checkout."
          actionText="Back to Shop"
          onAction={() => navigate("/shop")}
          image={image}
        />
      </div>
    );
  }

  return (
    <section className="checkout-section">
      {/* A conditional based on cart should be added for empty state */}
      <section className="pages-wrapper">
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
