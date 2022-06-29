import React, { useState} from "react";
import { Link } from "gatsby";
import "./MainNav.scss";
import { FontAwesomeIcon } from "../../../../node_modules/@fortawesome/react-fontawesome/index";

const MainNav = () => {

    const [isOpen, setIsOpen] = useState(false); 

    return(<>
        <nav id="mainNav" className={"nav__wrapper" + (isOpen ? " nav__wrapper--open" : "")}> 
            <Link to="/newsletter" className="nav__item">Newsletter</Link>
            <Link to="/browse" className="nav__item">Browse</Link>
            <Link to="/venues" className="nav__item">Venues</Link>
            <Link to="/artists" className="nav__item">Artists</Link>
            <Link to="/today" className="nav__item button">Any Concerts Today?</Link>
        </nav>
        <div className={"mobile-nav__bg" + (isOpen ? " mobile-nav__bg--open" : "")} onClick={()=>setIsOpen(false)}></div>
        <FontAwesomeIcon onClick={()=>setIsOpen(!isOpen)} id="mobile-nav__toggle" className={isOpen ? "mobile-nav__toggle--open" : "mobile-nav__toggle"} icon={isOpen ? "times" : "bars"} />
        </>
    )
}

export default MainNav