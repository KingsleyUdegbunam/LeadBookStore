import React from "react";
import { BookCard } from "../BookCard";
import { BookGrid } from "../BookGrid";
import "./HomeSection.css";

export const HomeSection = ({ header, array, layout = "grid" }) => {
  if (layout === "slider")
    return (
      <section className="slider-container section">
        <h2 className="header">{header}</h2>
        <article className="products-container slider">
          {array.map((book, index) => (
            <BookCard book={book} key={index} />
          ))}
        </article>
      </section>
    );
  else if (layout === "grid")
    return (
      <section className="section ">
        <h2 className="header grid">{header}</h2>
        {<BookGrid books={array} />}
      </section>
    );
  else {
    return;
  }
};
