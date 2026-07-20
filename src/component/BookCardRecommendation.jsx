import { convertToNaira } from "../utilities/money";
import { Link } from "react-router-dom";
import "./BookCard.css";
import { useCart } from "../context/CartContext";

export function BookCardRecommendation({ book }) {
  const { id, coverImage, primaryCollection, price, title, author } = book;
  console.log(book);
  const { addToCart } = useCart();
  return (
    <div className="product product-rec  product-grid">
      <Link className="image-container-rec" to={`/product/${id}`}>
        <img src={coverImage} alt="Book image" />
        <p className="category">{primaryCollection.replace("lead ", "")}</p>
      </Link>
      <Link className="product-link" to={`/product/${id}`}>
        <div className="book-details-rec">
          <p className="title title-rec hover-red">{title}</p>

          <p className="author author-rec">{author}</p>

          <p className="price">{convertToNaira(price.paperback)}</p>
        </div>
      </Link>

      <button className="add-to-cart-rec" onClick={() => addToCart(book)}>
        ADD TO CART
      </button>
    </div>
  );
}
