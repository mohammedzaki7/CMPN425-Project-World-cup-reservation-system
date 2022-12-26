import React, { Component, useState } from 'react';
import axios from 'axios';

const arrayAlreadyHasArray = (arr, subarr) => {
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

const ViewSeats = (props) => {
    const [selectedVenues, setSelectedVenues] = useState([]);
    
    axios.get('http://localhost:4000/venues')
    .then((response) => {
        const data = response.data;
        setSelectedVenues(data);
        // console.log('received venues');
        // console.log(data);

    }).catch(() => {
        alert('Error retrieving data');
    })

    const displayVenues = (selectedVens) => 
    {
        return selectedVens.map((selectedVens, index) => 
        <option value={selectedVens['names']}>{selectedVens['name']}</option>)
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
    }
    
    return (
        <div className="stadiums">
            <h2>View seats in stadiums</h2>
            <ul className="showcase">
                <li>
                    <div className="seat available">&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <small>Available seat</small>
                </li>

                <li>
                    <div className="seat occupied">&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <small>Occupied seat</small>
                </li> 

            </ul>

            {selectedVenues.map((selectedVen, index) => 
                // <option value={selectedVenues['names']}>{selectedVenues['name']}</option>
                // <div className="container">
                <div className="container" key={index}>
                    <h3 className="title">{selectedVen['name']}</h3>
                {(() => {
                    const seatsArr = [];
                    let row = 0;
                    let col = 0;
                    for (let i = 0; i < selectedVen['rowsNumber'] * selectedVen['seatsNumberPerRow']; i++) {
                        // rowsArr.push(<option value={i} key ={i}>{i}</option>);
                        if (i % selectedVen['seatsNumberPerRow'] == 0) {
                            seatsArr.push(<br key={i+1000}></br>)
                        }

                        let arr = [];
                        arr[0] = row;
                        arr[1] = col;

                        if(selectedVen['occupiedSeats'][row][col] == 1)
                        {
                            seatsArr.push(<div className="seat occupied" value={i} key={i}>&nbsp;&nbsp;&nbsp;&nbsp;</div>);
                        }
                        
                        // if (arrayAlreadyHasArray(selectedVen['occupiedSeats'], arr))
                        // {
                        //     seatsArr.push(<div className="seat occupied" value={i} key={i}>&nbsp;&nbsp;&nbsp;&nbsp;</div>);
                        // }
                        else
                        {
                            seatsArr.push(<div className="seat" value={i} key={i}>&nbsp;&nbsp;&nbsp;&nbsp;</div>); 
                        }
                        
                        col += 1;

                        if (col == selectedVen['seatsNumberPerRow'])
                        {
                            col = 0;
                            row += 1;
                        }
                        // console.log(selectedVen['occupiedSeats']);
                        // console.log(arr)

                        // if (selectedVen['occupiedSeats']['x'] == row && selectedVen['occupiedSeats']['y'] == col)
                        //     seatsArr.push(<div className="seat occupied" value={i} key={i}>&nbsp;&nbsp;&nbsp;&nbsp;</div>); 
                        // else
                        //     seatsArr.push(<div className="seat" value={i} key={i}>&nbsp;&nbsp;&nbsp;&nbsp;</div>); 

                    }
                    return seatsArr

                    // for (let i = 0; i < selectedVen['rowsNumber']; i++) {
                    //     rowsArr.push(<option value={i} key ={i}>{i}</option>);
                    //     const seatsArr = [];
                    //     for (let j = 0; j < selectedVen['seatsNumberPerRow']; j++)
                    //     {
                    //         seatsArr.push(<div className="seat" value={i} key={i+j}>{j}</div>);
                    //     }
                    //     return seatsArr
                    // }

                //return rowsArr;
                })()}
                </div>
            )}
            
        </div>
            
                    
            );
}

export default ViewSeats;