import { LeadCarousel } from "../component/LeadCarousel";
import { BookCard } from "../component/BookCard";
import { books } from "../data/inventory";
import { BookGrid } from "../component/BookGrid";
import womenImg from "../assets/womenImg.webp";
import "./HomePage.css";
import { FeatureSection } from "../component/FeatureSection";

export default function HomePage({ addToCart }) {
  const newArrival = books.filter((book) => book.tag.includes("new arrival"));

  const top10BestSellers = books
    .filter((book) => book.tag.includes("bestseller"))
    .slice(0, 10);

  const first14BusinessBooks = books
    .filter((book) => book.genre === "business & leadership")
    .slice(0, 14);

  const first14BiographyAndMemoirs = books
    .filter((book) => book.genre === "biography" || book.genre === "memoir")
    .slice(0, 14);

  const first14FictionAndStoryTelling = books
    .filter((book) => book.genre === "fiction & storytelling")
    .slice(0, 14);

  const first14ChildrenAndYoungAdults = books
    .filter(
      (book) =>
        book.genre === "children's book" || book.genre === "young adult",
    )
    .slice(0, 14);
  const womenMonth = books
    .filter((book) => book.primaryCollection === "lead her")
    .slice(0, 10);

  return (
    <div>
      <section className="hero">
        {/* <div className="logo">LEAD</div> */}
        <section className="hero-text">
          <div className="landing-text">
            <h1>Building Tomorrow's Leaders. One Book at a Time.</h1>
            <p className="supporting-h1">
              Curated bookstore of premium reads centered around leadership
              carefully handpicked and ready to unlock the leader in you.
            </p>
          </div>
          <div className="quick-action-btns">
            <button className="shop-now">Shop Now</button>
          </div>
        </section>
      </section>

      <article className="marque">
        <div className="marque-group">
          <LeadCarousel text="Me" />
          <LeadCarousel text="Him" />
          <LeadCarousel text="Her" />
          <LeadCarousel text="Them" />
          <LeadCarousel text="Us" />
          <LeadCarousel text="Little Ones" />
          <LeadCarousel text="The Young" />
          <LeadCarousel text="with Money" />
          <LeadCarousel text="the World" />
          <LeadCarousel text="with Legacy" />
          <LeadCarousel text="with Imagination" />
        </div>
        <div aria-hidden className="marque-group">
          <LeadCarousel text="Me" />
          <LeadCarousel text="Him" />
          <LeadCarousel text="Her" />
          <LeadCarousel text="Them" />
          <LeadCarousel text="Us" />
          <LeadCarousel text="Little Ones" />
          <LeadCarousel text="The Young" />
          <LeadCarousel text="with Money" />
          <LeadCarousel text="the World" />
          <LeadCarousel text="with Legacy" />
          <LeadCarousel text="with Imagination" />
        </div>
      </article>

      <section className="slider-container">
        <article className="top10">
          <h2 className="header">New Arrivals</h2>

          <section className="products-container slider">
            {newArrival.map((book, index) => (
              <BookCard
                book={book}
                id={book.id}
                key={index}
                addToCart={addToCart}
                image={book.coverImage}
                category={book.primaryCollection}
                title={book.title}
                priceInKobo={book.price.hardback}
              />
            ))}
          </section>
        </article>
      </section>

      <section className="slider-container">
        <article className="top10">
          <h2 className="header">10 Bestsellers</h2>

          <section className="products-container slider">
            {top10BestSellers.map((book, index) => (
              <BookCard
                key={index}
                id={book.id}
                book={book}
                image={book.coverImage}
                category={book.primaryCollection}
                title={book.title}
                priceInKobo={book.price.paperback}
                addToCart={addToCart}
              />
            ))}
          </section>
        </article>
      </section>

      {/* FEATURE SECTION */}
      <FeatureSection
        addToCart={addToCart}
        image={womenImg}
        array={womenMonth}
      />

      <section className="home-section">
        <h2 className="children-yound-adults header">Business & Leadership</h2>
        {<BookGrid books={first14BusinessBooks} addToCart={addToCart} />}
      </section>

      <section className="home-section">
        <h2 className="children-yound-adults header">Biography & Memoirs</h2>
        <BookGrid books={first14BiographyAndMemoirs} addToCart={addToCart} />
      </section>

      <section className="home-section">
        <h2 className="children-yound-adults header">Fiction & StoryTelling</h2>
        <BookGrid books={first14FictionAndStoryTelling} addToCart={addToCart} />
      </section>

      <section className="home-section">
        <h2 className="children-yound-adults header">
          Children & Young Adults
        </h2>
        <BookGrid books={first14ChildrenAndYoungAdults} addToCart={addToCart} />
      </section>

      <section className="newsletter">
        <h2>Join The List</h2>
        <div className="newsletter-body">
          <p className="newletter-text">
            Power-packed reads and practical tools to shape the leader in you,
            one week at a time.
          </p>

          <div className="news-join-field">
            <label className="newsletter-label" htmlFor="newsletter">
              <input
                className="newsletter-email"
                type="email"
                placeholder="Email address"
                name="newsletter"
                id="newsletter"
              />
            </label>
            <button className="subscribe-btn">Subscribe</button>
          </div>
          <p className="newsletter-constent">
            By providing my email, I am consenting to recieve Lead emails.
            <span>
              {" "}
              For additional information, please see our Privacy Policy.
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
