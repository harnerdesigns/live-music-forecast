import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import PageTitle from "../components/Pages/PageTitle/PageTitle";
import BlueBorder from "../components/BlueBorder/BlueBorder";
import EventList from "../components/EventList/EventList";
import ArtistsHeader from "../components/ArtistsHeader/ArtistsHeader";
import styled from "styled-components";
import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome/index";

const Artist = ({ pageContext, data }) => {
  const postEdges = data.events.edges;
  const artist = data.artist;
  const artistData = data.artist.data;
  return (
    <Layout>
      <div className="category-container">
        <Helmet
          title={`${artistData.Name} Live Shows in Colorado | ${config.siteTitle}`}
        />
        <ArtistsHeader artist={artist} />
        <BlueBorder />

        <PageTitle
          subtitle={
            artistData.Name +
            " has " +
            data.events.totalCount +
            " Upcoming Shows in Colorado"
          }
        />
        <EventList eventNodes={postEdges} />
        <BlueBorder />
        <ArtistPageGrid>
          {artistData.SpotifyID && (
            <div>
              <PageTitle subtitle={"Listen To " + artistData.Name} />

              <iframe
                src={
                  "https://open.spotify.com/embed/artist/" +
                  artistData.SpotifyID
                }
                height="400"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
                style={{ margin: "0 auto 1rem", display: "block" }}
              ></iframe>
            </div>
          )}
          {artistData.Name && (
            <div>
              <PageTitle subtitle={"Follow " + artistData.Name} />
              <div className="artist-page__links-wrapper">
                {artistData.SpotifyURL && (
                  <a
                    className="artist-link artist-link--spotify"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={artistData.SpotifyURL}
                  >
                    <FontAwesomeIcon fixedWidth icon={["fab", "spotify"]} />{" "}
                    Spotify
                  </a>
                )}

                <a
                  className="artist-link artist-link--amazon"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.amazon.com/s?k=${artistData.Name}&amp;i=digital-music&_encoding=UTF8&tag=colivemusicforecast-20`}
                >
                  <FontAwesomeIcon fixedWidth icon={["fab", "amazon"]} /> Amazon
                </a>

                {artistData.Twitter && (
                  <a
                    className="artist-link artist-link--twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://twitter.com/" + artistData.Twitter}
                  >
                    <FontAwesomeIcon fixedWidth icon={["fab", "twitter"]} />{" "}
                    Twitter
                  </a>
                )}

                {artistData.Instagram && (
                  <a
                    className="artist-link artist-link--instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://instagram.com/" + artistData.Instagram}
                  >
                    <FontAwesomeIcon fixedWidth icon={["fab", "instagram"]} />{" "}
                    Instagram
                  </a>
                )}

                {artistData.Facebook && (
                  <a
                    className="artist-link artist-link--facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://facebook.com/" + artistData.Facebook}
                  >
                    <FontAwesomeIcon fixedWidth icon={["fab", "facebook"]} />{" "}
                    Facebook
                  </a>
                )}

                {artistData.Soundcloud && (
                  <a
                    className="artist-link artist-link--soundcloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://soundcloud.com/" + artistData.Soundcloud}
                  >
                    <FontAwesomeIcon fixedWidth icon={["fab", "soundcloud"]} />{" "}
                    Soundcloud
                  </a>
                )}

                {artistData.LastFMURL && (
                  <a
                    className="artist-link artist-link--last-fm"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={artistData.LastFMURL}
                  >
                    <FontAwesomeIcon fixedWidth icon={["fab", "lastfm"]} />{" "}
                    Last.fm
                  </a>
                )}
              </div>
            </div>
          )}
        </ArtistPageGrid>
        <BlueBorder />
      </div>
    </Layout>
  );
};

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ArtistPage($artist: String, $today: Date!) {
    artist: airtable(
      table: { eq: "Artists" }
      data: { Name: { eq: $artist } }
    ) {
      fields {
        slug
      }
      data {
        Name
        SpotifyID
        SpotifyURL
        LastFMURL
        Bio
        Twitter
        Instagram
        Facebook
        Soundcloud
        Genres
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

    events: allAirtable(
      limit: 1000
      sort: { fields: [data___StartDate], order: ASC }
      filter: {
        table: { eq: "Events" }
        data: {
          StartDate: { gte: $today }
          Name__from_Artists_: { eq: $artist }
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

export default Artist;

const ArtistPageGrid = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  margin: 0 auto;

  @media screen and (min-width: 70rem) {
    grid-template-columns: 1fr 1fr;
    width: 50%;
  }

  iframe {
    width: 100% !important;
  }
`;
