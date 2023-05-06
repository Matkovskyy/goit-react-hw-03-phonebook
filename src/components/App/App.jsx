import React, { Component } from "react";
import css from './App.module.css';
import { nanoid } from 'nanoid';
import ContactForm from "components/ContactForm/ContactForm";
import ContactList from "components/ContactList/ContactList";
import Filter from "components/Filter/Filter";


export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const updateContscts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(updateContscts);

    if (parseContacts && parseContacts.length !== 0) {
      this.setState({
        contacts: parseContacts,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = contact => {
    if (this.isDublicate(contact)) {
      return alert(`${contact.name} is already in contacts`);
    }
    this.setState(prev => {
      const newContact = {
        id: nanoid(),
        ...contact,
      };
      return {
        contacts: [...prev.contacts, newContact],
      };
    });
  };

  removeContact = id => {
    this.setState(prev => {
      const newContacts = prev.contacts.filter(item => item.id !== id);
      return {
        contacts: newContacts,
      };
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  isDublicate({ name }) {
    const { contacts } = this.state;
    const result = contacts.find(item => item.name === name);
    return result;
  }

  getFilteredContacts() {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLocaleLowerCase();
      const result = normalizedName.includes(normalizedFilter);
      return result;
    });

    return filteredContacts;
  }

  render() {
    const { addContact, handleChange, removeContact } = this;
    const { filter } = this.state;
    const contacts = this.getFilteredContacts();

    return (
      <div className={css.container}>
        <div>
          <h1 className={css.title}>Phonebook</h1>
          <ContactForm onSubmit={addContact} />
        </div>
        <div>
          <h2 className={css.title}>Contacts</h2>
          <Filter
            title="Find contacts by name"
            value={filter}
            onChange={handleChange}
          />
          <ContactList items={contacts} removeContact={removeContact} />
        </div>
      </div>
    );
  }
}