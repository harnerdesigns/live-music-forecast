import React, { Component } from "react";
import { Link } from "gatsby";
import "./Header.scss";
import MainNav from "./MainNav/MainNav";
import logo from "../../images/Live-Music-Forecast.svg"

class Header extends Component {
  render() {
    return (
      <header className="header">
        <Link to="/" className="logo__wrapper">
          <h1 className="site-title"><svg viewBox="0 0 771 800" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M770.81 550C736 636.053 672.344 707.32 590.752 751.588C509.159 795.855 414.711 810.366 323.593 792.635C232.475 774.903 150.361 726.033 91.3232 654.398C32.2855 582.764 6.10352e-05 492.827 6.10352e-05 400C6.10352e-05 307.173 32.2855 217.235 91.3232 145.601C150.361 73.9674 232.475 25.0969 323.593 7.36526C414.711 -10.3663 509.159 4.14501 590.752 48.4124C672.344 92.6797 736 163.947 770.81 250L400 400L770.81 550Z" fill="#BF0A30"/>
<path d="M400 600C510.457 600 600 510.457 600 400C600 289.543 510.457 200 400 200C289.543 200 200 289.543 200 400C200 510.457 289.543 600 400 600Z" fill="#FFD700"/>
</svg> <img src={logo} alt="Live Music Forecast" /> Colorado Live Music Forecast</h1>
        </Link>
        <MainNav />
      </header>
    );
  }
}

export default Header;
