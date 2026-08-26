import "./CarouselWrapper.css";
export const CarouselWrapper = ({ children, emblaRef, array }) => {
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {array.map((book, index) => (
            <div className="embla__slide" key={index}>
              {children(book)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
