import { ShippingOptions } from "./ShippingOptions";
import { ShippingDetails } from "./ShippingDetails";

export function ShippingInfo({
  address,
  setAddress,
  showShippingOptForm,
  selectedShipping,
  setSelectedShipping,
  showShippingDetailsForm,
  shippingDetails,
  setShippingDetails,
}) {
  //Shipping options only gets set when the user have passed in their state in the select dropdown.
  //This is solely because we need to know if the user is a resident of FCT which have a lower shipping rate.

  //handleStateChange function takes the user State selection but most importantly, set the city to empty string. This is intentional as leaving a previous city in the address object will be cause false information.
  //Also, we re-evaluate the shipping option again to know if isAbuja is true.

  return (
    <>
      {showShippingOptForm && (
        <ShippingOptions
          address={address}
          setAddress={setAddress}
          selectedShipping={selectedShipping}
          setSelectedShipping={setSelectedShipping}
        />
      )}

      {showShippingDetailsForm && (
        <ShippingDetails
          address={address}
          shippingDetails={shippingDetails}
          setShippingDetails={setShippingDetails}
        />
      )}
    </>
  );
}
