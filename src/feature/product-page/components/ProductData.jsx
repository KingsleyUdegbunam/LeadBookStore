import ProductCard from "./ProductCard";
import ProductDesc from "./ProductDesc";
import ProductDetails from "./ProductDetails";
import "./ProductData.css";

const ProductData = ({ book }) => {
  return (
    <div className="pages-wrapper">
      <ProductCard book={book} />
      <ProductDesc book={book} />
      <ProductDetails book={book} />
    </div>
  );
};

export default ProductData;
