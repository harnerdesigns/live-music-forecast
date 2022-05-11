import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import moment from "moment-timezone";
import config from "../../data/SiteConfig";
import PageTitle from "../components/Pages/PageTitle/PageTitle";
import BlueBorder from "../components/BlueBorder/BlueBorder";
import EventList from "../components/EventList/EventList";
import Ad from "../components/Ad/Ad";

const Day = ({ pageContext, data }) => {
  const { day } = pageContext;

  const dateObject = moment(day, 'MM-DD-YYYY');
  console.log({day, dateObject})

  const postEdges = data.events.edges;
  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  const grouped = groupBy(postEdges, ({ node }) =>
    node.data.Venue_City ? node.data.Venue_City[0] : null
  );

  let keys = grouped.keys();
  let cityMap = Array.from(keys).map((key) => {
    return (
      <>
        <PageTitle subtitle={key || "Other"} />
        <EventList eventNodes={grouped.get(key)} />
        <Ad />
      </>
    );
  });
  return (
    <Layout showFooterCTA={false}>
      <div className="category-container">
        <Helmet title={`Live Music On ${dateObject.format('MMM Do YYYY')} > Colorado Live Music | ${config.siteTitle}`} />
        <PageTitle title={"Colorado Live Music on " + dateObject.format('ddd, MMM Do YYYY')} />
        {cityMap}
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
      filter: { data: { Day: { eq: $day }, Status: { eq: "Published" } } }
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
              fields {
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
