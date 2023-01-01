import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes} from 'react-router-dom';
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
import SelectMatchToEdit from './components/selectmatchtoedit';
import ReserveSeat from './components/reserveseat';
import SelectMatchToReserve from './components/selectmatchtoreserve';
import DeleteReservation from './components/deletereservation';
import AdminApprove from './components/adminapprove';
import UserHome from './components/userhome';
import ManagerHome from './components/managerhome';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <Router>
      <div className='App'>
        <Routes>
        {/* <Route exact path='/' element={< ViewMatch />}></Route>  Home page*/}
        <Route exact path='/' element={currentForm === 'login' ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>}></Route>
        <Route exact path='/UserHome' element={< UserHome />}></Route>
        <Route exact path='/ManagerHome' element={< ManagerHome />}></Route>
        <Route exact path='/AdminHome' element={< AdminApprove />}></Route>

        <Route exact path='/Signup' element={< Register />}></Route>
        <Route exact path='/Login' element={< Login />}></Route>
        <Route exact path='/ViewSeats' element={< ViewSeats />}></Route>
        <Route exact path='/ViewMatch' element={< ViewMatch />}></Route>
        <Route exact path='/EditData' element={< EditCustomerData />}></Route>

        
        <Route exact path='/AddMatch' element={< AddMatch />}></Route>
        <Route exact path='/AddStadium' element={< AddStadium />}></Route>
        <Route exact path='/EditMatch' element={< SelectMatchToEdit />}></Route>
        <Route exact path='/ReserveMatch' element={< SelectMatchToReserve />}></Route>
        <Route exact path='/DeleteReservation' element={< DeleteReservation />}></Route>
        
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
