import React, { Component } from "react";
import { Link } from "gatsby";
import "./MainNav.scss";

const MainNav = () => {


    return(
        <nav id="mainNav" class="nav__wrapper">
            <Link to="/browse" className="nav__item">Browse</Link>
            <Link to="/venues" className="nav__item">Venues</Link>
            <Link to="/artists" className="nav__item">Artists</Link>
            <Link to="/submit" className="nav__item button">Submit An Event</Link>
        </nav>
    )
}

export default MainNav