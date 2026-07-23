import { convertToNaira } from "../../utilities/money";

export function OrderSummary({ order }) {
  {
    if (order)
      return (
        <>
          <div className="order-items">
            {order.items.map((item) => {
              return (
                <article key={item.id} className="order-item-grid">
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

          {/* Order Breakdown */}
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
        </>
      );
  }
}
