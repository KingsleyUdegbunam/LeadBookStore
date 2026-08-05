import React from "react";
import { WeStandCard } from "../../component/about/WeStandCard";
import "./WeStandFor.css";

export const WeStandFor = () => {
  const cardContent = [
    {
      digit: "01",
      title: "Curated with Intention",
      body: "Every book earns its place on our shelves through thoughtful selection, not popularity.",
    },
    {
      digit: "02",
      title: "Leadership First",
      body: "Every collection is built around the people we hope to equip, inspire, and challenge.",
    },
    {
      digit: "03",
      title: "Made to Be Applied",
      body: "Every book offers ideas you can use in everyday life.",
    },
    {
      digit: "04",
      title: "Every Leader Matters",
      body: "From young readers finding confidence to experienced leaders refining their craft, there's a shelf for every journey.",
    },
  ];

  return (
    <section className="about-sections desktop-about-contact-grid">
      <div className="stand-for-header our-story-subcontent-1">
        <h2 className="about-section-header">What we stand for</h2>

        <p className="about-body-text">
          Every book we choose reflects these principles.
        </p>
      </div>
      <div className="cards-wrapper">
        {cardContent.map((card, index) => (
          <WeStandCard
            key={index}
            digit={card.digit}
            title={card.title}
            body={card.body}
          />
        ))}
      </div>
    </section>
  );
};
