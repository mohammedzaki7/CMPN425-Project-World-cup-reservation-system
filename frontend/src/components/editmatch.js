import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';




const EditMatch = (props) => {
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [venue, setVenue] = useState('');
    const [date, setDate] = useState('');
    const [referee, setReferee] = useState('');
    const [linesman1, setLinesman1] = useState('');
    const [linesman2, setLinesman2] = useState('');

    const [selectedVenues, setSelectedVenues] = useState([]);
    const apiURL = 'http://localhost:4000/matches' ;
    
    const id = props.onIdChange;
    console.log(id);

    useEffect(() => {
        axios.get(apiURL+"/"+id) // 1 will be changed to id
        .then((response) => {
        const data = response.data;
        setTeam1(data['teamone']);
        setTeam2(data['teamtwo']);
        setVenue(data['stadium']);
        setDate(data['dateee']);
        setReferee(data['refereeee']);
        setLinesman1(data['linesmanone']);
        setLinesman2(data['linesmantwo']);

        }).catch(() => {
            alert('Error retrieving data');
        })
        axios.get('http://localhost:4000/venues')
        .then((response) => {
        const venues_data = response.data;
        setSelectedVenues(venues_data);

        }).catch(() => {
            alert('Error retrieving data');
        })
        }, [id]);

    const handleSubmit = (e) =>{
        e.preventDefault();

        const matchInfo = {
            teamone : team1,
            teamtwo : team2,
            stadium : venue,
            dateee : date,
            refereeee : referee,
            linesmanone : linesman1,
            linesmantwo : linesman2
        }
        axios.patch( apiURL+"/"+id, matchInfo ) //json server 1 will be changed to id
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
            <div className="editmatches">
                <div className="stadiums">
                        <form className='login-form' onSubmit={handleSubmit}>
                    <label htmlFor = "team1">Home team</label>  
                        <select value = {team1} onChange = {
                        (e) => setTeam1(e.target.value)} id = "team1" name="team1" placeholder={team1}>
                        
                        <option value="">{team1}</option>
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
                        (e) => setTeam2(e.target.value)} id = "team2" name="team2" placeholder={team2}>
                        
                        <option value="">{team2}</option>
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
                        (e) => setVenue(e.target.value)} id = "venue" name="venue" placeholder={venue}>
                            <option value="">{venue}</option>
                            {selectedVenues.map((selectedVenues, index) => 
                            <option value={selectedVenues['names']} key={index}>{selectedVenues['name']}</option>
                            )}
                        </select>  
    
                        <label htmlFor = "date">Date and time</label>  
                        <input value = {date} onChange = {
                            (e) => setDate(e.target.value)} type = "text" id = "date" name = "date" placeholder={date}
                            onFocus={(e) => (e.target.type = "date")}/>  
    
                        <label htmlFor = "referee">Referee</label>  
                        <input value = {referee} onChange = {
                            (e) => setReferee(e.target.value)} type = "text" id = "referee" name = "referee" placeholder={referee}/>  
    
                        <label htmlFor = "linesman1">First linesman</label>  
                        <input value = {linesman1} onChange = {
                            (e) => setLinesman1(e.target.value)} type = "text" id = "linesman1" name = "linesman1" placeholder={linesman1}/>  
    
                        <label htmlFor = "linesman2">Second linesman</label>  
                        <input value = {linesman2} onChange = {
                            (e) => setLinesman2(e.target.value)} type = "text" id = "linesman2" name = "linesman2" placeholder={linesman2}/>  
            
                        <button className="loginOrRegister" type = "submit" onClick={refreshPage}>Edit Match</button>
                    </form>
                    </div>
                
            </div>
                
                    
            );
}

export default EditMatch;