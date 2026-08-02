import "./CartItemsSummary.css";

export function CartItemsSummary({ cartInDetail, convertToNaira }) {
  return (
    <div className="item-cards">
      {cartInDetail.map((item) => (
        <article key={item.id} className="checkout-item-card">
          <div className="checkout-image-container">
            <img className="img" src={item.coverImage} alt="" />
          </div>
          <div>
            <p className="checkout-item-title">{item.title}</p>
            <p className="checkout-author">{item.author}</p>
            <p className="checkout-price-and-quantity">
              {item.quantity} x {convertToNaira(item.price.paperback)} Paperback
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
