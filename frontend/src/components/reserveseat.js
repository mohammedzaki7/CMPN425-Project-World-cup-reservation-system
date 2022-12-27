import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Login from './login';

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

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

  function deleteRow(arr, row) {
    arr = arr.slice(0); // make copy
    arr.splice(row - 1, 1);
    return arr;
 }


function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for(var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}


const ReserveSeat = (props) => {
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
    const id = props.onIdChange;
    // console.log(id);

    useEffect(() => {
        axios.get('http://localhost:4000/matches/'+id)
        .then((response) => {
            const data = response.data;
            setTeam1(data['teamone']);
            setTeam2(data['teamtwo']);
            setStadium(data['stadium']);
            setDate(data['dateee']);
            setSeats(data['seats']);
            setCurrentSeats(data['seats']);

            // console.log(seats);

        }).catch(() => {
            alert('Error retrieving data');
        })
        }, [id]);

        const handleSubmit = (e) =>{
            e.preventDefault();

            // if(count < 1){
            //     alert('Please select a seat');
            // }
            // else
            // {
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

                alert(seats, 'seats are');
                const matchInfo = {
                    seats : currentSeats
                }

                axios.patch( 'http://localhost:4000/matches/' + id, matchInfo ) //json server
                .then(response => {
                console.log(response)
                }).catch((e) => {
                    alert(e);
                })
                refreshPage();
            // }
            
        }

    const refreshPage = ()=>{
        window.location.reload();
    }

    const handleClick = (e, i) => {
        e.preventDefault();
        e.target.classList.toggle('seatselected');

        const rows = currentSeats.length;
        const columns = currentSeats[0].length;
        // console.log(currentSeats);
        let row = 0;
        let col = 0;

        for (let k = 0; k < rows * columns; k++) {

            if (k===i)
            {
                // console.log(selectedSeats);
                // console.log(row);
                // console.log(col);
                // console.log(currentSeats[row][col], 'value is');
                if (currentSeats[row][col] === 0)
                {
                    currentSeats[row][col] = 1;
                    selectedSeats.push([row, col]);
                    setCount(count + 1);
                    console.log(count);

                }
                else if (currentSeats[row][col] === 1)
                {
                    console.log('siuuuu');
                    currentSeats[row][col] = 0;
                    // selectedSeats = removeItemAll(selectedSeats, [row, col])
                    // delete selectedSeats[row][col];
                    for (let rowww = 0; rowww < selectedSeats.length; rowww++)
                    {
                            console.log(rowww, 'rowww is');
                            console.log(selectedSeats[rowww][0], 'row is');
                            console.log(selectedSeats[rowww][1], 'col is');

                            if (selectedSeats[rowww][0]===row && selectedSeats[rowww][1]===col)
                            {
                                console.log("jjjjjj");
                                selectedSeats.splice(rowww, 1);
                            }
                    }
                    setCount(count - 1);

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
            <form className='login-form' onSubmit={(e) => { count > 0? handleSubmit(e) : alert('Please select a seat');}}>
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
                        // console.log(arr, 'arr is');
                        console.log(selectedSeats, 'selected seats');
                        if(seats[row][col] === 1 && arrayAlreadyHasArray(selectedSeats, arr) == false)
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
                    <label htmlFor = "ccn">Credit card number</label>
                    <input value = {creditCardNumber} onChange = {
                    (e) => setCreditCardNumber(e.target.value)} type = "text" id = "ccn" name = "ccn" required/>

                    <label htmlFor = "pin">Pin</label>
                    <input value = {pin} onChange = {
                    (e) => setPin(e.target.value)} type = "text" id = "pin" name = "pin" required/>

                <button className="loginOrRegister" type = "submit">Reserve now</button>
            </form>

            
        </div>
                    
            );
}

export default ReserveSeat;