import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./components/login"
import Register from "./components/register"
import AddMatch from './components/addmatch';
import EditMatch from './components/editmatch';
import AddStadium from './components/addstadium';
import ViewSeats from './components/viewseats';
import ViewMatch from './components/viewmatch';
import EditCustomerData from './components/editcustomerdata';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <div className="App">
      {
        <Register onFormSwitch = {toggleForm} />
        //currentForm === "login" ? <Login onFormSwitch = {toggleForm} /> : <Register onFormSwitch = {toggleForm} />  
      }
    </div>
  );
}

export default App;
