import { Component } from 'react';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
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
    const contacts = localStorage.getItem('contacts'); // Получаем данные из localStorage.
    const parsedContacts = JSON.parse(contacts); // Преобразуем данные из строки JSON в объект JavaScript.

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts }); // Устанавливаем полученные контакты в обьект "contacts".
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  addContact = ({ name, number }) => {
    const existingContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      alert(`Contact ${name} is already exist!`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  visibleContact = () => {
    const filterLowerCase = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );
  };
  deleteContact = id => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    this.setState({
      contacts: updatedContacts,
    });
  };
  render() {
    const { filter } = this.state;
    return (
      <div>
        <h2>Phonebook</h2>
        <Form onSubmitProp={this.addContact} />
        <h2>Contacts:</h2>
        <Filter value={filter} onChangeFilter={this.changeFilter} />
        <ContactList
          contacts={this.visibleContact()}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
