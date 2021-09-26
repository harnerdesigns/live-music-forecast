import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import PageTitle from "../components/Pages/PageTitle/PageTitle";
import { graphql } from "gatsby";

import ArtistsGrid from "../components/ArtistsGrid/ArtistsGrid";
import LetterPagination from "../components/Pagination/LetterPagination";
const ArtistsPage = ({ data, pageContext }) => {
  const pageArtists = data.page.edges;
  const featuredArtists = data.featured.edges;
  const indieArtists = data.indie.edges;

  console.log({ pageContext });

  let letterLinkList = pageContext.letters.map((letter)=>{
    return(
      <a className={"letter" + (letter === pageContext.currentLetter ? " letter--active" : "")} href={"/artists/" + (letter !== "#" ? letter : "other")}>{letter}</a>
    )
  })

  return (
    <Layout>
      <main className="browse__container">
        <Helmet title={`CO Live Music Artist Database | ${config.siteTitle}`} />
        <PageTitle
          title={pageContext.currentLetter ? "Artists Starting With " + pageContext.currentLetter : "Artists Database"}
          subtitle={!pageContext.currentLetter && "All The Cool Artists Coming to Colorado"}
        />
        <div className="letter-link-list">
          Search By Letter: {letterLinkList}
          </div>
        {pageContext.currentLetter ? <ArtistsGrid artists={pageArtists} /> : <> <PageTitle subtitle={"Smaller Artists With Shows Scheduled"} /><ArtistsGrid artists={indieArtists} /><PageTitle subtitle={"Top Artists With Shows Scheduled"} /><ArtistsGrid artists={featuredArtists} />  </>}
        {pageContext.currentLetter && <LetterPagination
        totalPages={pageContext.totalPages}
          nextLetter={pageContext.nextLetter}
          prevLetter={pageContext.prevLetter}
          currentLetter={pageContext.currentLetter}
          urlBase="/artists"
        />}
      </main>
    </Layout>
  );
};

export default ArtistsPage;

export const pageQuery = graphql`
query ArtistsQuery($currentLetterFilter: String) {
  page: allAirtable(

    sort: { fields: [data___Name], order: ASC }
    filter: { table:{eq: "Artists"}, data: {Name: { regex: $currentLetterFilter }} }
  ) {
    edges {
      node {
        fields {
          slug
        }
        data {
          Name
          SpotifyID
          SpotifyURL
          Bio
          Twitter
          Instagram
          Facebook
          Soundcloud
          GenresRec {
            data {
              Name
            }
          }
          Image {
            url
          }
        }
      }
    }
  },
  featured: allAirtable(
    limit: 12
    sort: { fields: [data___SpotifyFollowers], order: DESC }
    filter: { table:{eq: "Artists"} data: {SpotifyFollowers: {gt: 1} EventCount: { gte: 1} } }
  ) {
    edges {
      node {
        fields {
          slug
        }
        data {
          Name
          SpotifyID
          SpotifyURL
          Bio
          Twitter
          Instagram
          Facebook
          Soundcloud
          GenresRec {
            data {
              Name
            }
          }
          Image {
            url
          }
        }
      }
    }
  }

  indie: allAirtable(
    limit: 12
    sort: { fields: [data___SpotifyFollowers], order: ASC }
    filter: { table:{eq: "Artists"} data: {SpotifyFollowers: {gt: 1} EventCount: { gte: 1} } }
  ) {
    edges {
      node {
        fields {
          slug
        }
        data {
          Name
          SpotifyID
          SpotifyURL
          Bio
          Twitter
          Instagram
          Facebook
          Soundcloud
          GenresRec {
            data {
              Name
            }
          }
          Image {
            url
          }
        }
      }
    }
  }
}
`;
