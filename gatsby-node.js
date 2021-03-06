const fs = require("fs")
const path = require("path");
const _ = require("lodash");
const moment = require("moment-timezone");
const siteConfig = require("./data/SiteConfig");
const util = require('util')

moment.tz.setDefault('America/Denver');
const graphqlPostLimit = 2000;

const createEventSlug = (event) => {
  let slug = "";

  let city = event.data.Venue_City || null;
  let name = event.data.Name;
  slug += "/";
  slug += "event";
  slug += "/";
  slug += _.kebabCase(name.replace(/([0-9]*\/[0-9]*)/g, ""));
  slug += "-";
  slug += moment(event.data.StartDate).format("MM-DD-YYYY");

  return slug;
};

const createGenreSlug = (genre) => {
  let slug = "";

  let name = genre.data.Name;
  slug += "/browse/genres/";
  slug += _.kebabCase(name);

  return slug;
};

const createVenueSlug = (venue) => {
  let slug = "";

  let name = venue.data.Name;
  slug += "/venues/";
  slug += _.kebabCase(name);

  return slug;
};

const createArtistSlug = (artist) => {
  let slug = "";

  let name = artist.data.Name;
  slug += "/artist/";
  slug += _.kebabCase(name);

  return slug;
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;

  if (node.internal.type === "Airtable" && node.queryName === "events") {
    createNodeField({ node, name: "slug", value: createEventSlug(node) });
  }
  if (node.internal.type === "Airtable" && node.queryName === "genres") {
    createNodeField({ node, name: "slug", value: createGenreSlug(node) });
  }
  if (node.internal.type === "Airtable" && node.queryName === "venues") {
    createNodeField({ node, name: "slug", value: createVenueSlug(node) });
  }

  if (node.internal.type === "Airtable" && node.queryName === "artists") {
    createNodeField({ node, name: "slug", value: createArtistSlug(node) });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const eventPage = path.resolve("src/templates/event.jsx");
  const tagPage = path.resolve("src/templates/tag.jsx");
  const genrePage = path.resolve("src/templates/genre.jsx");
  const artistPage = path.resolve("src/templates/artist.jsx");
  const cityPage = path.resolve("src/templates/city.jsx");
  const dayPage = path.resolve("src/templates/day.jsx");
  const venuePage = path.resolve("src/templates/venue.jsx");

  const markdownQueryResult = await graphql(
    `
      query {
        allAirtable(
          limit: ${graphqlPostLimit}
          filter: {
            table: { eq: "Events" }
            data: { Status: { eq: "Published" } }
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
              data {
                Name
                Description
                StartDate
                EndDate
                Venues {
                  data {
                    Name
                    City
                  }
                }
                Venue_City
                Artist_Genres
              }
            }
          }
        }
      }
    `,
    { dateFormat: siteConfig.dateFormat }
  );

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();
  const citySet = new Set();

  const postsEdges = markdownQueryResult.data.allAirtable.edges;

  postsEdges.sort((postA, postB) => {
    const dateA = moment(postA.node.data.StartDate);

    const dateB = moment(postB.node.data.StartDate);

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  postsEdges.forEach((edge, index) => {
    if (edge.node.data.Tags) {
      edge.node.data.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    if (edge.node.data.Venues) {
      citySet.add(edge.node.data.Venues[0].data.City);
    }

    const nextID = index + 1 < postsEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1;
    const nextEdge = postsEdges[nextID];
    const prevEdge = postsEdges[prevID];

    const postSlug = createEventSlug(edge.node);

    createPage({
      path: postSlug,
      component: eventPage,
      context: {
        dateFormat: siteConfig.dateFormat,
        today: new Date(),
        slug: postSlug,
        nexttitle: nextEdge.node.data.Name,
        nextslug: _.kebabCase(nextEdge.node.data.Name),
        prevtitle: prevEdge.node.data.Name,
        prevslug: _.kebabCase(prevEdge.node.data.Name),
      },
    });
  });

  const venuesQuery = await graphql(
    `
      query {
        allAirtable(
          limit: ${graphqlPostLimit}
          filter: {
            table: { eq: "Venues" }
            data: { Status: { eq: "Published" } }
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
              data {
                Name
                Description
                City
                Events {
                  data {
                    Name
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  if (venuesQuery.errors) {
    console.error(venuesQuery.errors);
    throw venuesQuery.errors;
  }

  const venueEdges = venuesQuery.data.allAirtable.edges;

  venueEdges.forEach((venue, index) => {
    if (venue.node.data.City) {
      citySet.add(venue.node.data.City);
    }

    const venueSlug = createVenueSlug(venue.node);

    createPage({
      path: venueSlug,
      component: venuePage,
      context: {
        venue: venue.node.data.Name,
        today: new Date().toISOString(),
        slug: venueSlug,
      },
    });
  });

  const artistsQuery = await graphql(
    `
      query {
        allAirtable(limit: ${graphqlPostLimit}, filter: { table: { eq: "Artists" } }) {
          edges {
            node {
              fields {
                slug
              }
              data {
                Name
                Description
                City
                Events {
                  data {
                    Name
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  if (artistsQuery.errors) {
    console.error(artistsQuery.errors);
    throw artistsQuery.errors;
  }

  const artistsEdges = artistsQuery.data.allAirtable.edges;

  let artistLetters = [];

  artistsEdges.forEach((artist, index) => {
    if (artist.node.data.City) {
      citySet.add(artist.node.data.City);
    }

    const artistSlug = createArtistSlug(artist.node);

    artistLetters.push(artist.node.data.Name.slice(0, 1).toUpperCase());

    createPage({
      path: artistSlug,
      component: artistPage,
      context: {
        artist: artist.node.data.Name,
        today: new Date().toISOString(),
        slug: artistSlug,
      },
    });
  });

  artistLetters = _.uniq(artistLetters);
  artistLetters = _.sortBy(artistLetters);
  artistLetters = artistLetters.filter((char) => /[A-Z]/.test(char));
  artistLetters.push("#");

  // console.log({ artistLetters });

  const numPages = artistLetters.length;

  createPage({
    path: `/artists`,
    component: path.resolve("./src/templates/artists.jsx"),
    context: {
      numPages,
      currentPage: 1,
      prevLetter: null,
      currentLetter: null,
      nextLetter: artistLetters[0],
      currentLetterFilter: `/^./gi`,
      letters: artistLetters,
    },
  });

  // createPage({
  //   path: `/artists/search`,
  //   component: path.resolve("./src/templates/artists-search.jsx"),
  //   context: {
  //     letters: artistLetters,
  //   },
  // });

  artistLetters.forEach((letter, i) => {
    createPage({
      path: letter !== "#" ? `/artists/${letter}` : `/artists/other`,
      component: path.resolve("./src/templates/artists.jsx"),
      context: {
        numPages,
        currentPage: i + 1,
        prevLetter: i === 0 ? null : artistLetters[i - 1],
        currentLetter: letter !== "#" ? letter : "Other",
        nextLetter: letter !== "#" ? artistLetters[i + 1] : null,
        currentLetterFilter: letter !== "#" ? `/^${letter}/gi` : "/^[^A-Z]/gi",
        letters: artistLetters,
      },
    });
  });

  tagSet.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagPage,
      context: {
        tag,
        today: new Date(),
        dateFormat: siteConfig.dateFormat,
      },
    });
  });
  

  citySet.forEach((city) => {
    if(city !== null && city !== "null"){
    createPage({
      path: `/browse/${_.kebabCase(city)}/`,
      component: cityPage,
      context: {
        city: city,
        today: new Date(),
        dateFormat: siteConfig.dateFormat,
      },
    });}
  });




  // Genre Pages 

  const genreQuery = await graphql(
    `
    query {
      allAirtable(limit: ${graphqlPostLimit}, filter:  { table: { eq: "Genres" } }, sort:{fields:[data___Number_Of_Artists],order: [DESC]}) {
        edges {
          node {
            fields {
              slug
            }
            data {
              Name
              Number_Of_Artists
              Number_Of_Events
              Events {
                data {
                  Name
                }
              }
            }
          }
        }
      }
    }
    `
  );

  if (genreQuery.errors) {
    console.error(genreQuery.errors);
    throw genreQuery.errors;
  }

  const genreEdges = genreQuery.data.allAirtable.edges;

  genreEdges.forEach((genre, index) => {

    const genreSlug = createGenreSlug(genre.node);



    createPage({
      path: genreSlug,
      component: genrePage,
      context: {
        genre: genre.node.data.Name,
        genreRegex: `/${genre.node.data.Name}/gi`,
        today: new Date().toISOString(),
        slug: genreSlug,
      },
    });
  });


  // Creating the "Day" Pages

  const today = moment()

  let todayPageSlug = today.format('MM-DD')

  createPage({
    path: "today",
    component: dayPage,
    context: {
      day: today.format('MM-DD-YYYY'),
      today: new Date().toISOString(),
      slug: todayPageSlug,
      todayPage: true
    },
  });
  let tomorrow = today.add(1, "day");
  let tomorrowPageSlug = tomorrow.format('MM-DD')

  createPage({
    path: "tomorrow",
    component: dayPage,
    context: {
      day: tomorrow.format('MM-DD-YYYY'),
      today: new Date().toISOString(),
      slug: tomorrowPageSlug,
    },
  });

  for (let i = 0; i < 90; i++) {
    const pagesToday = moment()

    let newDate = pagesToday.add(i, 'day')
    let daySlug = newDate.format('MM-DD')
    createPage({
      path: daySlug,
      component: dayPage,
      context: {
        day: newDate.format('MM-DD-YYYY'),
        today: new Date().toISOString(),
        slug: daySlug,
      },
    });
  }



};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  deletePage(page);
  // You can access the variable "house" in your page queries now
  createPage({
    ...page,
    context: {
      ...page.context,
      today: new Date(),
      dateFormat: siteConfig.dateFormat,
    },
  });
};





exports.onPostBuild = async ({ graphql }) => {
  // Run the GraphQL query (from example above).
  await graphql(`
  fragment eventFragment on Airtable {
    fields {
      slug
    }
    data {
      StartDate
      EndDate
      DoorsTime
      Name
      Subtitle
      Description
      Tags
      Featured
      TicketURL
      SoldOut
      Image {
        url
      }
      Artist_Genres
      Venues {
        fields {
          slug
        }
        data {
          Name
          City
        }
      }
    }
  }
  
  query CalendarIndexQuery {
    allAirtable(
      limit: 2000
      sort: {fields: data___StartDate, order: ASC}
      filter: {table: { eq: "Events" }, data: {Status: {eq: "Published"}}}
    ) {
      edges {
        node {
          ...eventFragment
        }
      }
    }
  }
  `).then(result => {
    // A reference to where we are going to put the files. Note that the public
    // directory already exists because the build has been completed (since
    // we're in the onPostBuild hook).
    const postsPath = "./public/events"
    let dateArray = {}

    // Collect the data for all earworms. This simply digs into the query result
    // and extracts the objects we care about.
    const posts = result.data.allAirtable.edges.map(({ node }) => {

      let date = moment(node.data.StartDate).tz('America/Denver');
      let year = date.format('YYYY');
      let month = date.format("MM");
      let day = date.format("DD");
      
      _.set(dateArray, `${year}.${month}.${day}[${node.fields.slug}]`, node)
    })


    // If we don't already have the posts directory inside the public directory,
    // create it.
    if (!fs.existsSync(postsPath)) fs.mkdirSync(postsPath)


      // We

      // Using the slug as the filename, write a file containing the data
      // object, after converting it to JSON format.
      fs.writeFileSync(`${postsPath}/calendar.json`, JSON.stringify(dateArray))
  })
}