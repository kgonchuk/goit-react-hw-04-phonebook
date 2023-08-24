import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Form.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
    id: '',
  };
  nameInputId = nanoid();
  numberInputId = nanoid();

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmitProp(this.state);
    this.reset();
  };
  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.label} htmlFor={this.nameInputId}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            id={this.nameInputId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.label} htmlFor={this.numberInputId}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            id={this.numberInputId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.submit_button} type="submit">
          Add contact{' '}
        </button>
      </form>
    );
  }
}
export default Form;
Form.propTypes = { onSubmitProp: PropTypes.func.isRequired };
