import React from "react";
import { Link } from "gatsby";
import "./ArtistCard.scss";
import _ from "lodash";

const ArtistCard = ({ artist, large = false }) => {
  console.log({ artist });

  return (
    <Link
      to={artist.fields.slug}
      className={"artist__card " + (large ? "artist__card--large" : null)}
    >
      {artist.data.Image && (
        <div className="artist__image-wrapper">
          <img className="artist__image" src={artist.data.Image[0].url} />
        </div>
      )}
      <div>
        <h4 className="artist__name">{artist.data.Name}</h4>
        {large && artist.data.Bio && (
          <div
            className="aritst__bio"
            dangerouslySetInnerHTML={{ __html: artist.data.Bio }}
          ></div>
        )}
        {large &&
          artist.data.GenresRec &&
          artist.data.GenresRec.map((genre) => {
            return(<Link to={"/browse/genres/"+_.kebabCase(genre.data.Name)}>{genre.data.Name}</Link>);
          })}
      </div>
    </Link>
  );
};

export default ArtistCard;
