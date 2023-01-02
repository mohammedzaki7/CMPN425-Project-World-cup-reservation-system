import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AdminApprove = (props) => {
    const [users, setUsers] = useState([]);

    const apiURL = 'http://localhost:3000/user/view' ;
    const apiURLUpdate = 'http://localhost:3000/user/update' ;
    const apiURLDelete = 'http://localhost:3000/user/delete' ;

    useEffect(() => {
        axios.get(apiURL)
        .then((response) => {
        const data = response.data;
        setUsers(data);
        console.log(data);

        }).catch(() => {
            alert('Error retrieving users');
        })
        }, []);

        const remove = (e, userId) => {
            e.preventDefault();
            console.log(userId);

            axios.delete( apiURLDelete + '/' + userId) //json server
            .then(response => { }).catch((e) => {
                alert(e, 'reservation');
            })
            alert('User is successfully removed');
            refreshPage();
        }
        const approve = (e, userId) =>{
            e.preventDefault();
            console.log(userId);
            
            const userInfo = {
                approved : true
            }
            axios.put( apiURLUpdate + '/' +userId, userInfo ) //json server 1 will be changed to id
                .then(response => {
                console.log(response)
                }).catch((e) => {
                    alert(e);
                })
            alert('User is successfully approved');
            
            refreshPage();
        }

    
    const refreshPage = ()=>{
        window.location.reload();
    }


    return (
        <div>
            <h2>All users</h2>
            {users.map((user, index) => 
            <div className = "auth-form-container stadiums" key={index}>
                <small>First name : {user['firstname']}</small>
                <small>Last name : {user['lastname']}</small>
                <small>Birthdate : {user['birthdate']}</small>
                <small>Gender : {user['gender']}</small>
                <small>Nationality : {user['nationality']}</small>
                <small>Role : {user['role']}</small>
                <small>Username : {user['username']}</small><br></br> 
                {
                user['approved'] === false ?
                <div>
                    <button className="remove" onClick={(e) => {
                    remove(e, user['_id'])
                    }}>Reject</button>
                    <button className="approve" onClick={(e) => {
                    approve(e, user['_id'])
                    }}>Approve</button> 
                </div>
                : 
                <button className="remove" onClick={(e) => {
                remove(e, user['_id'])
                }}>Remove</button>
            }
                 
            </div>
            )}
        </div>

    );
}

export default AdminApprove;