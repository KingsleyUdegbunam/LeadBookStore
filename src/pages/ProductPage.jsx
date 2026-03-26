import { useEffect } from "react";
import { Header } from "../component/Header";
import { books } from "../data/inventory";
import { useParams, useLocation } from "react-router-dom";
import "./ProductPage.css";

export default function ProductPage({ cart }) {
  const { id } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  console.log(id);

  const book = books.find((book) => book.id === Number(id));
  console.log(book);
  return (
    <>
      <Header cart={cart} />
      <section className="main-container">
        <div className="product-image-container">
          <img src={book.coverImage} alt={`Image of ${book.title} book`} />
        </div>
        <div className="product-author-and-title">
          <h2 className="book-title">{book.title}</h2>
          <p className="book-authur">{`by ${book.author}`}</p>
        </div>

        <button className="book-to-cart">ADD TO CART</button>

        <article className="desc-container">
          <h3 className="desc-header">Description</h3>
          <div className="desc-text-container">
            <h4 className="product-header">{book.header}</h4>
            <h4 className="product-subheader">{book.subheader}.</h4>
            <p className="book-desc">{book.description}</p>
          </div>
        </article>

        <article className="product-details">
          <h3 className="product-details-header">Product Details</h3>
          <div className="product-details-text">
            <div className="row">
              <p>Publisher:</p>
              <p>{book.details.publisher}</p>
            </div>
            <div className="row">
              <p>ISBN:</p>
              <p>{book.details.isbn}</p>
            </div>
            <div className="row">
              <p>Format:</p>
              <p>Paperback / softback</p>
            </div>
            <div className="row">
              <p>Published:</p>
              <p>{book.details.publishedDate}</p>
            </div>
            <div className="row">
              <p>Country of Publication:</p>
              <p>{book.details.countryOfPublication}</p>
            </div>
            <div className="row">
              <p>Language:</p>
              <p>{book.details.language}</p>
            </div>
            <div className="row">
              <p>Genre:</p>
              <p>{book.details.genre}</p>
            </div>
            <div className="row">
              <p>Pages:</p>
              <p>{book.details.pages}</p>
            </div>
            {book.details.awards && (
              <div className="row">
                <p>Award</p>

                <p className="product-award">{book.details.awards}</p>
              </div>
            )}
          </div>
        </article>

        <article className="recommendation">
          <h3 className="product-heade">You might love these as well</h3>
        </article>
      </section>
    </>
  );
}
