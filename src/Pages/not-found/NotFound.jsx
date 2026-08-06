import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../../assets/error-image.png";
import "./NotFound.css";

export const NotFound = () => {
  return (
    <section className="error-wrapper  pages-wrapper">
      <div className="error-image-wrapper">
        <img className="error-image" src={errorImage} alt="error 404 image" />
      </div>
      <div className="error-content">
        <div className="error-text-container">
          <h1 className="error-header">
            Somewhere between the shelves<span className="color-brand">.</span>
          </h1>
          <p className="error-body">
            The page you're looking for isn't here, but there's plenty worth
            discovering.
          </p>
        </div>
        <div className="error-btns">
          <Link to="/" replace className="button-primary">
            Back to Home
          </Link>
          <Link to="/shop" className="error-browse button-ghost">
            Browse Books
          </Link>
        </div>
      </div>
    </section>
  );
};
