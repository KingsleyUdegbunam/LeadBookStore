import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  const ourCollection = [
    "Lead Me",
    "Lead Him",
    "Lead Her",
    "Lead Them",
    "Lead Us",
    "Lead Little Ones",
    "Lead The Young",
    "Lead With Money",
    "Lead The World",
    "Lead With Legacy",
    "Lead With Imagination",
  ];

  return (
    <footer>
      <article className="about">
        <p className="about-text">
          LEAD is more than a bookstore. We are a community of readers committed
          to building tomorrow's leaders one book at a time. Proudly Nigerian,
          globally inspired — we curate books across leadership, business,
          self-development and storytelling for every kind of leader. Whether
          you are 8 or 80, there is a shelf here for you.
        </p>
      </article>
      <div className="footer-wrapper">
        <div className="footer-div">
          <p className="link-header">Our Collection</p>
          <div className="link-tree">
            {ourCollection.map((col, key) => (
              <Link key={key} to={`/shop?collection=${col.toLowerCase()}`}>
                {col}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <p className="copyright">&copy; 2026 LEAD Inc. </p>
    </footer>
  );
}
