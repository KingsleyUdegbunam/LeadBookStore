import { LeadCarousel } from "../component/LeadCarousel";
import "./HomePage.css";
import demoBook from "../assets/demoBook.webp";
import womenImg from "../assets/womenImg.webp";
import shoppingBag from "../assets/shopping-bag.svg";
import moneyBook from "../assets/lead-money.webp";
import businessAfrica from "../assets/africaBusiness.webp";
import storytelling from "../assets/things-fall-apart.webp";
import legacy from "../assets/becoming.webp";

import { Product } from "../component/Product";

export default function HomePage() {
  return (
    <>
      <div className="header-nav">
        <p className="logo">L</p>
        <div className="nav">
          <div className="search-system">
            <div className="search">
              <svg
                className="search-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </div>
            <div className="menu"></div>
          </div>
          <div className="menu">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="style=stroke">
                <g id="menu-hamburger">
                  <path
                    id="vector (Stroke)"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H21C21.4142 5.25 21.75 5.58579 21.75 6C21.75 6.41421 21.4142 6.75 21 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6Z"
                    fill="#000000"
                  />
                  <path
                    id="vector (Stroke)_2"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H21C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12Z"
                    fill="#000000"
                  />
                  <path
                    id="vector (Stroke)_3"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.25 18C2.25 17.5858 2.58579 17.25 3 17.25H21C21.4142 17.25 21.75 17.5858 21.75 18C21.75 18.4142 21.4142 18.75 21 18.75H3C2.58579 18.75 2.25 18.4142 2.25 18Z"
                    fill="#000000"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="shopping-bag">
            <img className="shopping-bag" src={shoppingBag} alt="" />
          </div>
        </div>
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
            <button className="our-collection">Our Collection</button>
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
            <Product
              image={demoBook}
              category="Lead Me"
              name="Atomic Habits"
              priceInKobo="1200000"
            />
            <Product
              image={demoBook}
              category="Lead Me"
              name="Atomic Habits"
              priceInKobo="1200000"
            />
            <Product
              image={demoBook}
              category="Lead Me"
              name="Atomic Habits"
              priceInKobo="1200000"
            />
          </section>
        </article>
      </section>

      <section className="slider-container">
        <article className="top10">
          <h2 className="header">10 Bestsellers</h2>

          <section className="products-container slider">
            <Product
              image={demoBook}
              category="Lead Me"
              name="Atomic Habits"
              priceInKobo="1200000"
            />
            <Product
              image={demoBook}
              category="Lead Me"
              name="Atomic Habits"
              priceInKobo="1200000"
            />
            <Product
              image={demoBook}
              category="Lead Me"
              name="Atomic Habits"
              priceInKobo="1200000"
            />
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
        <div className="highlightImg-container">
          <img src={womenImg} alt="" />
        </div>
      </section>

      <section className="kids">
        <h2 className="children-yound-adults header">Business & Leadership</h2>
        <section className="grid-container">
          <Product
            image={moneyBook}
            category="Lead With Money"
            name="The Psychology of Money"
            priceInKobo="1200000"
          />
          <Product
            image={businessAfrica}
            category="Lead With Money"
            name="The Psychology of Money"
            priceInKobo="1200000"
          />
          <Product
            image={moneyBook}
            category="Lead With Money"
            name="The Psychology of Money"
            priceInKobo="1200000"
          />
          <Product
            image={moneyBook}
            category="Lead With Money"
            name="The Psychology of Money"
            priceInKobo="1200000"
          />
        </section>
      </section>

      <section className="kids">
        <h2 className="children-yound-adults header">Biography & Memoirs</h2>
        <section className="grid-container">
          <Product
            image={legacy}
            category="Lead With Money"
            name="Becoming"
            priceInKobo="1200000"
          />
          <Product
            image={legacy}
            category="Lead With Money"
            name="Becoming"
            priceInKobo="1200000"
          />
          <Product
            image={legacy}
            category="Lead With Money"
            name="Becoming"
            priceInKobo="1200000"
          />
          <Product
            image={legacy}
            category="Lead With Money"
            name="Becoming"
            priceInKobo="1200000"
          />
        </section>
      </section>

      <section className="kids">
        <h2 className="children-yound-adults header">Fiction & StoryTelling</h2>
        <section className="grid-container">
          <Product
            image={storytelling}
            category="Lead The Young"
            name="Things Fall Apart"
            priceInKobo="1200000"
          />
          <Product
            image={storytelling}
            category="Lead Little Ones"
            name="Things Fall Apart"
            priceInKobo="1200000"
          />
          <Product
            image={storytelling}
            category="Lead Little Ones"
            name="Things Fall Apart"
            priceInKobo="1200000"
          />
          <Product
            image={storytelling}
            category="Lead Little Ones"
            name="Things Fall Apart"
            priceInKobo="1200000"
          />
        </section>
      </section>

      <section className="kids">
        <h2 className="children-yound-adults header">
          Children & Young Adults
        </h2>
        <section className="grid-container">
          <Product
            image={demoBook}
            category="Lead The Young"
            name="Atomic Habits"
            priceInKobo="1200000"
          />
          <Product
            image={demoBook}
            category="Lead Little Ones"
            name="Atomic Habits"
            priceInKobo="1200000"
          />
          <Product
            image={demoBook}
            category="Lead Little Ones"
            name="Atomic Habits"
            priceInKobo="1200000"
          />
          <Product
            image={demoBook}
            category="Lead Little Ones"
            name="Atomic Habits"
            priceInKobo="1200000"
          />
        </section>
      </section>

      <section className="community">
        <div className="headeer-container">
          <h3 className="category">Lead Us</h3>
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
