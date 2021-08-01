import React from "react";
import { Link } from "gatsby";
import "./EventCard.scss";
import moment from "moment";
import siteConfig from "../../../data/SiteConfig";
import Slider from "react-slick";
import _ from "lodash";
import { FontAwesomeIcon } from "../../../node_modules/@fortawesome/react-fontawesome/index";

import GrayCo from "../../images/gray-co.svg";
import BlueBorder from "../../images/blue-border.svg";

import genreIcons from "../genre-icons";

const EventCard = ({ event }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <div
      key={event.name}
      className={
        "event__card" + (event.featured ? " event__card--featured" : "")
      }
    >
      <Link className="event__link" to={event.path} key={event.name} />
      {event.images && event.featured && (
        <Slider {...settings}>
          {event.images.map((Image) => (
            <div className="event__image-wrapper">
              <img className="event__image" src={Image.url} />
            </div>
          ))}
        </Slider>
      )}

      {event.images && !event.featured && (
        <div className="event__image-wrapper">
          <img className="event__image" src={event.images[0].url} />
        </div>
      )}

      {!event.images && (
        <div className="event__image-wrapper">
          <img className="event__image" src={GrayCo} />
        </div>
      )}

      <div className="event__card-heading">
        <h2 className="event__name">{event.name}</h2>
        <h3 className="event__venue-name">{event.venue_name}</h3>

        <h4 className="event__time-wrapper">
          {moment(event.startDate).format("h:mm A")}{" "}
          {event.doorsTime &&
            "| Doors at " + moment(event.doorsTime).format("h:mm A")}
        </h4>
      </div>
      {event.featured && event.description && (
        <>
          <div className="event__description">{event.description}</div>
          <img className="blue-border" src={BlueBorder} />
        </>
      )}

      <div className="event__meta-wrapper">
        <div class="event__tag event__city">
          <FontAwesomeIcon fixedWidth icon="map-marker-alt" />
          {event.venue_city}
        </div>

        {event.tags &&
          event.tags.map((tag) => {
            return (
              <div className={"event__tag event__tag--" + _.camelCase(tag)}>
                <FontAwesomeIcon fixedWidth icon={genreIcons[tag] || "tag"} />

                {tag}
              </div>
            );
          })}

        {event.genres.map((genre) => (
          <div className={"event__tag event__tag--" + _.camelCase(genre)}>
            <FontAwesomeIcon fixedWidth icon={genreIcons[genre] || "music"} />
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
