import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Login from './login';


const DeleteReservation = (props) => {
    const [matches, setMatches] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [pin, setPin] = useState('');
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [stadium, setStadium] = useState('');
    const [date, setDate] = useState('');
    const [seats, setSeats] = useState([[]]);
    var [currentSeats, setCurrentSeats] = useState([[]]);
    var [selectedSeats, setSelectedSeats] = useState([]);
    const [count, setCount] = useState(0)

    // var [selectedSeats, setSelectedSeats] = useState([]);

    // var selectedSeats = [];

    
    


    const apiURL = 'http://localhost:4000/reservations' ;
    const id = 2; // user id 


    // console.log(id);

    useEffect(() => {
        axios.get(apiURL)
        .then((response) => {
            const data = response.data;
            setReservations(data);

        }).catch(() => {
            alert('Error retrieving data');
        })

        axios.get('http://localhost:4000/matches')
        .then((response) => {
            const data = response.data;
            setMatches(data);

        }).catch(() => {
            alert('Error retrieving data');
        })

        }, []);

    const handleSubmit = (e, seatToBeDeleted, reservationId, matchid) =>{
            e.preventDefault();

            const currentDate = new Date();

            axios.delete( apiURL + '/' + reservationId) //json server
            .then(response => {
            console.log(response)
            }).catch((e) => {
                alert(e, 'reservation');
            })
            
            for (let i = 0; i < matches.length; i++)
            {
                if (matches[i]['id'] === matchid)
                {
                    var oldSeats = matches[i]['seats'];
                    console.log(oldSeats);
                    console.log(seatToBeDeleted);
                    console.log(reservationId);
                    oldSeats[seatToBeDeleted[0]][seatToBeDeleted[1]] = 0

                    const matchInfo = {
                        seats : oldSeats
                    }

                    axios.patch( 'http://localhost:4000/matches/' + matchid, matchInfo ) //json server
                    .then(response => {
                        console.log(response)
                    }).catch((e) => {
                        alert(e, 'match');
                    })
                    break;
                }
            }
            
            // alert('you delete successfully delete a seat');
            refreshPage();
            // }
            
        }

    const refreshPage = ()=>{
        window.location.reload();
    }

        
    return (
        <div>
            <h2>Your reservations</h2>

            {reservations.map((reservation, index) =>
                {
                    if (reservation['userid'] == id)
                    return <div className="stadiums" key={index}>
                        <h3 className="title">{reservation['matchid']} VS {reservation['matchid']}</h3>
                        <small>Seat is in row number: {reservation['seat'][0]} and column number: {reservation['seat'][1]}</small>
                        <br></br><button className="loginOrRegister" onClick={(e) => {
                        handleSubmit(e, reservation['seat'], reservation['id'], reservation['matchid'])
                        }}>Cancel reservation</button>
                    </div>
                }
                )}

            
        </div>
                    
            );
}

export default DeleteReservation;