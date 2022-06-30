import React from "react";
import { Link } from "gatsby";

import _ from "lodash";
import { FontAwesomeIcon } from "../../../node_modules/@fortawesome/react-fontawesome/index";

const Pagination = ({ currentPage, totalPages, urlBase }) => {
  return (
    <div className="pagination__wrapper">
      {currentPage > 2 ? (
        <Link
          className="pagination__button pagination__button--prev"
          to={urlBase + `/${currentPage - 1}`}
        >
          <FontAwesomeIcon icon="arrow-left" />
        </Link>
      ) : (
        currentPage === 2 && (
          <Link
            className="pagination__button pagination__button--prev"
            to={urlBase}
          >
            <FontAwesomeIcon icon="arrow-left" />
          </Link>
        )
      )}
      <span className="pagination__label">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage != totalPages && (
        <Link
          className="pagination__button pagination__button--next"
          to={urlBase + `/${currentPage + 1}`}
        >
          <FontAwesomeIcon icon="arrow-right" />
        </Link>
      )}
    </div>
  );
};

export default Pagination;
