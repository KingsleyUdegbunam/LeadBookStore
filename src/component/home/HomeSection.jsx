import { BookCard } from "../BookCard";
import { BookGrid } from "../BookGrid";
import useEmblaCarousel from "embla-carousel-react";
import { CarouselButton } from "../../feature/carousel/CarouselButton";
import { CarouselWrapper } from "../../feature/carousel/CarouselWrapper";
import "./HomeSection.css";

export const HomeSection = ({ header, array, layout = "grid" }) => {
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

  if (layout === "slider") {
    return (
      <section className="slider-container section">
        <div className="carousel-section-header">
          <h2 className="header">{header}</h2>
          <CarouselButton emblaApi={emblaApi} />
        </div>

        <CarouselWrapper array={array} emblaRef={emblaRef}>
          {(book) => <BookCard book={book} />}
        </CarouselWrapper>
      </section>
    );
  } else if (layout === "grid")
    return (
      <section className="section">
        <h2 className="header grid">{header}</h2>
        {<BookGrid books={array} />}
      </section>
    );
  else {
    return;
  }
};
