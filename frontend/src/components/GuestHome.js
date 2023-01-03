import React, { Component, useState } from 'react';
import axios from 'axios';
import SelectMatchToReserve from './selectmatchtoreserve';
import DeleteReservation from './deletereservation';
import EditCustomerData from './editcustomerdata';
import ViewSeats from './viewseats';
import ViewMatch from './viewmatch';
import { useSearchParams } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';

const GuestHome = (props) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [success, setSuccess] = useState(false);
    // const [userId, setUserId] = useState(0);
    // const [searchParams] = useSearchParams();
    // const userId = props.onUserIdChange;  // user id
    
    // this.props.location
    
    return (
        <div>
            <h1>FIFA WORLD CUP 2022</h1>
            <ViewSeats/>
            <ViewMatch/>
        </div>
    )
}

export default GuestHome;