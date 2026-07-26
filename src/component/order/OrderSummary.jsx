import { convertToNaira } from "../../utilities/money";
import "./OrderSummary.css";

export function BooksPurchased({ order }) {
  {
    if (!order) return null;
    return (
      <>
        <div className="order-items-mobile">
          {order.items.map((item) => {
            return (
              <article key={item.id} className="order-item-grid mobile">
                <div className="order-img-container">
                  <img src={item.coverImage} height={56} alt="" />
                </div>

                <div className="order-item-txt">
                  <div>
                    <p className="order-item-title">{item.title}</p>
                    <p className="order-item-author">{item.author}</p>
                  </div>

                  <div className="order-item-qty">
                    <p>{`Qty: ${item.quantity} x ${convertToNaira(item.price.paperback)}`}</p>
                  </div>
                </div>
                <div className="order-item-price">
                  <p>{convertToNaira(item.totalPrice)}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* DESKTOP */}
        <div className="order-items-desktop">
          <header className="books-purchased-header desktop">
            <p className="purchased-book">Book</p>
            <p className="purchased-book-author">Author</p>
            <p className="purchased-book-qty">Quantity</p>
            <p className="purchased-book-price">Price</p>
            <p className="purchased-book-total">Total</p>
          </header>
          {order.items.map((item) => {
            return (
              <article key={item.id} className="order-item-grid-desktop">
                <div className="book-img-n-title">
                  <div className="order-img-container">
                    <img src={item.coverImage} height={56} alt="" />
                  </div>
                  <p className="book-purchased-title">{item.title}</p>
                </div>

                <p>{item.author}</p>

                <p className="book-purchased-quantity">{item.quantity}</p>

                <p>{convertToNaira(item.price.paperback)}</p>

                <div>
                  <p>{convertToNaira(item.totalPrice)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </>
    );
  }
}

export function OrderCostBreakDown({ order }) {
  if (!order) return null;
  return (
    <div className="cost-summation">
      <div className="subtotal-delivery">
        <div className="order-cost-fraction">
          <p className="cost-summation-title">Subtotal</p>
          <p className="cost-summation-money">
            {convertToNaira(order.subtotal)}
          </p>
        </div>
        <div className="order-cost-fraction">
          <p className="cost-summation-title">Delivery</p>
          <p className="cost-summation-money">
            {convertToNaira(order.courier_details.costInCents)}
          </p>
        </div>
      </div>

      <div className="cost-summation-total">
        <p className="cost-summation-total-title">Total</p>
        <p className="cost-summation-total-money">
          {convertToNaira(order.total)}
        </p>
      </div>
    </div>
  );
}
