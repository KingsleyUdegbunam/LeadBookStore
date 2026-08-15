import { convertToNaira } from "../utilities/money";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState, useRef } from "react";
import { IoMdCheckmark } from "react-icons/io";
import "./BookCard.css";

export function BookCard({ book, index }) {
  const { id, coverImage, price, title, author } = book;
  const [isAdded, setIsAdded] = useState(false);
  const timeoutRef = useRef(null);
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleAddToCart = (id) => {
    addToCart(id);
    setIsAdded(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };
  const { addToCart } = useCart();
  return (
    <div key={index} className="product product-grid">
      <div className="book-details">
        <Link className="product-link" to={`/product/${id}`}>
          <div className="image-container">
            <img src={coverImage} alt="Book image" />
            {/* <p className="category">{primaryCollection.replace("lead ", "")}</p> */}
          </div>
        </Link>

        <Link className="product-link book-details" to={`/product/${id}`}>
          <p className="title">{title}</p>

          <p className="author">{author}</p>

          <p className="price">{convertToNaira(price.paperback)}</p>
        </Link>
      </div>

      <button
        className={`button-primary button-full-width add-cart-btn ${isAdded ? "is-added" : ""}`}
        onClick={() => handleAddToCart(id)}
      >
        {isAdded ? (
          <span className="added-to-cart">
            <IoMdCheckmark /> Added
          </span>
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
}
