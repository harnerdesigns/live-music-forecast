import React, { createRef } from "react";
import Helmet from "react-helmet";
import { graphql, navigate } from "gatsby";
import Layout from "../layout";

import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import Calendar from "react-awesome-calendar";

import moment from "moment-timezone";
import { nl } from "date-fns/locale";
class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.calendar = React.createRef();
  }

  componentDidMount() {
    const details = this.calendar.current.getDetails();
    console.log(details);
    /* result
      {
          mode: 'monthlyMode',
          year: 2019,
          month: 0,
          day: 1
      }
  */
    // call endpoint to retrieve events
  }

  render() {
    const postEdges = this.props.data.allAirtable.edges;
    console.log({ context: this.props.pageContext });
    console.log({ postEdges });

    let events = [];
    postEdges.forEach((edge, i) => {
      let { node } = edge;
      events.push({
        id: node.fields.slug,
        from: moment(node.data.StartDate)
        .tz("America/Denver")
        .format(),
        to: node.data.EndDate
          ? node.data.EndDate
          : moment(node.data.StartDate)
              .tz("America/Denver")
              .add(2, "hours")
              .format(),
        title: node.data.Name,
        color: "#f00",
      });
    });
    console.log({ events });

    return (
      <Layout>
        <div className="index-container">
          <SEO />
          <Helmet title={config.siteTitle} />
          <Calendar
            ref={this.calendar}
            events={events}
            onClickEvent={(event) => {
              navigate(event);
            }}
          />
        </div>
      </Layout>
    );
  }
}

export default CalendarPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CalendarQuery {
    allAirtable(
      limit: 10
      sort: { fields: [data___StartDate, data___Featured], order: [ASC, DESC] }
      filter: { data: { Status: { eq: "Published" } } }
    ) {
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
            TicketURL
            SoldOut
            Image {
              url
            }
            Artist_Genres
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
