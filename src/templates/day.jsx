import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import PageTitle from "../components/Pages/PageTitle/PageTitle";
import BlueBorder from "../components/BlueBorder/BlueBorder";
import EventList from "../components/EventList/EventList";

const Day = ({ pageContext, data }) => {
  const { day } = pageContext;
  const postEdges = data.events.edges;
  return (
    <Layout showFooterCTA={false}>
      <div className="category-container">
        <Helmet title={`${day} > Colorado Live Music | ${config.siteTitle}`} />
        <PageTitle title={"Colorado Live Music on " + day} />
        <EventList eventNodes={postEdges} />

      </div>
    </Layout>
  );
};

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query DayPage($day: String) {
    events: allAirtable(
      limit: 1000
      sort: { fields: [data___StartDate], order: ASC }
      filter: {
        data: { Day: { eq: $day }, Status: { eq: "Published" } }
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
            Day
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
    
  }
`;

export default Day;
