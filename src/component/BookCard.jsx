import { convertToNaira } from "../utilities/money";
import "./BookCard.css";

export function BookCard({
  addToCart,
  book,
  image,
  category,
  title,
  priceInKobo,
}) {
  return (
    <div className="product product-grid">
      <div className="book-details">
        <div className="image-and-title">
          <div className="image-container">
            <img src={image} alt="Book image" />
          </div>
          <div className="category-and-title">
            <p className="category">{category}</p>
            <p className="title">{title}</p>
          </div>
        </div>

        <p className="price">{convertToNaira(priceInKobo)}</p>
      </div>

      <button className="add-to-cart" onClick={() => addToCart(book)}>
        ADD TO CART
      </button>
    </div>
  );
}
