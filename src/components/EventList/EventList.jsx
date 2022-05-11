import React from "react";
import { Link } from "gatsby";
import "./EventList.scss";
import _ from "lodash";
import EventCard from "../EventCard/EventCard";
import Ad from "../Ad/Ad";

const EventList = ({ eventNodes }) => {
  let eventMap =
    eventNodes.length >= 1 ? (
      eventNodes.map((eventNode, i) => {
        return (
          <React.Fragment key={i}>
            <EventCard event={eventNode.node} showDate featured={i == 0} />
            {i == 0 && eventNodes.length > 1 && <Ad style={{gridColumn: '1 / span 2'}} />}
          </React.Fragment>
        );
      })
    ) : (
      <h2 className="no-upcoming-shows">
        😢
        <br />
        No Upcoming Shows
      </h2>
    );

  return <section className={"event__list"}>{eventMap}</section>;
};

export default EventList;
