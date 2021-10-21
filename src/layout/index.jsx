import Footer from "../components/Footer/Footer";
import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import "./index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../components/Header/Header";
import "../components/fontawesome"


const MainLayout = ({ children, showFooterCTA }) => {
 
    return (
      <div>
        <Helmet>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <Header/>
        {children}
        <Footer showCTA={showFooterCTA} />
      </div>
    );
  
}

export default MainLayout