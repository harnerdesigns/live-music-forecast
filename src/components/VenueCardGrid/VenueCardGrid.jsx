import React, { useState, useRef } from "react";
import { Link } from "gatsby";
import "./VenueCardGrid.scss";

import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VenueCard from "../VenueCard/VenueCard";

const VenueGrid = ({ venues }) => {
  const inputRef = useRef( null);

  let [search, setSearch] = useState();
  let [searchOpen, setSearchOpen] = useState(false);
  let venueMap = venues.map((edge) => {
    if (
      search == null ||
      edge.node.data.Name.toLowerCase().includes(search.toLowerCase())
    ) {
      return <VenueCard node={edge.node} />;
    }
  });
  return (<>
  <div className="filter-input__wrapper">
        <FontAwesomeIcon
          onClick={() => {
            if(!searchOpen){inputRef.current?.focus()};
            setSearchOpen(!searchOpen);
          }}
          icon="search"
        />
        <input
          ref={inputRef}
          className={"filter-input" + (searchOpen ? " is-open" : "")}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Filter Venues By Name"
        />
      </div>
    <section className={"venue__grid"}>
      {venueMap}
    </section>
  </>
  );
};

export default VenueGrid;
