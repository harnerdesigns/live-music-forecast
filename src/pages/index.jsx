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
          <SEO />
          <Helmet title={config.siteTitle} />
          <ForecastGrid daysToShow={30} postEdges={postEdges} showButton={false} />
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
    sort: {fields: [data___StartDate, data___Featured], order: [ASC, DESC]}
    filter: {data: {Status: {eq: "Published"}, StartDate: {lte: $today}}}
  ) {
    edges {
      node {
        fields{
          slug
        }
        data {
          StartDate
          EndDate
          DoorsTime
          Name
          Subtitle
          Description
          Tags
          Featured
          TicketURL
          SoldOut
          Image{
            url
          }
          Artist_Genres
          Venues {
            fields{
              slug
            }
            data {
              Name
              City
            }
          }
        }
      }
    }
  }
}
`;
