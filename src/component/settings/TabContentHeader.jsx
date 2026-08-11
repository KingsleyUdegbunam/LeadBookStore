import React from "react";

export const TabContentHeader = ({ title, desc, icon }) => {
  return (
    <header className="profile-header">
      <div className="profile-icon-wrapper">{icon}</div>
      <div>
        <h2 className="profile-title">{title}</h2>
        <p className="profile-desc">{desc}</p>
      </div>
    </header>
  );
};
