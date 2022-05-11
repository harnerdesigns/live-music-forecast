import "./index.scss";
import Footer from "../components/Footer/Footer";
import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../components/Header/Header";
import "../components/fontawesome"
import favicon from "../images/logo-1024.png"


const MainLayout = ({ children, showFooterCTA }) => {
 
    return (
      <div>
        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <link rel="icon" href={favicon} />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5546207212206045"      crossorigin="anonymous"></script>

        </Helmet>
        <Header/>
        {children}
        <Footer showCTA={showFooterCTA} />
      </div>
    );
  
}

export default MainLayout