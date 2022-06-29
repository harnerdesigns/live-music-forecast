import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import About from "../components/About/About";
import config from "../../data/SiteConfig";
import PageTitle from "../components/Pages/PageTitle/PageTitle";
import NewsletterSignup from "../components/NewsletterSignup/NewsletterSignup";

class SubmitPage extends Component {
  render() {
    return (
      <Layout showFooterCTA={false}>
          <Helmet title={`Newsletter | ${config.siteTitle}`} />
          <PageTitle title="Newsletter"/>
          <NewsletterSignup large />
      </Layout>
    );
  }
}

export default SubmitPage;
