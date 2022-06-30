import React, { Component, useRef, useState } from "react";
import BlueBorder from "../../../images/blue-border.svg";
import { Link } from "gatsby";
import PageTitle from "../PageTitle/PageTitle";
import _ from "lodash";
import SectionTitle from "../SectionTitle/SectionTitle";
import { FontAwesomeIcon } from "../../../../node_modules/@fortawesome/react-fontawesome/index";

const BrowseGrid = ({ events }) => {
  const inputRef = useRef(null);

  let [search, setSearch] = useState();
  let [searchOpen, setSearchOpen] = useState(false);

  let cities = events.map((event) => {
    return event.node.data.Venue_City;
  });

  cities = cities.flat();

  let countObj = {};

  let countFunc = (keys) => {
    countObj[keys] = ++countObj[keys] || 1;
  };

  cities = cities.forEach(countFunc);

  cities = Object.keys(countObj).sort(function (a, b) {
    return countObj[b] - countObj[a];
  });

  const cityMap = cities.map((city) => {
    if (city != null && city != "null") {
      return (
        <Link
        key={_.kebabCase(city)}
          className={"city-grid__item city-grid__item--" + _.kebabCase(city)}
          to={"/browse/" + _.kebabCase(city)}
        >
          <label>{city}</label>
        </Link>
      );
    }
  });

  let genres = events.map((event) => {
    return event.node.data.Artist_Genres;
  });

  genres = genres.flat();

  let genreObj = {};

  let countGenreFunc = (keys) => {
    genreObj[keys] = ++genreObj[keys] || 1;
  };

  genres = genres.forEach(countGenreFunc);

  genres = Object.keys(genreObj).sort(function (a, b) {
    return genreObj[b] - genreObj[a];
  });

  const genreMap = genres.map((genre) => {
    if (search == null || genre.toLowerCase().includes(search.toLowerCase())) {
      if (genre != "null" && genre != null) {
        return (
          <Link
          key={_.kebabCase(genre)}
            className={
              "genre-grid__item genre-grid__item--" + _.kebabCase(genre)
            }
            to={"/browse/genres/" + _.kebabCase(genre)}
          >
            <label>{genre}</label>
          </Link>
        );
      }
    }
  });

  return (
    <>
      <div className="browse-grid">
        <div className="city-grid__wrapper" id="city-grid">
          <SectionTitle title="Pick Your City:" />
          {cityMap}
        </div>

        <Link to="/submit">Don't See Your City? Submit an Event!</Link>
      </div>
      <img className="blue-border" src={BlueBorder} />
      <div className="filter-input__wrapper">
        <FontAwesomeIcon
          onClick={() => {
            if (!searchOpen) {
              inputRef.current?.focus();
            }
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
          placeholder="Filter Genres By Name"
        />
      </div>
      <div className="browse-grid">
        <div className="genre-grid__wrapper" id="genre-grid">
          <SectionTitle title="Browse by Genre:" />
          {genreMap}
        </div>
        <img className="blue-border" src={BlueBorder} />
      </div>
    </>
  );
};

export default BrowseGrid;
