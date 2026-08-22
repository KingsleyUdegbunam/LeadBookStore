import useEmblaCarousel from "embla-carousel-react";
import { BookCard } from "../../../component/BookCard";
import { filterBooks } from "../utilities";
import featureImage from "../../../assets/featureImage.webp";
import { CarouselWrapper } from "../../carousel/CarouselWrapper";
import { CarouselButton } from "../../carousel/CarouselButton";
import "./FeatureSection.css";

export function FeatureSection() {
  const array = filterBooks(10, "primaryCollection", "lead her");

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

  return (
    <section className="highlight section">
      <div className="pages-wrapper-variation feature-section-wrapper">
        <div className="carousel-section-header">
          <div className="feature-header">
            <h2 className="header">Curated for Her</h2>
          </div>
          <CarouselButton emblaApi={emblaApi} />
        </div>
        <div>
          <CarouselWrapper emblaRef={emblaRef} array={array}>
            {(book) => <BookCard book={book} />}
          </CarouselWrapper>
        </div>

        <div className="highlightImg-container">
          <img src={featureImage} alt="potrait of different ladies" />
        </div>
      </div>
    </section>
  );
}
