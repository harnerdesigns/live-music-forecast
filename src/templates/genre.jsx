import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import PageTitle from "../components/Pages/PageTitle/PageTitle";
import BlueBorder from "../components/BlueBorder/BlueBorder";
import EventList from "../components/EventList/EventList";
import MetaList from "../components/MetaList/MetaList";
import ArtistsGrid from "../components/ArtistsGrid/ArtistsGrid";

const Genre = ({ pageContext, data }) => {
  const { genre } = pageContext;
  const postEdges = data.events.edges;
  const genreData = data.genre.data;
  const artists = data.artists.edges;

  return (
    <Layout>
      <div className="category-container">
        <Helmet
          title={`Live ${genreData.Name} Music in Colorado | ${config.siteTitle}`}
        />
        <PageTitle
          title={genreData.Name}
          subtitle={`Live ${genreData.Name} Music in Colorado`}
          logo={genreData.Logo ? genreData.Logo[0].url : null}
          accentColor={genreData.AccentColor}
        >
          {genreData.Description && <p className="venue__description">{genreData.Description}</p>}
        </PageTitle>

        <BlueBorder />
        <PageTitle
          title={
            `${data.events.totalCount} Upcoming ${genreData.Name} Shows`
          }
        />
        <EventList eventNodes={postEdges} />

        <BlueBorder />
        <PageTitle
          title={
            `${artists.length} ${genreData.Name} Artist`
          }
        />
        <ArtistsGrid artists={artists} />
      </div>
    </Layout>
  );
};

/* eslint no-undef: "off" */
export const pageQuery = graphql`
query GenrePage($genre: String, $genreRegex:String, $today: Date) {
  genre: airtable(data: {Name: {eq: $genre}}) {
    fields {
      slug
    }
    data {
      Name
      Number_Of_Artists
      Number_Of_Events
    }
  }
  artists: allAirtable(
    limit: 1000
    sort: {fields: [data___Number_Of_Events], order: DESC}
    filter: {table:{eq: "Artists"}, data: {Genres: {regex: $genreRegex}}}
  ) {
    totalCount
    edges {
      node {
        fields {
          slug
        }
        data {
          Name
          Bio
          Number_Of_Events
          SpotifyFollowers
          Genres
          Image {
            url
          }
        }
      }
    }
  }
  
  events: allAirtable(
    limit: 1000
    sort: {fields: [data___StartDate], order: ASC}
    filter: {data: {StartDate: {gt: $today}, Artist_Genres: {eq: $genre}, Status: {eq: "Published"}}}
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

export default Genre;
