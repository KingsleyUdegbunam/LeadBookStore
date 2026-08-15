import { useCart } from "../../../context/CartContext";
import { useState, useEffect, useRef } from "react";
import { IoMdCheckmark } from "react-icons/io";

const ProductCard = ({ book }) => {
  const { addToCart } = useCart();

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
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={book.coverImage} alt={`Image of ${book.title} book`} />
      </div>
      <div className="product-author-and-title">
        <h2 className="book-title">{book.title}</h2>
        <p className="book-authur">{`by ${book.author}`}</p>
      </div>

      <button
        className={`book-to-cart button-primary ${isAdded ? "is-added" : ""}`}
        onClick={() => {
          handleAddToCart(book.id);
        }}
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
};

export default ProductCard;
