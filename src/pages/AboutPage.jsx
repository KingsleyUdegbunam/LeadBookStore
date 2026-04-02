import { Link } from "react-router-dom";
import "./AboutPage.css";

export default function AboutPage() {
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

  console.log(ourCollection);
  return (
    <>
      <section className="about-main">
        <article className="about-banner">
          <p className="about-header our-story">OUR STORY</p>
          <p className="about-tag">
            More than a <span>bookstore.</span>
          </p>
          <p className="about-tag-detail">
            We are a community of readers committed to building tomorrow's
            leaders — one book at a time. Proudly Nigerian, globally inspired.
          </p>
        </article>
        <article className="strip">
          <p className="about-header">OUR MISSION</p>
          <p className="about-tag-detail">
            To make grat books accessible to every Nigerian and to make reading
            a lifestyle, not a luxury.
          </p>
        </article>
        <section className="what-we-stand-for">
          <p className="about-header">WHAT WE STAND FOR</p>
          <article className="stand-card">
            <p className="stand-number">01</p>
            <div className="stand-text">
              <p className="stand-head">Curated with Intention</p>
              <p className="stand-detail">
                Every book on LEAD is handpicked. We do not stack noise — we
                stock signal. Books that challenge, expand, and equip.
              </p>
            </div>
          </article>
          <article className="stand-card">
            <p className="stand-number">02</p>
            <div className="stand-text">
              <p className="stand-head">Proudly Nigerian</p>
              <p className="stand-detail">
                Built in Nigeria, for Nigerians. Every collection reflects the
                reality, ambition, and diversity of the African leader.
              </p>
            </div>
          </article>
          <article className="stand-card">
            <p className="stand-number">03</p>
            <div className="stand-text">
              <p className="stand-head">For Every Kind of Leader</p>
              <p className="stand-detail">
                Whether you are 8 or 80, a student or a CEO, there is a shelf
                for you. We believe leadership is not a title, but a choice.
              </p>
            </div>
          </article>
          <article className="stand-card">
            <p className="stand-number">04</p>
            <div className="stand-text">
              <p className="stand-head">Globally Inspired</p>
              <p className="stand-detail">
                We source the world's best thinkng and bring it home. Local
                roots, global perspective.
              </p>
            </div>
          </article>
        </section>
        <section className="about-collection">
          <p className="about-header">OUR COLLECTIONS</p>
          <p className="collection-intro-txt">
            Eleven carefully curated shelves. Each one built for a different
            kind of leader.
          </p>
          <ul className="our-collections-ul">
            {ourCollection.map((col) => (
              <li key={col}>
                <span className="li-text">{col}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="about-redirect">
          <p>Ready to find your next great read?</p>
          <Link to="/shop">
            <button className="about-redirect-btn">
              BROWSE OUR COLLECTION
            </button>
          </Link>
        </section>
      </section>
    </>
  );
}
