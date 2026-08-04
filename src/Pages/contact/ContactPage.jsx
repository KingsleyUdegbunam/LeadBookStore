import { useState } from "react";
import { ContactHeader } from "../../component/contact/ContactHeader";
import { ContactForm } from "../../component/contact/ContactForm";
import { FaRegClock } from "react-icons/fa6";
import { TbMail } from "react-icons/tb";
import "./ContactPage.css";

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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
      <section className="pages-container">
        <ContactHeader />
        <div className="desktop-about-contact-grid pages-wrapper-variation">
          <section className="contact-body-section contact-mobile">
            <h2 className="contact-h2-body">Get in touch</h2>

            <article className="email-contact">
              <p className="contact-label">Email</p>
              <div className="response-content-flex">
                <TbMail className="contact-icon" size={28} />
                <p className="contact-email-address get-in-touch-card-text">
                  hello@leadbookstore.ng
                </p>
              </div>
            </article>

            <article className="email-contact">
              <p className="contact-label">Response time</p>
              <div className="response-content-flex">
                <FaRegClock className="contact-icon" size={28} />

                <p className="contact-response-text get-in-touch-card-text">
                  We usually reply within one business day
                </p>
              </div>
            </article>
          </section>

          <section className="contact-body-section contact-desktop">
            <h2 className="contact-message-header-desktop">
              Send us a message
            </h2>
            <p className="contact-message-desktop-context">
              Fill out the form and we'll get back to you as soon as possible.
            </p>
          </section>

          <section className="contact-body-section">
            <h2 className="contact-h2-body contact-mobile">Send a message</h2>
            <ContactForm />
          </section>
        </div>
      </section>
    </>
  );
}
