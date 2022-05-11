import React from "react";
import { Link } from "gatsby";
import "./NewsletterSignup.scss";
import coloradoEnvelope from "../../images/co-envelope.svg"
import _ from "lodash";
import { FontAwesomeIcon } from "../../../node_modules/@fortawesome/react-fontawesome/index";

const NewsletterSignup = ({ metaArray = [] }) => {
  return (
    <div className="newsletter-signup__wrapper">
      <img src={coloradoEnvelope} />
      <div className="newsletter-signup__text-wrapper">
        <h1 className="newsletter-signup__heading">
          Get the Colorado Live Music Forecast In Your Inbox?
        </h1>
        <h2>Get the week's live music schedule every Monday morning.</h2>
        <div id="mc_embed_signup">
          <form
            action="https://jackharner.us5.list-manage.com/subscribe/post?u=e27a15ea415294e0b0f2c6346&amp;id=45d6419599"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            novalidate
          >
            <div id="mc_embed_signup_scroll">
              <input
                type="email"
                name="EMAIL"
                className="email"
                id="mce-EMAIL"
                placeholder="Email Address"
                required
              />
              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_e27a15ea415294e0b0f2c6346_45d6419599"
                  tabIndex="-1"
                  value=""
                />
              </div>
              <div className="clear">
                <input
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                />
              </div>
            </div>
          </form>
        </div>
        <p className="finePrint">
          We won't send you spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;
