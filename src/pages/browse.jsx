import React, { Component } from "react";
import { graphql } from 'gatsby';
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import BrowseGrid from "../components/Pages/BrowseGrid/Browse";
import PageTitle from "../components/Pages/PageTitle/PageTitle";
import BlueBorder from "../images/blue-border.svg";

class BrowsePage extends Component {

  
  render() {
    const postEdges = this.props.data.events.edges;

    return (
      <Layout>
        <main className="browse__container">
          <Helmet title={`Browse Events | ${config.siteTitle}`} />
          <PageTitle>
          <h1>
            Browse Shows By <a href="#city-grid">City</a>, or <a href="#genre-grid">Genre</a>
          </h1>
          <h2>Find Great Live Music All Over The State</h2>
        </PageTitle>
        <img className="blue-border" src={BlueBorder} />
          <BrowseGrid events={postEdges} />
        </main>
      </Layout>
    );
  }
}

export default BrowsePage;


export const pageQuery = graphql`
query BrowseQuery($today: Date!) {
  events: allAirtable(
    limit: 2000
    sort: {fields: [data___StartDate, data___Featured], order: DESC}
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
          Image{
            url
          }
          Venue_City
          Venue_Name
          Artist_Genres
        }
      }
    }
  }
}
`;
