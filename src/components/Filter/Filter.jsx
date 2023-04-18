import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export default function Filter({ title, value, onChange }) {
  const filterId = nanoid();
  return (
    <div>
      <label htmlFor="filterId">{title}</label>
      <input
        className={css.filterForm}
        id={filterId}
        type="text"
        name="filter"
        onChange={onChange}
        value={value}
        placeholder="Enter name to search"
      />
    </div>
  );
}

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};