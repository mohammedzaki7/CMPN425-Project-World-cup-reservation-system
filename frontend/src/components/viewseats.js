import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

const ViewSeats = (props) => {
    const [matches, setMatches] = useState([]);

    
    useEffect(() => {
        axios.get('http://localhost:4000/matches')
        .then((response) => {
        const data = response.data;
        setMatches(data);
        // console.log('received venues');
        // console.log(data);

        }).catch(() => {
            alert('Error retrieving data');
        })
    }, []);
    
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

            {matches.map((match, index) => 
                // <option value={selectedVenues['names']}>{selectedVenues['name']}</option>
                // <div className="container">
                <div className="container" key={index}>
                    <h3 className="title">{match['teamone']} VS {match['teamtwo']}</h3>
                    <h5>{match['stadium']}</h5>
                {(() => {
                    const seatsArr = [];
                    let row = 0;
                    let col = 0;
                    const rows = match['seats'].length;
                    const columns = match['seats'][0].length;
                    for (let i = 0; i < rows * columns; i++) {
                        // rowsArr.push(<option value={i} key ={i}>{i}</option>);
                        if (i % columns === 0) {
                            seatsArr.push(<br key={i+1000}></br>)
                        }

                        let arr = [];
                        arr[0] = row;
                        arr[1] = col;

                        if(match['seats'][row][col] === 1)
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

                        if (col === columns)
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