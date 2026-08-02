import React from "react";
import MarqueGroup from "../../../component/home/MarqueGroup";
import "./Marque.css";

export const Marque = () => {
  return (
    <article className="marque">
      <MarqueGroup primary={true} />
      <MarqueGroup />
      <MarqueGroup />
      <MarqueGroup />
    </article>
  );
};
