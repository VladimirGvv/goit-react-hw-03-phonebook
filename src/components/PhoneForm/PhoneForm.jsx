import PropTypes from 'prop-types';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './PhoneForm.module.scss';

export class PhoneForm extends Component {
  state = {
    name: '',
    number: '',
  };
    
  ContactInputId = nanoid();

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const contact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };
    this.props.onSubmit(contact);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
      const { name, number } = this.state;
      const { form, label, input, btn } = styles;

    return (
      <form onSubmit={this.handleSubmit} className={form}>
            <label className={label}>Name</label>

        <input
          id={this.ContactInputId}
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          className={input}
        />

        <label className={label}>Number</label>

        <input
          id={this.ContactInputId}
          type="tel"
          name="number"
          value={number}
          onChange={this.handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          className={input}
        />

        <button type="submit" className={btn}>Add contact</button>
      </form>
    );
  }
}

PhoneForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};