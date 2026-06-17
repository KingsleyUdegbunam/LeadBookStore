import { SocialIcon } from "react-social-icons/component";
import Select from "react-select";
import "react-social-icons/whatsapp";
import "react-social-icons/instagram";
import "react-social-icons/email";
import "./ContactPage.css";
import { useState } from "react";

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const options = [
    "Select a subject",
    "Order Issue",
    "Shipping Query",
    "Return / Refund",
    "Payment Problem",
    "Book Recommendation",
    "General Inquiry",
  ];

  const PLACEHOLDER = "Select a subject";
  const selectOptions = options.map((opt) =>
    opt === PLACEHOLDER
      ? { label: opt, value: "" }
      : { value: opt.toLowerCase(), label: opt },
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (option) => {
    setContactInfo((prev) => ({ ...prev, subject: option.value }));
  };
  const handleSubmision = (e) => {
    e.preventDefault();
    console.log(contactInfo);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // console.log(selectOptions);

  return (
    <>
      <section className="main">
        <article className="about-banner">
          <p className="about-header">GET IN TOUCH</p>
          <p className="about-tag">
            We'd love to <span>hear from you.</span>
          </p>
          <p className="about-tag-detail">
            Order issue, general question, or book reading guide.
          </p>
        </article>

        <article className="what-we-stand-for">
          <p className="about-header">REACH US DIRECTLY</p>
          <div className="contact-cards-wrapper">
            <article className="contact-card">
              <div className="contact-icon-container">
                <SocialIcon
                  bgColor="transparent"
                  fgColor="white"
                  url="www.email.com"
                />
              </div>
              <div className="contact-card-text">
                <p className="contact-card-head">EMAIL</p>
                <p className="contact-card-lead">hello@leadbookstore.ng</p>
                <p className="contact-card-rule">We reply within 24 hours</p>
              </div>
            </article>

            <article className="contact-card">
              <div className="contact-icon-container">
                <SocialIcon
                  bgColor="transparent"
                  fgColor="#25D366"
                  url="www.whatsapp.com"
                />
              </div>
              <div className="contact-card-text">
                <p className="contact-card-head">WHATSAPP</p>
                <p className="contact-card-lead">+234 777 777 7777</p>
                <p className="contact-card-rule">Mon-Fri, 9am-6pm</p>
              </div>
            </article>

            <article className="contact-card">
              <div className="contact-icon-container">
                <SocialIcon
                  bgColor="transparent"
                  fgColor="#E94475"
                  url="www.instagram.com"
                />
              </div>
              <div className="contact-card-text">
                <p className="contact-card-head">INSTAGRAM</p>
                <p className="contact-card-lead">@leadbookstore</p>
                <p className="contact-card-rule">Our DMs are open</p>
              </div>
            </article>
          </div>
        </article>

        <article className="contact-form-article">
          <p className="about-header">SEND A MESSAGE</p>
          <form className="contact-form">
            <div className="contact-form-detail">
              <label htmlFor="name">Name</label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                className="contact-field"
              />
            </div>

            <div className="contact-form-detail">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleChange}
                required
                placeholder="Email Address"
                type="email"
                name="email"
                id="email"
              />
            </div>

            <Select
              onChange={handleSelect}
              placeholder="Subject"
              options={selectOptions}
            />

            <div className="contact-form-detail textarea">
              <label htmlFor="message">Message</label>
              <textarea
                onChange={handleChange}
                name="message"
                id="message"
              ></textarea>
            </div>

            <button type="submit" onClick={handleSubmision}>
              Send Message
            </button>
          </form>
        </article>
      </section>
    </>
  );
}
