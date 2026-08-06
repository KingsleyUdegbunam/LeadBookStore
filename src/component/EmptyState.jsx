import React from "react";
import "./EmptyState.css";

export const EmptyState = ({ image, title, body, actionText, onAction }) => {
  return (
    <section className="empty-state-wrapper">
      <div className="empty-state-image-wrapper">
        <img src={image} alt="" />
      </div>
      <div className="empty-state-text">
        <h2 className="empty-state-header">{title}</h2>
        <p className="empty-state-description">{body}</p>
      </div>

      {actionText && onAction && (
        <button onClick={onAction} className="button-secondary">
          {actionText}
        </button>
      )}
    </section>
  );
};
