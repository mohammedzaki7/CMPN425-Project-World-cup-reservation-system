import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import EditMatch from './editmatch';
import Login from './login';


const SelectMatchToEdit = (props) => {

    const [selectedMatches, setSelectedMatches] = useState([]);
    const [matchid, setMatchID] = useState('');

    const apiURL = 'http://localhost:4000/matches' ;

    useEffect(() => {
        axios.get(apiURL) 
        .then((response) => {
        const data = response.data;
        setSelectedMatches(data);
        // setMatchID(data[0]['id'])
        }).catch(() => {
            alert('Error retrieving data');
        })
        }, []);

     const handleSubmit = (e) =>{
        e.preventDefault();

    }

    return (
        <div>
            
                <div>
                    <h2>Select a match to edit</h2>
                    <select value = {matchid} onChange = {
                    (e) => setMatchID(e.target.value)} id = "match" name="match">
                        <option value="">Select match</option>
                        {selectedMatches.map((match, index) => 
                        <option value={match['id']} key={index}>{match['teamone']} VS {match['teamtwo']}</option>
                        )}
                    </select>
                    <div>
                    {
                    matchid ? <EditMatch onIdChange={matchid}/> : <Login></Login>
                    }
                    </div>
                </div> 
                {
                console.log(matchid)
                
                }
                
                    
            
        </div>
        

        // <div>
        //     {
        //     <select
        //     value={matchid}
        //     onChange={e => setMatchID(e.target.value)}>
        //     {selectedMatches.map((match, index) => 
        //         <option value={match['teamone']} key={index}>{match['teamone']}</option>
        //     )}
        //     </select>
            
        //     // selectedMatches.map((match, index) => 
        //     // <select
        //     // value={matchid}
        //     // onChange={e => setMatchID(e.target.value)}>
        //     // <option keyvalue={match['teamone']} key={index}>{match['teamone']}</option>
        //     // </select>
        //     // )
        //     }
        // </div>
        // <select
        //   value={selectedOption}
        //   onChange={e => setSelectedOption(e.target.value)}>
        //   {options.map(o => (
        //     <option key={o.value} value={o.value}>{o.label}</option>
        //   ))}
        // </select>
    );
}

export default SelectMatchToEdit;