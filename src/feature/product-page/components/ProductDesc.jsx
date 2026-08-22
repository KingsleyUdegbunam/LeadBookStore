import React from "react";

const ProductDesc = ({ book }) => {
  return (
    <article className="desc-container">
      <h3 className="product-details-header">Description</h3>
      <div className="desc-text-container">
        <h4 className="product-header">{book.header}</h4>
        <h4 className="product-subheader">{book.subheader}.</h4>
        <p className="book-desc">{book.description}</p>
      </div>
    </article>
  );
};

export default ProductDesc;
