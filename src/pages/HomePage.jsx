import { LeadCarousel } from "../component/LeadCarousel";
import { Header } from "../component/Header/Header";
import { BookCard } from "../component/BookCard";
import { books } from "../data/inventory";
import { BookGrid } from "../component/BookGrid";

import "./HomePage.css";
import womenImg from "../assets/womenImg.webp";

export default function HomePage({ cart, addToCart }) {
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

  const womenMonth = books.filter(
    (book) => book.primaryCollection === "lead her",
  );

  return (
    <>
      <div className="homepage-header-container">
        {<Header cart={cart} addToCart={addToCart} />}
      </div>
      <section className="hero">
        {/* <div className="logo">LEAD</div> */}
        <section className="hero-text">
          <div className="landing-text">
            <h1>Building Tomorrow's Leaders — One Book at a Time.</h1>
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

      <section className="highlight">
        <div>
          <article className="section">
            <h2 className="header">Women's History Month</h2>
            <p className="header-desc">
              Stories of women who led, and books to help you do the same.
            </p>
          </article>
        </div>

        {/* HERE HERE HERE  */}
        <article className="products-container slider">
          {womenMonth.map((book, index) => (
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
        </article>
        <div className="highlightImg-container">
          <img src={womenImg} alt="" />
        </div>
      </section>

      <section className="kids">
        <h2 className="children-yound-adults header">Business & Leadership</h2>
        {<BookGrid books={first14BusinessBooks} addToCart={addToCart} />}
      </section>

      <section className="kids">
        <h2 className="children-yound-adults header">Biography & Memoirs</h2>
        <BookGrid books={first14BiographyAndMemoirs} addToCart={addToCart} />
      </section>

      <section className="kids">
        <h2 className="children-yound-adults header">Fiction & StoryTelling</h2>
        <BookGrid books={first14FictionAndStoryTelling} addToCart={addToCart} />
      </section>

      <section className="kids">
        <h2 className="children-yound-adults header">
          Children & Young Adults
        </h2>
        <BookGrid books={first14ChildrenAndYoungAdults} addToCart={addToCart} />
      </section>

      <section className="community">
        <div className="headeer-container">
          <h3 className="comunity-lead">Lead Team</h3>
          <h2 className="header book-club">Join Our Community of Leaders</h2>
        </div>
        <div className="community-span">
          <span>You don't have to read alone.</span>
          <span>
            Join thousands of leaders who read, grow and lead together.
          </span>
        </div>

        <button className="community-btn">Join In</button>
      </section>

      <section className="about">
        {/* <h2 className="about-header">What We Stand By</h2> */}
        <p className="about-text">
          <span className="bold">LEAD</span> is more than a bookstore. We are a
          community of readers committed to building tomorrow's leaders one book
          at a time. Proudly Nigerian, globally inspired — we curate books
          across leadership, business, self-development and storytelling for
          every kind of leader. Whether you are 8 or 80, there is a shelf here
          for you.
        </p>
      </section>

      <footer></footer>
    </>
  );
}
