import React from 'react';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome/index';

import "./SearchBox.scss";

const SearchBox = ({search, setSearch, onSubmit}) => {


    return (
      <div className="search__wrapper">
        <FontAwesomeIcon icon="search" />
        <input
          type="text"
          className="search__input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSubmit={onSubmit}
        />
      </div>
    );
  };
  export default SearchBox