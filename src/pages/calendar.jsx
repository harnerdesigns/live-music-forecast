import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";

import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import Calendar from 'react-awesome-calendar';

class Search extends React.Component {
  render() {
    const postEdges = this.props.data.allAirtable.edges;
    console.log({context: this.props.pageContext});
    console.log({postEdges});

    let events = []
    postEdges.forEach((edge, i) => {

      let {node} = edge
      events.push({
        id: i,
        from: node.data.StartDate,
        to: node.data.EndDate,
        title: node.data.Name
      })
      
    });
    console.log({events});
    return (
      <Layout>
        <div className="index-container">
          <SEO />
          <Helmet title={config.siteTitle} />
          <Calendar events={events} />
        </div>
      </Layout>
    );
  }
}

export default Search;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
query CalendarQuery($today: Date!) {
  allAirtable(
    limit: 10
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
