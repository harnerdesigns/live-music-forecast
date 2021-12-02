import React from "react";
import "./ArtistsHeader.scss";
import _ from "lodash";
import PageTitle from "../Pages/PageTitle/PageTitle";
import { FontAwesomeIcon } from "../../../node_modules/@fortawesome/react-fontawesome/index";
import ArtistCard from "../ArtistCard/ArtistCard";

const ArtistsHeader = ({ artist }) => {

  let artistData = artist.data;
  return (
    <section className={"artist-header"}>
      <ArtistCard artist={artist} large />
  
    </section>
  );
};

export default ArtistsHeader;
