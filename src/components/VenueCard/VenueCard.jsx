import React from "react";
import { Link } from "gatsby";
import "./VenueCard.scss";
import moment from "moment";
import siteConfig from "../../../data/SiteConfig";
import Slider from "react-slick";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import GrayCo from "../../images/gray-co.svg";

import genreIcons from "../genre-icons";
import BlueBorder from "../BlueBorder/BlueBorder";

const VenueCard = ({ node }) => {
  
  let venue = node.data
  return (
    <div
      key={venue.Name}
      className={
        "venue__card" + (venue.Featured ? " venue__card--featured" : "")
      }
    >
      <Link className="venue__link" to={node.fields.slug} key={venue.Name} />

      {venue.Logo && (
        <div className="venue__image-wrapper">
          <img style={{backgroundColor: venue.AccentColor}} className="venue__image" src={venue.Logo[0].url} />
        </div>
      )}

      {!venue.Logo && (
        <div className="venue__image-wrapper venue__image-wrapper--empty">
          <img className="venue__image " src={GrayCo} />
        </div>
      )}

      <div className="venue__card-heading">
        <h2 className="venue__name">{venue.Name}</h2>
        <div className="venue__meta-wrapper">
        <div className="venue__tag venue__city">
          <FontAwesomeIcon fixedWidth icon="map-marker-alt" />
          {venue.City}
        </div>

        {venue.Tags &&
          venue.Tags.map((tag) => {
            return (
              <div key={_.camelCase(tag)} className={"venue__tag venue__tag--" + _.camelCase(tag)}>
                <FontAwesomeIcon fixedWidth icon={genreIcons[tag] || "tag"} />

                {tag}
              </div>
            );
          })}
      </div>
      </div>


     
    </div>
  );
};

export default VenueCard;
