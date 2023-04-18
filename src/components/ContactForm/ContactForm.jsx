import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameId = nanoid();
  numberId = nanoid();

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.onSubmit({ name, number });
    this.setState({
      name: '',
      number: '',
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { nameId, numberId, handleSubmit, handleChange } = this;
    return (
      <form onSubmit={handleSubmit} className={css.formGroup}>
        <div className={css.nameGroup}>
          <label htmlFor={nameId}>Name</label>
          <input
            id={nameId}
            value={this.state.name}
            onChange={handleChange}
            className={css.field}
            placeholder="Please enter new name"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div className={css.nameGroup}>
          <label htmlFor={numberId}>Number</label>
          <input
            id={numberId}
            value={this.state.number}
            onChange={handleChange}
            className={css.field}
            placeholder="Please enter new number"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button className={css.btn}>Add contact</button>
      </form>
    );
  }
}