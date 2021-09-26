import React from "react";
import { Link } from "gatsby";
import "./ArtistsGrid.scss";
import _ from "lodash";
import EventCard from "../EventCard/EventCard";
import ArtistCard from "../ArtistCard/ArtistCard";

const ArtistsGrid = ({ artists }) => {
  console.log({ artists });

  let artistMap = artists.map((artist) => {
    if (artist.node) {
      artist = artist.node;
    }
    return <ArtistCard artist={artist} />;
  });

  return (
    <section className={"artist__grid"}>
      {artistMap}
    </section>
  );
};

export default ArtistsGrid;
