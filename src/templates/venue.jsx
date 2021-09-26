import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import PageTitle from "../components/Pages/PageTitle/PageTitle";
import BlueBorder from "../components/BlueBorder/BlueBorder";
import EventList from "../components/EventList/EventList";
import MetaList from "../components/MetaList/MetaList";

const City = ({ pageContext, data }) => {
  const { venue } = pageContext;
  console.log({ venueContext: pageContext });
  const postEdges = data.events.edges;
  const venueData = data.venue.data;

  let metaArray = [
    venueData.Address && {
      icon: "map-marker-alt",
      label: venueData.Address,
      link: "http://maps.google.com/?q=" + venueData.Address,
    },
    venueData.Phone && {
      icon: "phone-alt",
      label: venueData.Phone,
      link: "tel:" + venueData.Phone,
    },
    venueData.Website && {
      icon: "desktop",
      label: "Website",
      link: venueData.Website,
    },
  ];

  return (
    <Layout>
      <div className="category-container">
        <Helmet
          title={`Live Music at ${venueData.Name} in ${venueData.City}, CO | ${config.siteTitle}`}
        />
        <PageTitle
          title={venueData.Name}
          subtitle={"Live Music Venue in " + venueData.City + ", CO"}
          logo={venueData.Logo ? venueData.Logo[0].url : null}
          accentColor={venueData.AccentColor}
        >
          <MetaList metaArray={metaArray} />
          {venueData.Description && <p className="venue__description">{venueData.Description}</p>}
        </PageTitle>

        <BlueBorder />
        <PageTitle
          title={
            data.events.totalCount + " Upcoming Shows at " + venueData.Name
          }
        />
        <EventList eventNodes={postEdges} />
      </div>
    </Layout>
  );
};

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query VenuePage($venue: String, $today: Date!) {
    venue: airtable(data: { Name: { eq: $venue } }) {
      fields {
        slug
      }
      data {
        Name
        City
        Description
        Address
        Phone
        Website
        AccentColor
        Logo {
          url
        }
        Tags
      }
    }

    events: allAirtable(
      limit: 1000
      sort: { fields: [data___StartDate], order: ASC }
      filter: {
        data: {
          StartDate: { gt: $today }
          Venue_Name: { eq: $venue }
          Status: { eq: "Published" }
        }
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
            Subtitle
            Description
            Tags
            Featured
            Artist_Genres
            Image {
              url
            }
            Venues {
              fields {
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

export default City;
