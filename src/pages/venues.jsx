import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import BrowseGrid from "../components/Pages/Browse/Browse";
import PageTitle from "../components/Pages/PageTitle/PageTitle";
import { Link } from "gatsby";

class BrowsePage extends Component {
  render() {
    const postEdges = this.props.data.allAirtable.edges;
    const venues = postEdges.map((edge) => {
      return <Link to={edge.node.fields.slug}>{edge.node.data.Name}</Link>;
    });
    return (
      <Layout>
        <main className="browse__container">
          <Helmet title={`CO Live Music Venue Database | ${config.siteTitle}`} />
          <PageTitle
            title="Venue Database"
            subtitle="All The Cool Places To Go See Live Music In Colorado"
          />
          {venues}
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
      sort: { fields: [data___Name], order: DESC }
      filter: { table: { eq: "Venues" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          data {
            Name
            Description
          }
        }
      }
    }
  }
`;
