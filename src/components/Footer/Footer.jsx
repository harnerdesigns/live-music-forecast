import React, { Component } from "react";
import { Link } from "gatsby";
import "./Footer.scss";
import NewsletterSignup from "../NewsletterSignup/NewsletterSignup";

const Footer = ({ showCTA = true }) => {
  return (
    <>
      {showCTA && <NewsletterSignup />}
      <footer className="footer">
        <div className="notice-container">
          <p>&copy;2021 Colorado Live Music Directory</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
