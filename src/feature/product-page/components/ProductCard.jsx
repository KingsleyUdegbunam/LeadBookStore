import React from "react";
import { useCart } from "../../../context/CartContext";

const ProductCard = ({ book }) => {
  const { addToCart } = useCart();
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
        className="book-to-cart"
        onClick={() => {
          addToCart(book);
        }}
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
