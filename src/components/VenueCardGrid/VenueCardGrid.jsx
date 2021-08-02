import React from "react";
import { Link } from "gatsby";
import "./VenueCardGrid.scss";

import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VenueCard from "../VenueCard/VenueCard";

const VenueGrid = ({ venues }) => {
  let venueMap = venues.map((edge) => {
    return <VenueCard node={edge.node} />;
  });
  return <section className={"venue__grid"}>{venueMap}</section>;
};

export default VenueGrid;
