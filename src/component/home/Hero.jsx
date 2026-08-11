import React from "react";
import { Link } from "react-router-dom";
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
          <Link to="/shop" className="button-primary button-link">
            Shop Now
          </Link>
        </div>
      </section>
    </section>
  );
};
