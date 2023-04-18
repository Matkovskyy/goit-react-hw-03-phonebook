import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export default function ContactList({ items, removeContact }) {
  const elements = items.map(({ name, number, id }) => {
    return (
      <li key={id} className={css.listLi}>
        {name} {number}
        <button className={css.listBntDelete} onClick={() => removeContact(id)}>
          Delete
        </button>
      </li>
    );
  });
  return (
    <>
      <ul>{elements}</ul>
    </>
  );
}

ContactList.defaultProps = {
  items: [],
};

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};