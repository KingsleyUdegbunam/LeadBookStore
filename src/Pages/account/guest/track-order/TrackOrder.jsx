import { useState } from "react";
import { TextInput } from "../../../../component/general/inputs/TextInput";
import { useNavigate } from "react-router-dom";
import "./TrackOrder.css";
import { supabase } from "../../../../utilities/supabase";
import { toast } from "sonner";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { LuPackageSearch } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";

export const TrackOrder = () => {
  const [trackingDetails, setTrackingDetails] = useState({
    email: "",
    reference: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const enableBtn =
    trackingDetails.email.trim().length > 0 &&
    trackingDetails.reference.trim().length > 0;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!trackingDetails.email.trim() || !trackingDetails.reference.trim())
      return;

    setIsLoading(true);
    try {
      const { data: order, error } = await supabase.functions.invoke(
        "track-order",
        {
          body: trackingDetails,
        },
      );

      if (error) {
        throw error;
      }

      const ref = order.reference;
      sessionStorage.setItem(`order:${ref}`, JSON.stringify(order));
      navigate(`/order-tracking/${ref}`, { state: { order } });
    } catch (e) {
      if (e instanceof FunctionsHttpError) {
        const errorObject = await e.context.json();
        toast.error(errorObject.error);
      } else {
        toast.error(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="pages-wrapper">
      <div className="guest-tracking-page-wrapper">
        <header className="track-order">
          <div className="track-order-icon-wrapper">
            <LuPackageSearch />
          </div>
          <div className="header-text">
            <h2>Track Order</h2>
            <p className="text-secondary">
              Enter your email and order reference to track your order status in
              real time.
            </p>
          </div>
        </header>
        <div className="guest-tracking-body">
          <form className="guest-track-form" onSubmit={handleSubmit}>
            <TextInput
              id="order reference"
              label="Reference ID"
              placeholder="e.g. T282367490286042"
              value={trackingDetails.reference}
              onChange={(e) => {
                const value = e.target.value;

                setTrackingDetails((prev) => ({ ...prev, reference: value }));
              }}
            />
            <TextInput
              id="order-email"
              label="Email"
              placeholder="e.g. you@example.com"
              value={trackingDetails.email}
              onChange={(e) => {
                const value = e.target.value;

                setTrackingDetails((prev) => ({ ...prev, email: value }));
              }}
            />

            <button
              className="button-primary"
              disabled={isLoading || !enableBtn}
              type="submit"
            >
              {isLoading ? (
                "Tracking order..."
              ) : (
                <span className="track-conditional-txt">
                  Track Order <FaArrowRight />
                </span>
              )}
            </button>
          </form>

          <div className="track-order-help">
            <p>Don't have your reference ID?</p>
            <p className="emphasize-little">
              {" "}
              Check your email for your order confirmation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
