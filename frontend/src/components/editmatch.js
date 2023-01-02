import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

function Validations(referee, linesman1, linesman2, teamone, teamtwo)
{
    if(isNaN(referee)==false)
    {
        alert('referee name can not contain a number');
        return(false);
    }
    if(isNaN(linesman1)==false)
    {
        alert('First linesman name can not contain a number');
        return(false);
    }
    if(isNaN(linesman2)==false)
    {
        alert('Second linesman name can not contain a number');
        return(false);
    }
    if(teamone === teamtwo)
    {
        alert('Same team cannot play against itself');
        return(false);
    }
    return (true);
}

const EditMatch = (props) => {
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [venueName, setVenueName] = useState('');
    const [rowsNumber, setRowsNumber] = useState('');
    const [columnsNumber, setColumnsNumber] = useState('');
    const [date, setDate] = useState('');
    const [referee, setReferee] = useState('');
    const [linesman1, setLinesman1] = useState('');
    const [linesman2, setLinesman2] = useState('');

    const [selectedVenues, setSelectedVenues] = useState([]);
    const apiURL = 'http://localhost:3000/match/search' ;
    const apiURLUpdate = 'http://localhost:3000/match/update' ;
    
    const id = props.onIdChange; // match id
    console.log(id);

    useEffect(() => {
        axios.get(apiURL+"/"+id) // 1 will be changed to id
        .then((response) => {
        const data = response.data;
        setTeam1(data['teamone']);
        setTeam2(data['teamtwo']);
        setVenueName(data['stadiumname']);
        setDate(data['date']);
        setReferee(data['referee']);
        setLinesman1(data['linesmen'][0]);
        setLinesman2(data['linesmen'][1]);

        }).catch(() => {
            alert('Error retrieving data');
        })
        axios.get('http://localhost:3000/stadium/view')
        .then((response) => {
        const venues_data = response.data;
        setSelectedVenues(venues_data);

        }).catch(() => {
            alert('Error retrieving data');
        })
        }, [id]);

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(Validations(referee, linesman1, linesman2, team1, team2))
        {
            var gfg = new Array(rowsNumber);
      
            // Loop to create 2D array using 1D array
            for (var i = 0; i < rowsNumber; i++) {
                gfg[i] = new Array(columnsNumber);
            }
            for (let i = 0 ; i < rowsNumber; i++)
            {
                for (let j = 0 ; j < columnsNumber; j++)
                {
                    gfg[i][j] = 0;
                }
            }
            
            const matchInfo = {
                teamone : team1,
                teamtwo : team2,
                stadiumname : venueName,
                date : date,
                referee : referee,
                linesmen : [
                    linesman1,
                    linesman2],
                seats : gfg
            }
            axios.patch( apiURLUpdate+"/"+id, matchInfo ) //json server 1 will be changed to id
            .then(response => {
            console.log(response)
            refreshPage();
            }).catch((e) => {
                alert(e);
            })
            alert('Match is updates successfully');
        }
        
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
                        <label htmlFor = "venue">Stadium</label> 
                        <select value = {venueName} onChange = {
                        (e) => {
                            setVenueName(e.target.value)
                            const details = e.target.value;
                            //setVenueName(details.split(",")[0])
                            setRowsNumber(details.split(",")[1])
                            setColumnsNumber(details.split(",")[2])
                            // console.log(e.target.value.slice(-7))
                            console.log(e.target.value.split(","))
                            }} id = "venue" name="venue" required>
                            <option value="">venueName</option>
                            {selectedVenues.map((selectedVenue, index) => 
                            <option key = {index} value={[selectedVenue['name']
                            , selectedVenue['length'], selectedVenue['width']]
                            }>{selectedVenue['name']}</option>

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
            
                        <button className="loginOrRegister" type = "submit" >Edit Match</button>
                    </form>
                    </div>
                
            </div>
                
                    
            );
}

export default EditMatch;