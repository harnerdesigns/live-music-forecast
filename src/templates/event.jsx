import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Disqus from "../components/Disqus/Disqus";
import PostTags from "../components/PostTags/PostTags";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import "./b16-tomorrow-dark.css";
import "./post.css";

export default class PostTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const { slug } = pageContext;
    const postNode = data.airtable;
    const post = postNode.data;
    var imageUrl = post.Image ? post.Image[0].url : "";
    if (!post.id) {
      post.id = slug;
    }
    if (!post.category) {
      post.category = config.postDefaultCategoryID;
    }
    return (
      <Layout>
        <div>
          <Helmet>
            <title>{`${post.Name} | ${config.siteTitle}`}</title>
          </Helmet>
          <SEO postPath={slug} postNode={postNode} postSEO />
          <div>
            <h1 className="title">{post.Name}</h1>
            <div className="date">📅 {post.Date}</div>
            <div 
            style={{
              backgroundImage: 'url(' + imageUrl + ')',
              backgroundSize: '100%',
              backgroundPosition: 'center',
              width:'100%', 
              height:'15rem' 
              }}>
            </div>
            <div className="post-meta">
              <PostTags tags={post.tags} />
              <SocialLinks postPath={slug} postNode={postNode} />
            </div>
            {/* <Disqus postNode={postNode} />  */}
          </div>
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $dateFormat: String) {
    airtable(fields: {slug: {eq: $slug}}) {
      data {
        Name
        Slug
        Genre
        StartDate(formatString: $dateFormat)
        EndDate(formatString: $dateFormat)
        Image{
          url
        }
      
      }
    }
  }
`;
