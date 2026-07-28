import { books } from "../../data/inventory";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
("../../component/BookCardRecommendationCard");
import ProductData from "../../feature/product-page/ProductData";
import BookRecommendationGrid from "../../component/product/BookRecommendationGrid";

export default function ProductPage() {
  const { id } = useParams();
  const bookId = Number(id);

  const book = books.find((book) => book.id === Number(id));

  return (
    <>
      <section className="pages-wrapper main-container">
        <ProductData book={book} />

        <article className="recommendation">
          <h3 className="product-header">Related Reads</h3>
          <BookRecommendationGrid id={bookId} selectedBook={book} />
        </article>
      </section>
    </>
  );
}
