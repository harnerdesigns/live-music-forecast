import React from "react";
import { Link } from "gatsby";

import _ from "lodash";
import { FontAwesomeIcon } from "../../../node_modules/@fortawesome/react-fontawesome/index";

const LetterPagination = ({ currentLetter, nextLetter, prevLetter, totalPages, urlBase }) => {
  return (
    <div className="pagination__wrapper">
      {prevLetter ? (
        <Link
          className="pagination__button pagination__button--prev"
          to={urlBase + `/${prevLetter}`}
        >
          <FontAwesomeIcon icon="arrow-left" />
        </Link>
      ) : null}
            <span className="pagination__label">
        {currentLetter  && `Page ${currentLetter}`}
      </span>
      {nextLetter && (
        <Link
          className="pagination__button pagination__button--next"
          to={urlBase + `/${nextLetter}`}
        >
          <FontAwesomeIcon icon="arrow-right" />
        </Link>
      )}
    </div>
  );
};

export default LetterPagination;
