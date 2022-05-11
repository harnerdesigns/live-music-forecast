import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import About from "../components/About/About";
import config from "../../data/SiteConfig";
import PageTitle from "../components/Pages/PageTitle/PageTitle";

class SubmitPage extends Component {
  render() {
    return (
      <Layout>
        <div className="submit-container">
          <Helmet title={`Submit An Event | ${config.siteTitle}`} />
          <PageTitle title="Submit An Event"/>
          <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script><iframe className="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrABQ6tAlyzcBwLy" frameborder="0" onmousewheel="" width="100%" height="2162" style={{background: "#fff"}}></iframe>
        </div>
      </Layout>
    );
  }
}

export default SubmitPage;
