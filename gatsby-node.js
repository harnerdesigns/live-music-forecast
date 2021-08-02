const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

const createEventSlug = (event)=>{
  let slug = "";

  let city = event.data.Venue_City[0] || null
  let name = event.data.Name
  slug += _.kebabCase(city);
  slug += '/';
  slug += _.kebabCase(name);

  return slug

}

const createGenreSlug = (genre)=>{
  let slug = "";

  let name = genre.data.Name;
  slug += 'genres/';
  slug += _.kebabCase(name);

  return slug

}

const createVenueSlug = (venue)=>{
  let slug = "";

  let name = venue.data.Name;
  slug += 'venues/';
  slug += _.kebabCase(name);

  return slug

}

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
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const eventPage = path.resolve("src/templates/event.jsx");
  const tagPage = path.resolve("src/templates/tag.jsx");
  const categoryPage = path.resolve("src/templates/category.jsx");
  const cityPage = path.resolve("src/templates/city.jsx");

  const markdownQueryResult = await graphql(
    `
      query{
        allAirtable(
          filter: { table: { eq: "Events" }, data : { Status: {eq: "Published"} } }
        ) {
          edges {
            node {
              fields{
                slug
              }
              data {
                Name
                Description
                StartDate
                EndDate
                Genre
                Venue_City
              }
            }
          }
        }
      }
    `, { dateFormat: siteConfig.dateFormat}
  );

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();
  const categorySet = new Set();
  const citySet = new Set();

  const postsEdges = markdownQueryResult.data.allAirtable.edges;
  console.log({postsEdges});

  postsEdges.sort((postA, postB) => {
    const dateA = moment(
      postA.node.data.StartDate    );

    const dateB = moment(
      postB.node.data.StartDate
    );

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  postsEdges.forEach((edge, index) => {
    if (edge.node.data.Tags) {
      edge.node.data.tags.forEach(tag => {
        tagSet.add(tag);
      });
    }

    if (edge.node.data.Genre) {
      categorySet.add(edge.node.data.Genre);
    }

    if (edge.node.data.Venue_City){
      citySet.add(edge.node.data.Venue_City);
    }

    const nextID = index + 1 < postsEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1;
    const nextEdge = postsEdges[nextID];
    const prevEdge = postsEdges[prevID];

    const postSlug = createEventSlug(edge.node)
    console.log(postSlug);

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
        prevslug: _.kebabCase(prevEdge.node.data.Name)
      }
    });
  });

  tagSet.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagPage,
      context: {
        tag,
        today: new Date(),
        dateFormat: siteConfig.dateFormat
      }
    });
  });
  categorySet.forEach(category => {
    createPage({
      path: `/categories/${_.kebabCase(category)}/`,
      component: categoryPage,
      context: {
        category,
        today: new Date(),
        dateFormat: siteConfig.dateFormat
      }
    });
  });
  citySet.forEach(city => {
    createPage({
      path: `/browse/${_.kebabCase(city)}/`,
      component: cityPage,
      context: {
        city: city,
        today: new Date(),
        dateFormat: siteConfig.dateFormat
      }
    });
  });
};


exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  // You can access the variable "house" in your page queries now
  console.log(new Date())
  createPage({
    ...page,
    context: {
      ...page.context,
      today: new Date(),
      dateFormat: siteConfig.dateFormat
    },
  })
}
