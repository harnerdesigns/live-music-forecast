import React from "react";
import { Link } from "gatsby";
import "./EventCard.scss";
import moment from 'moment';
import siteConfig from "../../../data/SiteConfig";
import Slider from "react-slick";
import _ from "lodash"

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

        <div key={event.name} className={"event__card" + (event.featured ? " event__card--featured" : "")}>
            <Link className="event__link" to={event.path} key={event.name}>
            </Link>
            {event.images && <Slider {...settings}>{event.images.map((Image)=>(
                <div className="event__image-wrapper">
                    
            <img className="event__image" src={Image.url} />
                </div>
            ))}</Slider>}
            <h1 className="event__name">{event.name}</h1>
            <ul class="event__genres">
                {event.genres.map((genre)=>(
                    <li className={"genre__tag genre__tag--" + _.camelCase(genre) }>{genre}</li>
                ))}
            </ul>
        </div>
    )
}

export default EventCard