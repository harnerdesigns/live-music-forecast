import React, { Component } from "react";
import "./Browse.scss";
import BlueBorder from "../../../images/blue-border.svg";
import { Link } from "gatsby";
import PageTitle from "../PageTitle/PageTitle";
import _ from "lodash";

class BrowseGrid extends Component {
  render() {
    const events = this.props.events;

    let cities = events.map((event)=> {
      console.log({event})
      return event.node.data.Venue_City
    })
    console.log({cities});

    cities = _.uniq(cities.flat());

    const cityMap = cities.map((city)=>{
      return(<Link
            className={"city-grid__item city-grid__item--"+ _.kebabCase(city)}
            to={"/browse/" +  _.kebabCase(city)}
          >
            <label>{city}</label>
          </Link>)

    })
    return (
      <div className="browse-grid">
        <PageTitle title="Browse Shows By City, Genre, or Date" subtitle="Find Great Live Music All Over The State" />
        <img className="blue-border" src={BlueBorder} />
        <div className="city-grid__wrapper">
          {cityMap}
        </div>
        <Link to="/submit">Don't See Your City? Submit an Event!</Link>
        <img className="blue-border" src={BlueBorder} />

      </div>
    );
  }
}

export default BrowseGrid;
