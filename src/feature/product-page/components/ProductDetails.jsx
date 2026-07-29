import React from "react";

const ProductDetails = ({ book }) => {
  return (
    <article className="product-details">
      <h3 className="product-details-header">Product Details</h3>
      <div className="product-details-text">
        <div className="row">
          <p>Publisher:</p>
          <p>{book.details.publisher}</p>
        </div>
        <div className="row">
          <p>ISBN:</p>
          <p>{book.details.isbn}</p>
        </div>
        <div className="row">
          <p>Format:</p>
          <p>Paperback / softback</p>
        </div>
        <div className="row">
          <p>Published:</p>
          <p>{book.details.publishedDate}</p>
        </div>
        <div className="row">
          <p>Country of Publication:</p>
          <p>{book.details.countryOfPublication}</p>
        </div>
        <div className="row">
          <p>Language:</p>
          <p>{book.details.language}</p>
        </div>
        <div className="row">
          <p>Genre:</p>
          <p>{book.details.genre}</p>
        </div>
        <div className="row">
          <p>Pages:</p>
          <p>{book.details.pages}</p>
        </div>
        {book.details.awards && (
          <div className="row">
            <p>Award</p>

            <p className="product-award">{book.details.awards}</p>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductDetails;
