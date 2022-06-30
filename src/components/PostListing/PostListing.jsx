import React from "react";
import { Link } from "gatsby";
import moment from 'moment';
import siteConfig from "../../../data/SiteConfig";


class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.data.Slug,
        tags: postEdge.node.data.Tags,
        category: postEdge.node.data.Category,
        name: postEdge.node.data.Name,
        startDate: siteConfig.dateFormat ? moment(postEdge.node.data.StartDate).format(siteConfig.dateFormat) : postEdge.node.data.StartDate,        
        endDate: siteConfig.dateFormat ? moment(postEdge.node.data.endDate).format(siteConfig.dateFormat) : postEdge.node.data.endDate,
      });
    });
    return postList;
  }
  render() {
    const postList = this.getPostList();
    return (
      <div>
        {/* Your post list here. */
        postList.map(post => (
          <div key={post.name} className="post-box">
            <Link to={post.path} key={post.name}>
              <h1>{post.name}</h1>
            </Link>            
          </div>
        ))}
      </div>
    );
  }
}

export default PostListing;
