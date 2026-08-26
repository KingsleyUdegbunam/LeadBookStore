import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useCart } from "../../../context/CartContext";
import { convertToNaira } from "../../../utilities/money";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { getShippingOptions } from "../../checkout/utilities";
import "./CartCostSummary.css";

export const CartCostSummary = () => {
  const { cartTotalPrice, cart } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <div className="cart-cost-wrapper">
      <div className="cart-item-summary">
        <div className="cart-cost-summary-flex">
          <p className="subtotal-text">{`Subtotal (${cart.length} item${cart.length > 1 ? "s" : ""})`}</p>

          <p className="subtotal-value">{convertToNaira(cartTotalPrice)}</p>
        </div>
        <div className="estimated-delivery cart-cost-summary-flex">
          <div className="subtotal-text-icon-wrapper">
            <p className="">Delivery</p>{" "}
            <Tooltip.Root open={open}>
              <Tooltip.Trigger asChild>
                <button
                  className="delivery-info-icon"
                  aria-label="Delivery information"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen((prev) => !prev);
                  }}
                >
                  <IoMdInformationCircleOutline size={16} />
                </button>
              </Tooltip.Trigger>

              <Tooltip.Portal>
                <Tooltip.Content
                  side="top"
                  align="center"
                  sideOffset={0}
                  className="delivery-tooltip"
                >
                  Delivery cost may vary depending on your location, courier
                  availability, and public holidays.
                  <Tooltip.Arrow className="delivery-tooltip-arrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>
          <p>
            {cartTotalPrice
              ? convertToNaira(getShippingOptions("FCT (Abuja)")[0].costInCents)
              : convertToNaira(0)}
          </p>
        </div>
      </div>
      <div className="estimated-total">
        <p>Estimated Total:</p>
        <p>
          {cartTotalPrice
            ? convertToNaira(
                getShippingOptions("FCT (Abuja)")[0].costInCents +
                  cartTotalPrice,
              )
            : convertToNaira(0)}
        </p>
      </div>
    </div>
  );
};
