import { BsArrowRight } from "react-icons/bs";
import "./CollectionCard.css";

export const CollectionCard = ({ collection }) => {
  return (
    <article className="about-collection-card">
      <p>{collection}</p>
      <BsArrowRight className="collection-icon" />
    </article>
  );
};
