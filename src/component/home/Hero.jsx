import React from "react";
import "./Hero.css";

export const Hero = () => {
  return (
    <section className="hero">
      <section className="hero-text pages-wrapper-variation">
        <div className="landing-text">
          <h1>Building Tomorrow's Leaders. One Book at a Time.</h1>
          <p className="supporting-h1">
            Curated bookstore of premium reads centered around leadership
            carefully handpicked and ready to unlock the leader in you.
          </p>
        </div>
        <div className="quick-action-btns">
          <button className="button-primary">Shop Now</button>
        </div>
      </section>
    </section>
  );
};
