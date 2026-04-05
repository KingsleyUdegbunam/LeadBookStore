import { convertToNaira } from "../utilities/money";
import { Link } from "react-router-dom";
import "./BookCard.css";

export function BookCard({
  addToCart,
  book,
  image,
  category,
  title,
  priceInKobo,
  id,
}) {
  return (
    <div className="product product-grid">
      <div className="book-details">
        <Link className="product-link" to={`/product/${id}`}>
          <div className="image-container">
            <img src={image} alt="Book image" />
            <p className="category">{category.replace("lead ", "")}</p>
          </div>
        </Link>

        <Link className="product-link" to={`/product/${id}`}>
          <p className="title">{title}</p>
        </Link>

        <p className="author">{book.author}</p>

        <p className="price">{convertToNaira(priceInKobo)}</p>
      </div>

      <button className="add-to-cart" onClick={() => addToCart(book)}>
        ADD TO CART
      </button>
    </div>
  );
}
