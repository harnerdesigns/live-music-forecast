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
          <p>&copy;2021 Colorado Live Music Directory // Made With 💜 By <a href="https://jackharner.com">Jack Harner</a></p>
          <p class="finePrint">All logos, images,  graphics & trademarks belong to their respective owners.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
