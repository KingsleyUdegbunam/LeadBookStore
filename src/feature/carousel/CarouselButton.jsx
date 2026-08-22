import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "./CarouselButton.css";
import { useEffect, useState } from "react";

export const CarouselButton = ({ emblaApi }) => {
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const toggleButtonsDisabled = (emblaApi) => {
    setPrevButtonDisabled(!emblaApi.canScrollPrev());
    setNextButtonDisabled(!emblaApi.canScrollNext());
  };

  useEffect(() => {
    if (!emblaApi) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    toggleButtonsDisabled(emblaApi);
    emblaApi.on("reInit", toggleButtonsDisabled);
    emblaApi.on("select", toggleButtonsDisabled);
  }, [emblaApi]);

  return (
    <div className="carousel-btn-container">
      <button
        className="embla__prev embla__button button-secondary"
        onClick={scrollPrev}
        disabled={prevButtonDisabled}
      >
        <FaChevronLeft />
      </button>
      <button
        className="embla__next embla__button button-secondary"
        onClick={scrollNext}
        disabled={nextButtonDisabled}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};
