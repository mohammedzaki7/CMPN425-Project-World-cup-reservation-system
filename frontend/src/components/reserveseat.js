import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function arrayAlreadyHasArray(arr, subarr){
    for(var i = 0; i<arr.length; i++){
        let checker = false
        for(var j = 0; j<arr[i].length; j++){
            if(arr[i][j] === subarr[j]){
                checker = true
            } else {
                checker = false
                break;
            }
        }
        if (checker){
            return true
        }
    }
    return false
}

const ReserveSeat = (props) => {
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [pin, setPin] = useState('');
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [stadium, setStadium] = useState('');
    const [date, setDate] = useState('');
    var [seats, setSeats] = useState([[]]);
    // var [selectedSeats, setSelectedSeats] = useState([]);

    var selectedSeats = []
    var allSeatsIncludingSelected = [[]]
    
    


    const apiURL = 'http://localhost:4000/reservations' ;
    const id = props.onIdChange;
    console.log(id);

    useEffect(() => {
        axios.get('http://localhost:4000/matches/'+id)
        .then((response) => {
            const data = response.data;
            setTeam1(data['teamone']);
            setTeam2(data['teamtwo']);
            setStadium(data['stadium']);
            setDate(data['dateee']);
            setSeats(data['seats']);
        // allSeatsIncludingSelected = seats;

        }).catch(() => {
            alert('Error retrieving data');
        })
        }, [id]);

        const handleSubmit = (e) =>{
            e.preventDefault();

            const currentDate = new Date();
            const reservationInfo = {
                ccn : creditCardNumber,
                pin : pin,
                matchid : id,
                createdAt : currentDate,
                seat : selectedSeats
            }
            axios.post( apiURL , reservationInfo ) //json server
            .then(response => {
            console.log(response)
            }).catch((e) => {
                alert(e);
            })

            const matchInfo = {
                seats : seats
            }
            console.log(selectedSeats);
            axios.patch( 'http://localhost:4000/matches/' + id, matchInfo ) //json server
            .then(response => {
            console.log(response)
            }).catch((e) => {
                alert(e);
            })
        }

    const refreshPage = ()=>{
        window.location.reload();
    }

    const handleClick = (e, i) => {
        e.preventDefault();
        e.target.classList.toggle('seatselected');
        
        const slots = document.querySelectorAll('.seat');
        
        // let added = 0;
        // if (selectedSeats.includes(i))
        // {
        //     selectedSeats.pop(i);
        // }
        // else
        // {
        //     selectedSeats.push(i);
        // }
        console.log(i);
        // console.log(j);

        const rows = seats.length;
        const columns = seats[0].length;
        // console.log(seats[i ,j]);
        // if (seats[i,j] === 0)  {
        //     seats[i,j] = 1;
        //     console.log("d5l hena");
        // }
        // else
        // {
        //     seats[i,j] = 0;
        // }
        console.log(seats);
        let row = 0;
        let col = 0;

        for (let k = 0; k < rows * columns; k++) {

            if (k===i)
            {
                console.log(row);
                console.log(col);
                console.log(seats[row][col], 'value is');
                if (seats[row][col] === 0)
                {
                    seats[row][col] = 1;
                }
                else
                {
                    seats[row][col] = 0;
                }
            }
            
            col += 1;

            if (col === columns)
            {
                col = 0;
                row += 1;
            }

        }
        // console.log(selectedSeats);
      }

    return (
        <div className="stadiums">
            <h2>Current stadium status</h2>
            <ul className="showcase">
                <li>
                    <div className="seat available ">&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <small>Available seat</small>
                </li>

                <li>
                    <div className="seat occupied ">&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <small>Occupied seat</small>
                </li> 

                <li>
                    <div className="seat seatsdescriptionselected \">&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <small>Selected seat/s</small>
                </li> 

            </ul>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className="container">
                    <h3 className="title">{team1} VS {team2}</h3>
                    <h5>{stadium}</h5>
                {(() => {
                    const seatsArr = [];
                    let row = 0;
                    let col = 0;
                    const rows =seats.length;
                    const columns = seats[0].length;
                    for (let i = 0; i < rows * columns; i++) {
                        if (i % columns === 0) {
                            seatsArr.push(<br key={i+1000000}></br>)}
                        let arr = [];
                        arr[0] = row;
                        arr[1] = col;
                        if(seats[row][col] === 1)
                        { seatsArr.push(<div className="seat occupied" value={i} key={i}>&nbsp;&nbsp;&nbsp;&nbsp;</div>); }
                        else
                        { seatsArr.push(<div className="seat canreserve" value={i} key={i} onClick={(e) => {handleClick(e, i)}} >&nbsp;&nbsp;&nbsp;&nbsp;</div>); }
                        col += 1;
                        if (col === columns)
                        { col = 0;
                          row += 1; }
                    } 
                    return seatsArr

                })()}
                </div>


                <button className="loginOrRegister" type = "submit" onClick={refreshPage}>Add Match</button>
            </form>

            
        </div>
                    
            );
}

export default ReserveSeat;