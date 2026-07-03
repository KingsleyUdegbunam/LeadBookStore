export function DiscountField({ convertToNaira }) {
  return (
    <div className="discount-field-container">
      <div className="discount-field">
        <label htmlFor="discount">
          <input
            placeholder="Enter Discount Code"
            type="text"
            name="discount"
            id="discount"
          />
        </label>
        <button className="discount-btn-default">APPLY</button>
      </div>
      <div className="discount-display-text">
        <p>Total Savings: {convertToNaira(0)}*</p>
      </div>
    </div>
  );
}
