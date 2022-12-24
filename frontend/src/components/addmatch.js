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

const AddMatch = (props) => {
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [venue, setVenue] = useState('');
    const [date, setDate] = useState('');
    const [referee, setReferee] = useState('');
    const [linesman1, setLinesman1] = useState('');
    const [linesman2, setLinesman2] = useState('');
    const [selectedVenues, setSelectedVenues] = useState([]);

    
    axios.get('http://localhost:4000/venues')
    .then((response) => {
        const data = response.data;
        setSelectedVenues(data);
        console.log('received venues');
        console.log(data);

    }).catch(() => {
        alert('Error retrieving data');
    })

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(team1);
        console.log(team2);
    }

    
    
    return (
            <div className = "auth-form-container"> 
                <h2>Add Match</h2>
                <form className='login-form' onSubmit={handleSubmit}>

                    <label htmlFor = "team1">Home team</label> 
                    <select value = {team1} onChange = {
                    (e) => setTeam1(e.target.value)} id = "team1" name="team1">
                    
                    <option value="">-- select one --</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Australia">Australia</option>
                    <option value="Belgium">Belgium</option>

                    <option value="Brazil">Brazil</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Costa Rica">Costa Rica</option>

                    <option value="Croatia">Croatia</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="England">England</option>

                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Iran">Iran</option>

                    <option value="Japan">Japan</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Netherlands">Netherlands</option>

                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>

                    <option value="Senegal">Senegal</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Spain">Spain</option>
                    <option value="Switzerland">Switzerland</option>

                    <option value="Tunisia">Tunisia</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="USA">USA</option>
                    <option value="Whales">Whales</option>
                    </select> 

                    <label htmlFor = "team2">Away team</label> 
                    <select value = {team2} onChange = {
                    (e) => setTeam2(e.target.value)} id = "team2" name="team2">
                    
                    <option value="">-- select one --</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Australia">Australia</option>
                    <option value="Belgium">Belgium</option>

                    <option value="Brazil">Brazil</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Costa Rica">Costa Rica</option>

                    <option value="Croatia">Croatia</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="England">England</option>

                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Iran">Iran</option>

                    <option value="Japan">Japan</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Netherlands">Netherlands</option>

                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>

                    <option value="Senegal">Senegal</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Spain">Spain</option>
                    <option value="Switzerland">Switzerland</option>

                    <option value="Tunisia">Tunisia</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="USA">USA</option>
                    <option value="Whales">Whales</option>
                    </select> 

                    <label htmlFor = "venue">Venue</label> 
                    <select value = {venue} onChange = {
                    (e) => setVenue(e.target.value)} id = "venue" name="venue">
                        <option value="">-- select one --</option>
                        {selectedVenues.map((selectedVenues, index) => 
                        <option value={selectedVenues['names']}>{selectedVenues['name']}</option>
                        )}
                        </select> 

                    <label htmlFor = "date">Date and time</label> 
                    <input value = {date} onChange = {
                        (e) => setDate(e.target.value)} type = "text" id = "date" name = "date" /> 

                    <label htmlFor = "referee">Referee</label> 
                    <input value = {referee} onChange = {
                        (e) => setReferee(e.target.value)} type = "text" id = "referee" name = "referee" /> 

                    <label htmlFor = "linesman1">First linesman</label> 
                    <input value = {linesman1} onChange = {
                        (e) => setLinesman1(e.target.value)} type = "text" id = "linesman1" name = "linesman1" /> 

                    <label htmlFor = "linesman2">Second linesman</label> 
                    <input value = {linesman2} onChange = {
                        (e) => setLinesman2(e.target.value)} type = "text" id = "linesman2" name = "linesman2" /> 
        
                    <button className="loginOrRegister" type = "submit">Add Match</button>
        
                </form>
                <button className="link-btn" onClick = {() => props.onFormSwitch('register')}> Don't have an account? Register here</button>
            </div>
                    
            );
}

export default AddMatch;