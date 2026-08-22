import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";
import { ContactHeader } from "../../component/contact/ContactHeader";
import { ContactForm } from "../../component/contact/ContactForm";
import { EmptyState } from "../../component/general/states/EmptyState";
import image from "../../assets/empty-states/contact.svg";
import { FaRegClock } from "react-icons/fa6";
import { TbMail } from "react-icons/tb";
import "./ContactPage.css";

export default function ContactPage() {
  const [state, handleSubmit] = useForm("mzepwaql");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.succeeded]);

  return (
    <section className="pages-container">
      {state.succeeded ? (
        <div className="pages-wrapper">
          <EmptyState
            image={image}
            title="Thanks for reaching out!"
            actionText="Return to Store"
            onAction={() => {
              navigate("/shop");
            }}
            body="We’ve got your message and will get back as soon as we can."
          />
        </div>
      ) : (
        <>
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
              <ContactForm
                state={state}
                handleSubmit={handleSubmit}
                ValidationError={ValidationError}
              />
            </section>
          </div>
        </>
      )}
    </section>
  );
}
