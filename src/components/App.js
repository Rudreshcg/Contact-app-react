import React, { useEffect, useState } from 'react';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList"
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ContactDetail from './ContactDetail';

function App() {
  const LOCAL_STORAGE_KEY = "contact"
  const [contacts, setContacts] = useState([])

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuidv4(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts?.length) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>
          <Route path='/add' element={<Navigate to="/" />} Component={() => (<AddContact addContactHandler={addContactHandler} />)} />
          <Route path='/' Component={() => (<ContactList contacts={contacts} getContactId={removeContactHandler} />)} />
          <Route path='/contact/:id' Component={()=>(<ContactDetail/>)} ></Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
