import React from "react";
import "./PageTitle.scss";
import BlueBorder from "../../../images/blue-border.svg";
import { Link } from "gatsby";

const PageTitle = ({ title, subtitle, children }) => {

    return(
        <header className="page-title__wrapper">
            {title && <h1>{title}</h1>}
            {subtitle && <h2>{subtitle}</h2>}
        </header>
    )
};
export default PageTitle;
