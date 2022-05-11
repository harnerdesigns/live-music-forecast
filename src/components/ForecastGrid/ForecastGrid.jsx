import React, { useState } from "react";
import { Link } from "gatsby";
import "./ForecastGrid.scss";
import moment from "moment-timezone";
import siteConfig from "../../../data/SiteConfig";
import EventCard from "../EventCard/EventCard";
import { FontAwesomeIcon } from "../../../node_modules/@fortawesome/react-fontawesome/index";
import { isSet } from "lodash";
import NewsletterSignup from "../NewsletterSignup/NewsletterSignup";
import Ad from "../Ad/Ad";

moment.tz.setDefault("America/Denver");

const getPostList = (postEdges) => {
  const postList = [];

  postEdges.forEach((postEdge) => {
    if (
      postList[
        moment(postEdge.node.data.StartDate).format(siteConfig.dateFormat)
      ]
    ) {
      postList[
        moment(postEdge.node.data.StartDate).format(siteConfig.dateFormat)
      ].push(postEdge);
    } else {
      postList[
        moment(postEdge.node.data.StartDate).format(siteConfig.dateFormat)
      ] = [postEdge];
    }
  });

  return postList;
};

const ForecastGrid = ({ showButton, postEdges, daysToShow, city }) => {
  const postList = getPostList(postEdges);
  const today = moment(new Date());

  let dayArray = [
    {
      date: today.format(siteConfig.dateFormat),
      shortDate: today.format("MM/DD"),
      dateSlug: today.format("MM-DD"),
      shortDay: "Today",
      longDay: "Today",
    },
  ];

  let tomorrow = today.add(1, "days");

  dayArray.push({
    date: tomorrow.format(siteConfig.dateFormat),
    shortDate: tomorrow.format("MM/DD"),
    dateSlug: tomorrow.format("MM-DD"),
    shortDay: "Tomorrow",
    longDay: "Tomorrow",
  });

  for (let i = 0; i < daysToShow - 1; i++) {
    let newDay = today.add(1, "days");
    dayArray.push({
      date: newDay.format(siteConfig.dateFormat),
      shortDate: newDay.format("MM/DD"),
      dateSlug: newDay.format("MM-DD"),
      shortDay: newDay.format("ddd"),
      longDay: newDay.format("dddd"),
    });
  }

  return (
    <section className="forecast__grid">
      <div className="forecast__header">
        <span className="forecast__title">
          {city ? city + "'s" : "Colorado's"} {daysToShow} Day Live Music
          Forecast:
        </span>
      </div>
      {dayArray.map((day, i) => (
        <React.Fragment key={i}>
          <ForecastDay day={day} postList={postList} />
          {i == 5 ? <NewsletterSignup /> : null}
        </React.Fragment>
      ))}
      {showButton ? (
        <Link to="/calendar" className="calendar-link">
          <span className="calendar-link__content">
            <FontAwesomeIcon icon="calendar" />
            See The Whole Calendar &raquo;
          </span>
        </Link>
      ) : null}
    </section>
  );
};

export default ForecastGrid;

const ForecastDay = ({ day, postList }) => {
  const [dayOpen, setDayOpen] = useState(
    day.shortDay == "Today" || day.shortDay == "Tomorrow"
  );

  return (
    <div
    key={day.shortDay}
      className={
        "forecast__day" +
        ` forecast__day--${day.shortDay}` +
        (dayOpen ? " forecast__day--open" : "")
      }
    >
      <div
        className="forecast__meta"
        onClick={() => {
          setDayOpen(!dayOpen);
        }}
      >
        <h2>{day.longDay}</h2>
        <Link to={"/" + day.dateSlug}>
          <h3>{day.shortDate}</h3>
        </Link>
        <FontAwesomeIcon
          className="forecast__caret"
          icon={dayOpen ? "caret-down" : "caret-up"}
        />
      </div>
      <div className="forecast__scroller">
        {postList[day.date] ? (
          postList[day.date].map((singleday, i) => {
            if (i > 4) {
              return;
            }
            return (
              <React.Fragment key={i}>
                <EventCard event={singleday.node} />
                {i == 2 && <Ad type={"feed"}/>}
              </React.Fragment>
            );
          })
        ) : (
          <h4 className="empty-day">
            😢
            <br /> Nothing {day.longDay}
          </h4>
        )}

        {postList[day.date]?.length > 4 ? (
          <Link className="see-more-link" to={`/${day.dateSlug}`}>
            + {postList[day.date].length - 4} More
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
