import React from "react";
import { Link } from "gatsby";
import _ from "lodash";
import { FontAwesomeIcon } from "../../../node_modules/@fortawesome/react-fontawesome/index";

const MetaList = ({ metaArray = [] }) => {
  let metaMap = metaArray.map((metaItem, i) => {
    if (!metaItem) return false;
    return (
      <li key={i} className="meta-list__item">
        {metaItem["link"] ? (
          <a href={metaItem["link"]} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={metaItem["icon"]} />
            {metaItem["label"]}
          </a>
        ) : (
          <span>
            <FontAwesomeIcon icon={metaItem["icon"]} />
            {metaItem["label"]}
          </span>
        )}
      </li>
    );
  });
  return <ul className="meta-list">{metaMap}</ul>;
};

export default MetaList;
