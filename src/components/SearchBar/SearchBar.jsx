import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import css from "components/SearchBar/SearchBar.module.css";
import { GoSearch } from 'react-icons/go';

export const SearchBar = ({ handleSubmit }) => {
  const [searchField, setSearchField] = useState('');

  const onSearchChange = evt => {
    setSearchField(evt.currentTarget.value);
  };

  const onSubmit = evt => {
    evt.preventDefault();
    handleSubmit(searchField);
    setSearchField('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <button className={css.searchFormButton} type="submit">
          <GoSearch size={20} />
        </button>

        <input
          onChange={onSearchChange}
          className={css.searchFormInput}
          type="text"
          name="search_field"
          value={searchField}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}