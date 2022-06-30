import React, { Component } from "react";
import Helmet from "react-helmet";
import urljoin from "url-join";
import config from "../../../data/SiteConfig";
import defaultOG from "../../images/Default-OG-Image.png";

class SEO extends Component {
  componentDidMount() {
    const { postNode, postPath, postSEO, customSEO } = this.props;
  }
  render() {
    const { postNode, postPath, postSEO, customSEO } = this.props;
    let title;
    let Name;
    let description;
    let image;
    let postURL;
    let author;
    let postMeta;
    let ogImage;

    if (postSEO) {
      postMeta = postNode.data;
      ({ Name } = postMeta);
      title =
        Name +
        (postMeta?.Venues[0] ? " @ " + postMeta.Venues[0].data.Name : "") +
        (postMeta?.Venues[0]
          ? ", " + postMeta.Venues[0].data.City + ", CO"
          : "") +
        ` | ${config.siteTitle}`;
      image = postMeta.Image ? postMeta.Image[0].url : defaultOG;
      ogImage = image ? image : defaultOG;
      postURL = urljoin(config.siteUrl, config.pathPrefix, postPath);
      description =
        "Check out and get tickets to " +
        Name +
        (postMeta?.Venues[0] ? " @ " + postMeta.Venues[0].data.Name : "") +
        (postMeta?.Venues[0]
          ? ", " + postMeta.Venues[0].data.City + ", CO"
          : "");
    } else if (customSEO) {
      title = customSEO.title || null;
      Name = customSEO.Name || null;
      description = customSEO.description || null;
      image = customSEO.image || config.siteLogo;
      postURL = customSEO.postURL || window.location.href;
      author = customSEO.author || null;
      postMeta = customSEO.postMeta || null;
      ogImage = customSEO.ogImage || defaultOG;
      image = customSEO.image || defaultOG;
    } else {
      title = config.siteTitle;
      description = config.siteDescription;
      ogImage = defaultOG;
      image = config.siteLogo;
    }

    if (image && image.indexOf("http") == -1)
      image = urljoin(config.siteUrl, config.pathPrefix, image);
    const blogURL = urljoin(config.siteUrl, config.pathPrefix);
    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        url: blogURL,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
      },
    ];
    if (postSEO) {
      schemaOrgJSONLD.push(
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@id": postURL,
                name: title,
                image,
              },
            },
          ],
        },
        {
          "@context": "http://schema.org",
          "@type": "BlogPosting",
          url: blogURL,
          name: title,
          alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
          headline: title,
          image: {
            "@type": "ImageObject",
            url: image,
          },
          description,
        }
      );
    }
    return (
      <Helmet>
        {/* General tags */}
        <title>
          {Name +
            (postMeta?.Venues[0] ? " @ " + postMeta.Venues[0].data.Name : "") +
            (postMeta?.Venues[0]
              ? ", " + postMeta.Venues[0].data.City + ", CO"
              : "") +
            ` | ${config.siteTitle}`}
        </title>
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:url" content={postSEO ? postURL : (customSEO ? postURL : blogURL)} />
        {postSEO ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta
          property="fb:app_id"
          content={config.siteFBAppID ? config.siteFBAppID : ""}
        />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={author && author.twitter ? author.twitter : "COLiveMusic"}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
    );
  }
}

export default SEO;
