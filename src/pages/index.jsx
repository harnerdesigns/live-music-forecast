import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";

import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import ForecastGrid from "../components/ForecastGrid/ForecastGrid";

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allAirtable.edges;
    console.log({context: this.props.pageContext});
    console.log({postEdges});
    return (
      <Layout>
        <div className="index-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <ForecastGrid postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
query IndexQuery($today: Date!) {
  allAirtable(
    limit: 2000
    sort: {fields: [data___StartDate], order: DESC}
    filter: {data: {Status: {eq: "Published"}, StartDate: {lte: $today}, EndDate: {lte: $today}}}
  ) {
    edges {
      node {
        fields{
          slug
        }
        data {
          Slug
          StartDate
          EndDate
          Name
          Featured
          Image{
            url
          }
          Genre
          Name__from_Genre_
          Venue_City 
        }
      }
    }
  }
}
`;
