import React from "react";
import { Link } from "gatsby";
import "./ForecastGrid.scss";
import moment from "moment";
import siteConfig from "../../../data/SiteConfig";
import EventCard from "../EventCard/EventCard";
import { FontAwesomeIcon } from "../../../node_modules/@fortawesome/react-fontawesome/index";
import { isSet } from "lodash";

const getPostList = (postEdges) => {
  const postList = [];

  postEdges.forEach((postEdge) => {
    let args = {
      path: postEdge.node.fields.slug,
      tags: postEdge.node.data.Tags,
      category: postEdge.node.data.Category,
      name: postEdge.node.data.Name,
      startDate: postEdge.node.data.StartDate,
      endDate: postEdge.node.data.EndDate,
      doorsTime: postEdge.node.data.DoorsTime,
      featured: postEdge.node.data.Featured,
      images: postEdge.node.data.Image,
      genres: postEdge.node.data.Name__from_Genre_,
      venue_city: postEdge.node.data.Venue_City,
      venue_name: postEdge.node.data.Venue_Name,
      description: postEdge.node.data.Description,
    };
    if (
      postList[
        moment(postEdge.node.data.StartDate).format(siteConfig.dateFormat)
      ]
    ) {
      postList[
        moment(postEdge.node.data.StartDate).format(siteConfig.dateFormat)
      ].push(args);
    } else {
      postList[
        moment(postEdge.node.data.StartDate).format(siteConfig.dateFormat)
      ] = [args];
    }
  });
  console.log({ postList });

  return postList;
};

const ForecastGrid = ({ showButton, postEdges, daysToShow, city }) => {
  const postList = getPostList(postEdges);
  const today = moment(new Date());

  let dayArray = [
    {
      date: today.format(siteConfig.dateFormat),
      shortDay: "Today",
      longDay: "Today",
    },
  ];

  for (let i = 0; i < daysToShow - 1; i++) {
    let newDay = today.add(1, "days");
    dayArray.push({
      date: newDay.format(siteConfig.dateFormat),
      shortDay: newDay.format("ddd"),
      longDay: newDay.format("dddd"),
    });
  }

  return (
    <section className="forecast__grid">
      <div className="forecast__header"><span className="forecast__title">
        {city ? city + "'s" : "Colorado's"} {daysToShow} Day Live Music Forecast:
        </span>
        </div>
      {dayArray.map((day) => (
        <div className={"forecast__day" + ` forecast__day--${day.shortDay}`}>
          <div className="forecast__meta">
            <h1>{day.shortDay}</h1>
            <h2>{day.date}</h2>
          </div>
          <div className="forecast__scroller">
            {/* Your post list here. */
            postList[day.date] ? (
              postList[day.date].map((day) => <EventCard event={day} />)
            ) : (
              <h4 className="empty-day">
                😢
                <br /> Nothing {day.longDay}
              </h4>
            )}
          </div>
        </div>
      ))}
      {showButton ? (
        <Link to="/calendar" className="calendar-link">
          <FontAwesomeIcon icon="calendar" />
          See The Whole Calendar &raquo;
        </Link>
      ) : null}
    </section>
  );
};

export default ForecastGrid;
