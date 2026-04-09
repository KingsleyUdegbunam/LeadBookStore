import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./TrackingPage.css";

export default function TrackingPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const navigate = useNavigate();

  console.log(email);
  return (
    <>
      <section className="main">
        <article className="about-banner">
          <p className="about-header">LEAD BOOKSTORE</p>
          <p className="about-tag">Track Your Order</p>
          <p className="about-tag-detail">
            Enter your email to see all your orders in one place.
          </p>
        </article>
        <article className="what-we-stand-for">
          <div className="tracking-container">
            <p className="about-header">EMAIL ADDRESS</p>
            <p className="about-tag-detail dull-black" style={{ fontSize: 13 }}>
              Enter the email address you used at checkout to view all orders.
            </p>

            {error && (
              <div className="error-container article">
                <p className="error-text">{error}</p>
              </div>
            )}

            <label className="sr-only" htmlFor="tracking-input">
              Tracking Input
            </label>
            <input
              className="dull-black"
              type="email"
              name="tracking-input"
              id="tracking-input"
              placeholder="e.g. john@mail.com"
              ref={inputRef}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <button className="button-primary">FIND MY ORDERS</button>
        </article>

        <article className="article sidenote">
          <div className="sidenote-wrapper">
            <p className="sidenote-header">Can't find your orders?</p>
            <p className="sidenote-text-body dull-black">
              Make sure you're using the same email entered at checkout. Contact
              us at{" "}
              <span className="emphasize-normal">hello@leadbookstore.ng </span>
              if you need help.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
