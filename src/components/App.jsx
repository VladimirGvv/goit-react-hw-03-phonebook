import React, { Component } from "react";
import { PhoneForm } from './PhoneForm/PhoneForm';
import { Filter } from "./Filter/Filter";
import { Contacts } from "./Contacts/Contacts";
import styles from './App.module.scss';




export class App extends Component {
  state = {
  contacts: [],
  filter: '',
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  filterByName = e => {
    const { filter, contacts } = this.state;
    
    if (filter === '') {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  contactSubmit = values => {
    const { contacts } = this.state;
    const nameArray = contacts.map(contact => {
      return contact.name;
    });
    if (nameArray.includes(values.name)) {
      return alert(`${values.name} is already in contacts.`);
    }
    return this.setState(({ contacts }) => ({
      contacts: [values, ...contacts],
    }));
  };

  toDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
   render() {
     const { filter } = this.state;
     const {phone_form} = styles
    return (
      <div className={phone_form}>
        <h1>Phonebook</h1>
        <PhoneForm onSubmit={this.contactSubmit} />
        <h2>Contacts</h2>
        <Filter value={filter} filterByName={this.handleChange} />
        <Contacts filterByName={this.filterByName} toDelete={this.toDelete} />
      </div>
    );
  }
};
