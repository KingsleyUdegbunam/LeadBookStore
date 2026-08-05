import React from "react";
import image from "../../assets/about-header.jpg";
import "./AboutHeader.css";

export const AboutHeader = () => {
  return (
    <header className="contact-header about-hero-header">
      <div className="contact-header-wrapper about-hero-wrapper pages-wrapper-variation">
        <div className="header-text">
          <h2 className="contact-h2">About</h2>
          <h1 className="contact-subheader about-subheader">
            Leadership is our genre.{" "}
            <span className="about-header-2-span">
              Great books are our medium<span className="color-brand">.</span>
            </span>
          </h1>
          <p className="contact-page-desc">
            We curate thoughtful books that help people think deeper, lead
            better, and grow into who they&#39;re meant to be.
          </p>
        </div>
        <div className="image-wrapper">
          <img src={image} alt="The team hands together" />
        </div>
      </div>
    </header>
  );
};
