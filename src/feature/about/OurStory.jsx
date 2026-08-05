import React from "react";
import story from "../../assets/about-story.jpg";
import "./OurStory.css";

export const OurStory = () => {
  return (
    <section className="about-sections our-story-section desktop-about-contact-grid">
      <div className="about-subheader">
        <h2 className="about-section-header">Our story</h2>
        <div className="our-story-subcontent-1">
          <p className="about-sections-subheader">
            We started with one belief: leadership is{" "}
            <span className="color-brand">learned.</span>
          </p>

          <p className="about-body-text">
            Reading quietly changes people. One idea can reshape how someone
            thinks, decides, or leads. We created LEAD to make those books
            easier to discover—a bookstore built around thoughtful curation
            instead of endless choice.
          </p>
        </div>
      </div>
      <div className="our-story-img-wrapper our-story-subcontent-2">
        <img src={story} alt="A man looking at a bookshelf" />
      </div>
    </section>
  );
};
