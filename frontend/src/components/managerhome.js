import React, { Component, useState } from 'react';
import axios from 'axios';
import AddMatch from './addmatch';
import SelectMatchToEdit from './selectmatchtoedit';
import AddStadium from './addstadium';
import ViewMatch from './viewmatch';
import ViewSeats from './viewseats';
import { useSearchParams } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';

const UserHome = (props) => {

    const handleSubmit = async (e) =>{
        e.preventDefault();
    }

    const refreshPage = ()=>{
        window.location.reload();
    }

    // const  [userId] = useSearchParams();
    // console.log(userId);
    // this.props.location
    
    return (
        <div>
            <h1>FIFA WORLD CUP 2022</h1>
            <AddMatch/>
            <SelectMatchToEdit 
            // onUserIdChange={userId.get('userId')}
            />
            <AddStadium 
            // onUserIdChange={userId.get('userId')}
            />
            <ViewMatch/>
            <ViewSeats/>
        </div>
    )
}

export default UserHome;