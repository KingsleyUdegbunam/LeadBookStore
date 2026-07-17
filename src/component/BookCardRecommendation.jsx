import { convertToNaira } from "../utilities/money";
import { Link } from "react-router-dom";
import "./BookCard.css";
export function BookCardRecommendation({
  addToCart,
  book,
  image,
  category,
  title,
  priceInKobo,
  id,
}) {
  return (
    <div className="product product-rec  product-grid">
      <Link className="image-container-rec" to={`/product/${id}`}>
        <img src={image} alt="Book image" />
        <p className="category">{category.replace("lead ", "")}</p>
      </Link>
      <Link className="product-link" to={`/product/${id}`}>
        <div className="book-details-rec">
          <p className="title title-rec hover-red">{title}</p>

          <p className="author author-rec">{book.author}</p>

          <p className="price">{convertToNaira(priceInKobo)}</p>
        </div>
      </Link>

      <button className="add-to-cart-rec" onClick={() => addToCart(book)}>
        ADD TO CART
      </button>
    </div>
  );
}
