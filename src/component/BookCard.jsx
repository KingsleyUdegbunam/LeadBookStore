import { convertToNaira } from "../utilities/money";

export function BookCard({ image, category, name, priceInKobo }) {
  return (
    <div className="product product-grid">
      <div className="image-and-category-container">
        <div className="image-container">
          <img src={image} alt="Book image" />
        </div>
        <p className="category">{category}</p>
        <p className="title">{name}</p>
        <p className="price">{convertToNaira(priceInKobo)}</p>
      </div>
      <div className="product-details">
        <div className="grouped-details"></div>
        <button className="add-to-cart">ADD TO CART</button>
      </div>
    </div>
  );
}
