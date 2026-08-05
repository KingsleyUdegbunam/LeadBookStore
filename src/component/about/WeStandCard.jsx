import React from "react";
import "./WeStandCard.css";

export const WeStandCard = ({ digit, title, body }) => {
  return (
    <article className="about-card">
      <div className="about-card-header">
        <p className="about-card-digit">{digit}</p>
        <p className="about-card-title">{title}</p>
      </div>
      <div className="about-card-text">
        <p className="about-card-body">{body}</p>
      </div>
    </article>
  );
};
