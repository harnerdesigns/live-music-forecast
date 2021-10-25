import React from "react";
import { Link } from "gatsby";
import "./EventCard.scss";
import moment from "moment";
import siteConfig from "../../../data/SiteConfig";
import Slider from "react-slick";
import _ from "lodash";
import { FontAwesomeIcon } from "../../../node_modules/@fortawesome/react-fontawesome/index";

import GrayCo from "../../images/gray-co.svg";

import genreIcons from "../genre-icons";
import BlueBorder from "../BlueBorder/BlueBorder";

const EventCard = ({
  event,
  showImage = true,
  showDate = false,
  showTicket = false,
  showLink = true,
  featured = false,
}) => {
  let eventData = event.data;

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
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
      key={eventData.Name}
      className={
        "event__card" +
        (eventData.Featured || featured ? " event__card--featured" : "")
      }
    >
      {showLink && (
        <Link
          className="event__link"
          to={event.fields.slug}
          key={eventData.Name}
        />
      )}
      {showImage && eventData.Image && eventData.Featured && (
        <Slider {...settings}>
          {eventData.Image.map((Image) => (
            <div className="event__image-wrapper">
              <img className="event__image" src={Image.url} />
            </div>
          ))}
        </Slider>
      )}

      {showImage && eventData.Image && !eventData.Featured && (
        <div className="event__image-wrapper">
          <img className="event__image" src={eventData.Image[0].url} />
        </div>
      )}

      {showImage && !eventData.Image && (
        <div className="event__image-wrapper">
          <img className="event__image" src={GrayCo} />
        </div>
      )}

      <div className="event__card-heading">
        <h2 className="event__name">{eventData.Name}</h2>
        {eventData.Subtitle && (
          <h3 className="event__subtitle">{eventData.Subtitle}</h3>
        )}

          <h4 className="event__time-wrapper">
            {moment(eventData.StartDate).format(
              showDate ? "MM/DD/YYYY @ h:mm A" : "h:mm A"
            )}{" "}
            {eventData.DoorsTime &&
              "| Doors @ " + moment(eventData.DoorsTime).format("h:mm A")}
          {eventData.Venues && (
            <Link className="event__venue-name" to={eventData.Venues[0].fields.slug}>
                 {(showDate ? '-' : '@')} {eventData.Venues[0].data.Name}
            </Link>
          )}
          </h4>
      </div>

      <div className="event__meta-wrapper">
        {eventData.SoldOut && (
          <div class="event__tag event__tag--sold-out">
            <FontAwesomeIcon fixedWidth icon="ban" />
            Sold Out
          </div>
        )}
        {eventData.Venues && (
          <Link
            to={`/browse/${_.kebabCase(eventData.Venues[0].data.City)}`}
            className="event__tag event__city"
          >
            <FontAwesomeIcon fixedWidth icon="map-marker-alt" />
            {eventData.Venues[0].data.City}
          </Link>
        )}

        {eventData.Tags &&
          eventData.Tags.map((tag) => {
            return (
              <div className={"event__tag event__tag--" + _.camelCase(tag)}>
                <FontAwesomeIcon fixedWidth icon={genreIcons[tag] || "tag"} />

                {tag}
              </div>
            );
          })}

        {eventData.Genres &&
          eventData.Genres.map((genre, index) => {
            if (index > 2) {
              return (
                <Link
                  to={`/browse/genres/${genre}`}
                  className={"event__tag event__tag--" + _.camelCase(genre)}
                >
                  <FontAwesomeIcon
                    fixedWidth
                    icon={genreIcons[genre] || "music"}
                  />
                  {genre}
                </Link>
              );
            }
          })}
        {eventData.Artist_Genres &&
          eventData.Artist_Genres.map((genre, index) => {
            if (index < 2) {
              return (
                <Link
                  to={`/browse/genres/${_.kebabCase(genre)}`}
                  className={"event__tag event__tag--" + _.camelCase(genre)}
                >
                  <FontAwesomeIcon
                    fixedWidth
                    icon={genreIcons[genre] || "music"}
                  />
                  {genre}
                </Link>
              );
            }
          })}
      </div>

      {(eventData.Featured || showTicket) &&
        !eventData.SoldOut &&
        eventData.TicketURL && (
          <a
            href={eventData.TicketURL}
            target="_blank"
            rel="noreferrer noopener"
            className="button event__ticket-button"
          >
            Buy Tickets{" "}
            {eventData.Price &&
              `(${
                !isNaN(parseFloat(eventData.Price))
                  ? formatter.format(parseFloat(eventData.Price))
                  : eventData.Price
              }${eventData.PriceRange ? "+" : ""})`}
            <FontAwesomeIcon icon="external-link-alt" />
          </a>
        )}
    </div>
  );
};

export default EventCard;
