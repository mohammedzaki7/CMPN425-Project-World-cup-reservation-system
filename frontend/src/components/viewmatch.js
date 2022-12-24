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

const ViewMatch = (props) => {
    const [matches, setMatches] = useState([]);

    
    axios.get('http://localhost:4000/matches')
    .then((response) => {
        const data = response.data;
        setMatches(data);
        console.log('received venues');
        console.log(data);

    }).catch(() => {
        alert('Error retrieving data');
    })

    const handleSubmit = (e) =>{
        e.preventDefault();
    }

    
    return (
            <div className="stadiums"> 
                <h2>View Matches</h2>
                {matches.map((match, index) => 
                    <div className="match">
                        <p className="teams">{match['team1']} : {match['team2']}</p>
                        <small>Stadium : {match['venue']}</small><br></br>
                        <small>Date and time : {match['date']}</small><br></br>
                        <small>Referee : {match['referee']}</small><br></br>
                        <small>First linesman : {match['linesman1']}</small><br></br>
                        <small>Second linesman : {match['linesman2']}</small><br></br>
                    </div>
                )}
            </div>
                    
            );
}

export default ViewMatch;