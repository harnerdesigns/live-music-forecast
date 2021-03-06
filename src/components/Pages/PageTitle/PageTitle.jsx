import React from "react";
import BlueBorder from "../../../images/blue-border.svg";
import { Link } from "gatsby";

const PageTitle = ({ title, subtitle, logo, accentColor, className, children }) => {

    return(
        <header className={"page-title__wrapper" + (logo ? " has-logo" : "") + " " + className}>
            {logo && <img style={{backgroundColor: accentColor}} className="page-title__logo" src={logo} />}
            <div className="page-title__content">

            {title && <h1>{title}</h1>}
            {subtitle && <h2>{subtitle}</h2>}
            {children}
            </div>
        </header>
    )
};
export default PageTitle;
