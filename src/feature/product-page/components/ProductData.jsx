import React from "react";
import ProductCard from "./ProductCard";
import ProductDesc from "./ProductDesc";
import ProductDetails from "./ProductDetails";
import "./ProductData.css";

const ProductData = ({ book }) => {
  return (
    <>
      <ProductCard book={book} />
      <ProductDesc book={book} />
      <ProductDetails book={book} />
    </>
  );
};

export default ProductData;
