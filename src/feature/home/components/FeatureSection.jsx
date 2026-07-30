import { Link } from "react-router-dom";
import { BookCard } from "../../../component/BookCard";
import { filterBooks } from "../utilities";
import { RiArrowRightLongLine } from "react-icons/ri";
import featureImage from "../../../assets/featureImage.webp";
import "./FeatureSection.css";

export function FeatureSection() {
  const array = filterBooks(10, "primaryCollection", "lead her");

  return (
    <section className="highlight section">
      <div className="pages-wrapper-variation feature-section-wrapper">
        <div className="feature-header">
          <h2 className="header">Curated for Her</h2>

          <p className="feature-desc">
            A thoughtful selection of books for women building influence,
            character, and lasting impact.
          </p>
        </div>
        <div>
          <div className="feature-btn-wrapper">
            <Link className="feature-btn" to={`/shop?collection=lead her`}>
              <p>Explore Collection</p>
              <RiArrowRightLongLine />
            </Link>
          </div>

          <div>
            <article className="products-container slider">
              {array.map((book, index) => (
                <BookCard key={index} book={book} />
              ))}
            </article>
          </div>
        </div>

        <div className="highlightImg-container">
          <img src={featureImage} alt="potrait of different ladies" />
        </div>
      </div>
    </section>
  );
}
