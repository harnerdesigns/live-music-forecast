import React from "react";
import BlueBorder from "../../../images/blue-border.svg";
import { Link } from "gatsby";

const SectionTitle = ({ title, subtitle, logo, accentColor, className, children }) => {

    return(
        <header className={"section-title__wrapper" + (logo ? " has-logo" : "") +  " " +  (className)}>
            {logo && <img style={{backgroundColor: accentColor}} className="section-title__logo" src={logo} />}
            <div className="section-title__content">

            {title && <h1>{title}</h1>}
            {subtitle && <h2>{subtitle}</h2>}
            {children}
            </div>
        </header>
    )
};
export default SectionTitle;
