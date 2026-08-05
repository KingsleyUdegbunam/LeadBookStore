import React from "react";
import Select from "react-select";
import { reactSelectStyles } from "../../styles/components/reactSelect";

export const ContactForm = () => {
  const options = [
    "Select a subject",
    "Order Issue",
    "Shipping Query",
    "Return / Refund",
    "Payment Problem",
    "Book Recommendation",
    "General Inquiry",
  ];

  const selectOptions = options.map((opt) => ({
    value: opt.toLowerCase(),
    label: opt,
  }));

  return (
    <article className="contact-form-container">
      <div className="contact-form-name-email">
        <div className="contact-label">
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" placeholder="Your name" type="text" />
        </div>

        <div className="contact-label">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-name"
            placeholder="Your email address"
            type="text"
          />
        </div>
      </div>

      <div className="contact-label">
        <label htmlFor="contact-subject">Subject</label>
        <Select
          styles={reactSelectStyles}
          id="contact-subject"
          placeholder="How can we help?"
          options={selectOptions}
        />
      </div>

      <div className="contact-label">
        <label htmlFor="contact-message">Message</label>
        <textarea
          minLength={15}
          maxLength={2500}
          className="contact-textarea"
          id="contact-message"
          placeholder="Type your message here..."
          type="text"
        ></textarea>
      </div>
      <button className="button-primary">Send Message</button>
    </article>
  );
};
