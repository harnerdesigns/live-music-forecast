import Footer from "../components/Footer/Footer";
import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import "./index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../components/Header/Header";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Helmet>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <Header/>
        {children}
        <Footer />
      </div>
    );
  }
}
