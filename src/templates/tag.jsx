import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";

export default class TagTemplate extends React.Component {
  render() {
    const { tag } = this.props.pageContext;
    const postEdges = this.props.data.allAirtable.edges;
    return (
      <Layout>
        <div className="tag-container">
          <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} />
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String, $dateFormat: String, $today: Date!) {
    allAirtable(
      limit: 1000
      sort: { fields: [data___StartDate], order: DESC }
      filter: { data : { Tags: { eq: $tag }, Status: {eq: "Published"} } }
    ) {
      totalCount
      edges {
        node {
          data {
            Name
            Slug
            Genre
            StartDate(formatString: $dateFormat)
            EndDate(formatString: $dateFormat)
          }
        }
      }
    }
  }
`;
