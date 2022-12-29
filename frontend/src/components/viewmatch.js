import React, { Component, useState, useEffect } from 'react';
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

const ViewMatch = (props) => {
    const [matches, setMatches] = useState([]);

    
    useEffect(() => {
        axios.get('http://localhost:4000/matches')
        .then((response) => {
        const data = response.data;
        setMatches(data);

    }).catch(() => {
        alert('Error retrieving data');
    })

        }, []);


    

    const handleSubmit = (e) =>{
        e.preventDefault();
    }

    
    return (
            <div className="stadiums"> 
                <h1>Upcoming matches</h1>
                {matches.map((match, index) => 
                    <div className="match" key = {index}>
                        <h3 className="teams">{match['teamone']} VS {match['teamtwo']}</h3>
                        <small>Stadium : {match['stadiumname'].split(",")[0]}</small><br></br>
                        <small>Date and time : {match['date']}</small><br></br>
                        <small>Referee : {match['referee']}</small><br></br>
                        <small>First linesman : {match['linesmen'][0]}</small><br></br>
                        <small>Second linesman : {match['linesmen'][1]}</small><br></br>
                    </div>
                )}
            </div>
                    
            );
}

export default ViewMatch;