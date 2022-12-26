import React, { Component, useState } from 'react';
import axios from 'axios';

// const getVenues = () => {
//     axios.get('/api')
//     .then((response) => {
//         const data = response.data;
//     }).catch(() => {
//         alert('Error retrieving data');
//     })
// }

// const displayVenues = (selectedVens) => 
// {
//     return selectedVens.map((selectedVens, index) => 
//     <option value={selectedVens['names']}>{selectedVens['name']}</option>)
// };

const AddStadium = (props) => {
    const [stadiumName, setStadiumName] = useState('');
    const [rowsNumber, setRowsNumber] = useState('');
    const [seatsNumberPerRow, setSeatsNumberPerRow] = useState('');
    const apiURL = 'http://localhost:4000/venues' ;
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const stadiumInfo = {
            name : stadiumName,
            rowsNumber : rowsNumber,
            seatsNumberPerRow : seatsNumberPerRow
        }
        console.log(stadiumInfo)
        axios.post( apiURL , stadiumInfo ) //json server
        .then(response => {
        console.log(response)
        }).catch((e) => {
            alert(e);
        })
    }

    const refreshPage = ()=>{
        window.location.reload();
    }
    
    return (
            <div className = "auth-form-container"> 
                <h2>Add Stadium</h2>
                <form className='login-form' onSubmit={handleSubmit}>

                    <label htmlFor = "stadiumName">Stadium name</label>   
                    <input value = {stadiumName} onChange = {
                        (e) => setStadiumName(e.target.value)} type = "text" id = "stadiumName" name = "stadiumName" required/>   

                    <label htmlFor = "rowsNumber">Number of rows</label>   
                    <input value = {rowsNumber} onChange = {
                        (e) => setRowsNumber(e.target.value)} type = "text" id = "rowsNumber" name = "rowsNumber" required/>   

                    <label htmlFor = "seatsNumberPerRow">Number of seats per row</label>   
                    <input value = {seatsNumberPerRow} onChange = {
                        (e) => setSeatsNumberPerRow(e.target.value)} type = "text" id = "seatsNumberPerRow" name = "seatsNumberPerRow" required/>   

                    <button className="loginOrRegister" type = "submit" onClick={refreshPage}>Add Match</button>
        
                </form>
            </div>
                    
            );
}

export default AddStadium;