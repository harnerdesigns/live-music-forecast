// import React, { createRef } from "react";
// import Helmet from "react-helmet";
// import { graphql, navigate } from "gatsby";
// import Layout from "../layout";

// import SEO from "../components/SEO/SEO";
// import config from "../../data/SiteConfig";

// import moment from "moment-timezone";
// import { nl } from "date-fns/locale";
// import _ from "lodash";
// const Calendar = typeof window !== `undefined` ? require("react-awesome-calendar") : null;
// class CalendarPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.calendar = React.createRef();
//   }

//   componentDidMount() {
//     const details = this.calendar.current.getDetails();
//     console.log(details);
//     /* result
//       {
//           mode: 'monthlyMode',
//           year: 2019,
//           month: 0,
//           day: 1
//       }
//   */
//     // call endpoint to retrieve events
//   }

//   render() {
//     const postEdges = this.props.data.allAirtable.edges;
//     console.log({ context: this.props.pageContext });

//     let events = [];
//     postEdges.forEach((edge, i) => {
//       let { node } = edge;
//       // console.log({ nodeData: node.data });

//       let startDate = moment(node.data.StartDate);
//       let endDate = node.data.EndDate
//         ? moment(node.data.EndDate)
//         : moment(node.data.StartDate)
//             .add(2, "hours");

//       events.push({
//         id: node.fields.slug,
//         title: `${node.data.Name} ${node.data.Venues ? "@ " + node.data.Venues[0].data.Name : ""} - ${startDate.format('h:mm a')}`,
//         from: startDate.subtract(6, 'hours').format(),
//         to: endDate.subtract(6, 'hours').format(),
//         color: `hsl(${(i/360)*(360*15)}deg, 50%, 50%)`,
//       });
//     });
//     console.log({ events });

//     events = _.uniqBy(events, (event)=>{return event.id});

//     return (
//       <Layout>
//         <div className="index-container">
//           <SEO />
//           <Helmet title={config.siteTitle} />
//           <Calendar
//             ref={this.calendar}
//             events={events}
//             header={CalendarHeader}
//             onClickEvent={(event) => {
//               navigate(event);
//             }}
//           />
//         </div>
//       </Layout>
//     );
//   }
// }

// export default CalendarPage;

// /* eslint no-undef: "off" */
// export const pageQuery = graphql`
//   query CalendarQuery {
//     allAirtable(
//       limit: 500
//       sort: { fields: [data___StartDate, data___Featured], order: [ASC, DESC] }
//       filter: { data: { Status: { eq: "Published" } } }
//     ) {
//       edges {
//         node {
//           fields {
//             slug
//           }
//           data {
//             StartDate
//             EndDate
//             DoorsTime
//             Name
//             Subtitle
//             Description
//             Tags
//             Featured
//             TicketURL
//             SoldOut
//             Image {
//               url
//             }
//             Artist_Genres
//             Venues {
//               fields {
//                 slug
//               }
//               data {
//                 Name
//                 City
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;


// const CalendarHeader = ({current, prev, next, onClickPrev, onClickNext}) => {
// return(<header class="calendar__header"><h1>
//   {moment(current.month, 'M').format("MMMM")}
//   {current.day && moment(current.day, 'DD').format("DD")}
//   </h1>
//   </header>)
// }