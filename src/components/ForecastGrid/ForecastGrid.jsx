import React from "react";
import { Link } from "gatsby";
import "./ForecastGrid.scss";
import moment from 'moment';
import siteConfig from "../../../data/SiteConfig";
import EventCard from "../EventCard/EventCard";


class ForecastGrid extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {


      let args = {
        path: postEdge.node.fields.slug,
        tags: postEdge.node.data.Tags,
        category: postEdge.node.data.Category,
        name: postEdge.node.data.Name,
        startDate: siteConfig.dateFormat ? moment(postEdge.node.data.StartDate).format(siteConfig.dateFormat) : postEdge.node.data.StartDate,        
        endDate: siteConfig.dateFormat ? moment(postEdge.node.data.EndDate).format(siteConfig.dateFormat) : postEdge.node.data.EndDate,
        featured: postEdge.node.data.Featured,
        images: postEdge.node.data.Image,
        genres: postEdge.node.data.Name__from_Genre_
      }
      if (postList[args.startDate]) {

        postList[args.startDate].push(args);
      } else {
        postList[args.startDate] = [args]
      }
    });
    console.log({postList});

    return postList;
  }
  render() {
    const postList = this.getPostList();
    console.log({postList});
    const today = moment(new Date());
    let dayArray = [{ date: today.format(siteConfig.dateFormat), shortDay: "Today", longDay: "Today" }]

    for (let i = 0; i < 13; i++) {
      let newDay = today.add(1, 'days')
      dayArray.push({ date: newDay.format(siteConfig.dateFormat), shortDay: newDay.format('ddd'), longDay: newDay.format('dddd') });
    }


    console.log(dayArray);
    return (
      <section className="forecast__grid">

        {dayArray.map(day => (
          <div className={"forecast__day" + ` forecast__day--${day.shortDay}`}>
            <div className="forecast__meta">
              <h1>{day.shortDay}</h1>
              <h2>{day.date}</h2>
            </div>
            <div className="forecast__scroller">

              {/* Your post list here. */
                postList[day.date] ? postList[day.date].map(day => (

                  <EventCard event={day} />
                )) : (<h2 className="empty-day">😢<br /> Nothing {day.longDay}</h2>)}
            </div>
          </div>
        ))}
      </section>
    );
  }
}

export default ForecastGrid;
