import React from "react";
import image from "../../assets/contact-bg.png";
import { FaRegClock } from "react-icons/fa6";
import { TbMail } from "react-icons/tb";
import "./ContactHeader.css";

export const ContactHeader = () => {
  return (
    <header className="contact-header">
      <div className="contact-header-wrapper pages-wrapper-variation">
        <div className="header-text">
          <h2 className="contact-h2">Contact</h2>
          <h1 className="contact-subheader">
            Let's start a conversation<span className="color-brand">.</span>
          </h1>
          <p className="contact-page-desc">
            Looking for your next great read? Need help with an order? Or simply
            want to say hello? We're here.
          </p>
        </div>
        <div className="image-wrapper">
          <img src={image} alt="" />
        </div>
      </div>
      <div className="card-desktop">
        <div className="card-desktop-wrapper pages-wrapper-variation">
          <article className="desktop-card">
            <div className="desktop-card-content-flex">
              <TbMail className="contact-icon" size={28} />
              <div className="contact-card-text">
                <p className="contact-label">Email</p>
                <p className="desktop-card-details">hello@leadbookstore.ng</p>
              </div>
            </div>
          </article>

          <article className="desktop-card">
            <div className="desktop-card-content-flex">
              <FaRegClock className="contact-icon" size={28} />
              <div className="contact-card-text">
                <p className="contact-label">Response time</p>
                <p className="desktop-card-details">Within 24 - 48 hours</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </header>
  );
};
