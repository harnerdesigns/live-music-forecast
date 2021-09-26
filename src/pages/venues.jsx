import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import BrowseGrid from "../components/Pages/Browse/Browse";
import PageTitle from "../components/Pages/PageTitle/PageTitle";
import { Link } from "gatsby";
import VenueCard from "../components/VenueCard/VenueCard";
import { graphql } from 'gatsby'
import VenueGrid from "../components/VenueCardGrid/VenueCardGrid";
class BrowsePage extends Component {
  render() {
    const postEdges = this.props.data.allAirtable.edges;

    return (
      <Layout>
        <main className="browse__container">
          <Helmet title={`CO Live Music Venue Database | ${config.siteTitle}`} />
          <PageTitle
            title="Venue Database"
            subtitle="All The Cool Places To Go See Live Music In Colorado"
          />
          <VenueGrid venues={postEdges} />
        </main>
      </Layout>
    );
  }
}

export default BrowsePage;

export const pageQuery = graphql`
  query VenuesQuery {
    allAirtable(
      limit: 2000
      sort: { fields: [data___EventCount], order: DESC }
      filter: { table: { eq: "Venues" }, data: {Status: {eq: "Published"}, EventCount: {gt: 0}} }
    ) {
      edges {
        node {
          fields {
            slug
          }
          data {
            Featured
            Name
            Description
            City
            AccentColor
            EventCount
            Logo {
              url
            }
            Tags
          }
        }
      }
    }
  }
`;
