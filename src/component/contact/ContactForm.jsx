import Select from "react-select";
import { reactSelectStyles } from "../../styles/components/reactSelect";
import { TextInput } from "../general/inputs/TextInput";
import { useState } from "react";
import "./ContactForm.css";
export const ContactForm = ({ state, handleSubmit, ValidationError }) => {
  const [messageCount, setMessageCount] = useState(0);
  const maxCount = 2500;

  const options = [
    "Order Issue",
    "Shipping Query",
    "Return / Refund",
    "Payment Problem",
    "Book Recommendation",
    "General Inquiry",
  ];

  const selectOptions = options.map((opt) => ({
    value: opt,
    label: opt,
  }));

  return (
    <form onSubmit={handleSubmit} className="contact-form-container">
      <div className="contact-form-name-email">
        <TextInput
          id="contact-name"
          name="name"
          label="Name"
          placeholder="Your name"
          required={true}
          error={
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          }
        />

        <TextInput
          id="contact-email"
          name="email"
          label="Email"
          placeholder="Your email address"
          required={true}
          error={
            <ValidationError
              className="contact-error-message"
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          }
        />
      </div>

      <div>
        <label htmlFor="contact-subject">Subject</label>
        <Select
          styles={reactSelectStyles}
          inputId="contact-subject"
          name="subject"
          placeholder="How can we help?"
          options={selectOptions}
        />
        <ValidationError
          className="contact-error-message"
          prefix="Subject"
          field="subject"
          errors={state.errors}
        />
      </div>

      <div className="contact-message">
        <label htmlFor="contact-message">Message</label>
        <textarea
          minLength={10}
          maxLength={maxCount}
          required
          className="contact-textarea"
          id="contact-message"
          name="message"
          placeholder="Type your message here..."
          type="text"
          onChange={(e) => {
            const value = e.target.value;
            setMessageCount(value.length);
          }}
        ></textarea>
        <ValidationError
          className="contact-error-message"
          prefix="Message"
          field="message"
          errors={state.errors}
        />

        <p className="contact-message-word-count">
          {messageCount}/{maxCount}
        </p>
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="button-primary"
      >
        Send Message
      </button>
      <ValidationError
        className="contact-error-message"
        errors={state.errors}
      />
    </form>
  );
};
