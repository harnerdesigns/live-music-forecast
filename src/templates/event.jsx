import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostTags from "../components/PostTags/PostTags";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import moment from "moment";
import "./b16-tomorrow-dark.css";
import "./post.css";

import styled from "styled-components";
import EventCard from "../components/EventCard/EventCard";
import ArtistsGrid from "../components/ArtistsGrid/ArtistsGrid";

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
          <Helmet />

          <SEO postPath={slug} postNode={postNode} postSEO />
          <EventHeaderWrapper>
            <EventCard
              featured={false}
              event={postNode}
              showDate
              showTicket
              showLink={false}
            />
            <div
              className="event__bg-image"
              style={{
                backgroundImage: "url(" + imageUrl + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                position: "absolute",
              }}
            ></div>
            <div className="post-meta">
              <PostTags tags={post.tags} />
            </div>
          </EventHeaderWrapper>
          <EventBody
            dangerouslySetInnerHTML={{ __html: post.Description }}
          ></EventBody>

          {post.Artists && <ArtistsGrid artists={post.Artists} />}
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query EventBySlug($slug: String!) {
    airtable(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      data {
        Name
        Subtitle
        StartDate
        EndDate
        DoorsTime
        TicketURL
        Price
        PriceRange
        SoldOut
        Description
        Image {
          url
        }
        Tags
        Artist_Genres
        Artists{
          fields{
            slug
          }
          data{
            Name
            Image{
              url
            }
          }
        }
        Venues {
          fields{
            slug
          }
          data {
            Name
            City
          }
        }
      }
    }
  }
`;

const EventHeaderWrapper = styled.section`
  display: flex;
  position: relative;
  min-height: 50vh;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .event__bg-image {
    z-index: -1;
    filter: blur(5px);
    width: 103%;
    height: 105%;
    transition: 3000ms;
  }

  &:hover {
    .event__bg-image {
      width: 105%;
      height: 107%;
    }
  }

  .event__card {
    width: 50%;
    height: auto;
    grid-template-columns: 1fr 2fr;
    margin: 3rem auto;

    .event__name {
      text-align: center;
      font-size: 4rem;
      margin: 1rem auto;
    }
    .event__subtitle {
      text-align: center;
      margin: 0 auto 1rem;
      font-size: 2.5rem;
    }
    .event__venue-name {
      text-align: center;
      font-size: 2rem;
      margin: 0 auto 0.5rem;
    }

    .event__image-wrapper {
      img {
        object-fit: contain;
      }
    }

    .event__time-wrapper {
      text-align: center;
      font-size: 1.5rem;
    }
    .event__meta-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 1rem;
      .event__tag {
        width: 30%;
      }
    }

    .event__ticket-button {
      grid-column: 1 / -1;
    }
  }
`;

const EventBody = styled.div`
  width: 50%;
  padding: 2rem;
  margin: 2rem auto;
`;
