import { books } from "../../data/inventory";
import { useParams } from "react-router-dom";
import ProductData from "../../feature/product-page/components/ProductData";
import BookRecommendationGrid from "../../component/product/BookRecommendationGrid";
import "./ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();
  const bookId = Number(id);

  const book = books.find((book) => book.id === Number(id));

  return (
    <>
      <section className="pages-wrapper main-container product-page">
        <ProductData book={book} />

        <article className="recommendation">
          <h3 className="product-header">Related Reads</h3>
          <BookRecommendationGrid id={bookId} selectedBook={book} />
        </article>
      </section>
    </>
  );
}
