import React, { Component } from "react";
import { Link } from "gatsby";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="notice-container">
          <p>&copy;2021 Colorado Live Music Directory</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
