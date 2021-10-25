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
  const { city } = pageContext;
  const postEdges = data.events.edges;
  const venues = data.venues.edges;
  return (
    <Layout showFooterCTA={false}>
      <div className="category-container">
        <Helmet title={`Live Music In ${city} | ${config.siteTitle}`} />
        <PageTitle title={"Live Music In " + city} />
        <ForecastGrid daysToShow={14} postEdges={postEdges} city={city} />
        <BlueBorder />

        <PageTitle title={"Venues In " + city} />

        <VenueGrid venues={venues} />
      </div>
    </Layout>
  );
};

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CityPage($city: [String]) {
    events: allAirtable(
      limit: 1000
      sort: { fields: [data___StartDate], order: ASC }
      filter: {
        data: { Venue_City: { in: $city }, Status: { eq: "Published" } }
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
            SoldOut
            Tags
            Featured
            Artist_Genres
            Artists {
              fields {
                slug
              }
              data {
                Name
              }
            }
            Image {
              url
            }
            Venue_City
            Venue_Name
            Venues {
              fields{
                slug
              }
              data {
                City
                Name
              }
            }
          }
        }
      }
    }
    venues: allAirtable(
      limit: 1000
      sort: { fields: [data___Featured, data___EventCount], order: [ASC, DESC] }
      filter: { table: { eq: "Venues" }, data: { City: { in: $city }, Status: {eq: "Published"}, EventCount: {gt: 0} } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          data {
            Name
            Description
            Tags
            Featured
            City
            AccentColor
            Logo {
              url
            }
          }
        }
      }
    }
  }
`;

export default City;
