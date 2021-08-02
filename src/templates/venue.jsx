import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";
import ForecastGrid from "../components/ForecastGrid/ForecastGrid";
import PageTitle from "../components/Pages/PageTitle/PageTitle";
import BlueBorder from "../components/BlueBorder/BlueBorder";
import VenueGrid from "../components/VenueCardGrid/VenueCardGrid";

const City = ({ pageContext, data }) => {
  const { venue } = pageContext;
  const postEdges = data.events.edges;
  const venueData = data.venue.data;
  return (
    <Layout>
      <div className="category-container">
        <Helmet title={`Live Music at ${venueData.Name} | ${config.siteTitle}`} />
        <PageTitle title={venueData.Name} subtitle={"Live Music Venue in "+ venueData.City +", CO"} />
        <BlueBorder />
      </div>
    </Layout>
  );
};

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query VenuePage($venue: String) {
    venue: airtable(data: { Name: { eq: $venue } }) {
      fields {
        slug
      }
      data {
        Name
        City
        Description
        Address
      }
    }

    events: allAirtable(
      limit: 1000
      sort: { fields: [data___StartDate], order: DESC }
      filter: {
        data: { Venue_Name: { eq: $venue }, Status: { eq: "Published" } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          data {
            StartDate
            EndDate
            DoorsTime
            Name
            Description
            Tags
            Featured
            Image {
              url
            }
            Genre
            Name__from_Genre_
            Venue_City
            Venue_Name
          }
        }
      }
    }
  }
`;

export default City;
