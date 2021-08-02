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

const City = ({pageContext, data}) => {
  
    const { city } = pageContext;
    const postEdges = data.events.edges;
    const venues = data.venues.edges;
    return (
      <Layout>
        <div className="category-container">
          <Helmet
            title={`Live Music In ${city} | ${config.siteTitle}`}
          />
          <PageTitle title={"Live Music In " + city} />
          <ForecastGrid daysToShow={5} postEdges={postEdges} city={city} />
          <BlueBorder />

          <PageTitle title={"Venues In " + city} />

          <VenueGrid venues={ venues } />

        </div>
      </Layout>
    );
  
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CityPage($city: [String]) {
    events: allAirtable(
      limit: 1000
      sort: { fields: [data___StartDate], order: DESC }
      filter: { data : { Venue_City: { in: $city }, Status: {eq: "Published"} } }
    ) {
      totalCount
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
            Description
            Tags
            Featured
            Image{
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
    venues: allAirtable(
      limit: 1000
      sort: { fields: [data___StartDate], order: DESC }
      filter: {table: {eq: "Venues"} data : { City: { in: $city } } }
    ) {
      totalCount
      edges {
        node {
          fields{
            slug
          }
          data {
            
            Name
            Description
            Tags
            Featured
            City
            Logo{
              url
            }
          }
        }
      }
    }
  }
`;

export default City
