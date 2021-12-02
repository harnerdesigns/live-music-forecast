import React, { useRef, useState, useEffect } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import PageTitle from "../components/Pages/PageTitle/PageTitle";
import { graphql, Link } from "gatsby";

import ArtistsGrid from "../components/ArtistsGrid/ArtistsGrid";
import LetterPagination from "../components/Pagination/LetterPagination";
import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome/index";
import SearchBox from "../components/SearchBox/SearchBox";
const ArtistsSearchPage = ({ data, pageContext }) => {
  let pageArtists = data.page.edges;

  let [search, setSearch] = useState("");
  let [filteredArtists, setFilteredArtists] = useState([]);

  useEffect(() => {
    
  }, [search]);


  const onSubmit = (e) => {
    e.preventDefault();
    setFilteredArtists(pageArtists.filter((artist) => {
      artist.node.data.Name.toLowerCase().includes(search.toLowerCase());
    }));
  }

  let letterLinkList = pageContext.letters.map((letter) => {
    return (
      <Link
        className={
          "letter" +
          (letter === pageContext.currentLetter ? " letter--active" : "")
        }
        to={"/artists/" + (letter !== "#" ? letter : "other")}
      >
        {letter}
      </Link>
    );
  });

  return (
    <Layout>
      <main className="browse__container">
        <Helmet title={`CO Live Music Artist Database | ${config.siteTitle}`} />
        <PageTitle
          title={
            pageContext.currentLetter
              ? "Artists Starting With " + pageContext.currentLetter
              : "Artists Database"
          }
          subtitle={
            !pageContext.currentLetter &&
            "All The Cool Artists Coming to Colorado"
          }
        />
        <div className="letter-link-list">
          Search By Letter: {letterLinkList}
          <Link className={"letter letter--active"} to="/artists/search">
            <FontAwesomeIcon icon="search" /> Search
          </Link>
        </div>

        <SearchBox search={search} setSearch={setSearch} onSubmit={onSubmit} />

        <ArtistsGrid artists={filteredArtists} />
      </main>
    </Layout>
  );
};

export default ArtistsSearchPage;

export const pageQuery = graphql`
  query ArtistsSearchQuery {
    page: allAirtable(
      sort: { fields: [data___Name], order: ASC }
      filter: { table: { eq: "Artists" } }
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
