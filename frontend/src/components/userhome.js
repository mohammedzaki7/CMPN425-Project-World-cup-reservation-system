import React, { Component, useState } from 'react';
import axios from 'axios';
import SelectMatchToReserve from './selectmatchtoreserve';
import DeleteReservation from './deletereservation';
import EditCustomerData from './editcustomerdata';
import ViewSeats from './viewseats';
import ViewMatch from './viewmatch';
import { useSearchParams } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';

const UserHome = (props) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [success, setSuccess] = useState(false);
    // const [userId, setUserId] = useState(0);
    const [role, setRole] = useState('');

    const apiURL = 'http://localhost:3000/user/search/' ;
    // const [searchParams] = useSearchParams();
    // const userId = props.onUserIdChange;  // user id
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
    }

    const refreshPage = ()=>{
        window.location.reload();
    }

    const  [userId] = useSearchParams();
    console.log(userId);
    // this.props.location
    
    return (
        <div>
            {
                console.log(userId.get('userId'))
            }
            <h1>FIFA WORLD CUP 2022</h1>
            {/* <SelectMatchToReserve onUserIdChange={userId.get('userId')}/>
            <DeleteReservation onUserIdChange={userId.get('userId')}/> */}
            <EditCustomerData onUserIdChange={userId.get('userId')}/>
            <ViewSeats/>
            <ViewMatch/>
        </div>
    )
}

export default UserHome;