import { books } from "../../data/inventory";
import { useParams } from "react-router-dom";
import ProductData from "../../feature/product-page/components/ProductData";
import BookRecommendationGrid from "../../component/product/BookRecommendationGrid";
import useEmblaCarousel from "embla-carousel-react";
import { CarouselButton } from "../../feature/carousel/CarouselButton";
import "./ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();
  const bookId = Number(id);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    slidesToScroll: 1,

    breakpoints: {
      "(min-width: 768px)": {
        slidesToScroll: 3,
      },
      "(min-width: 1024px)": {
        slidesToScroll: 5,
      },
    },
  });

  const book = books.find((book) => book.id === Number(id));

  return (
    <>
      <section className="pages-wrapper main-container product-page">
        <ProductData book={book} />

        <article className="recommendation">
          <div className="recommendation-header">
            <h3 className="product-header">Related Reads</h3>
            <CarouselButton emblaApi={emblaApi} />
          </div>
          <BookRecommendationGrid
            id={bookId}
            selectedBook={book}
            emblaRef={emblaRef}
          />
        </article>
      </section>
    </>
  );
}
