import { createSearchParams, useNavigate } from "react-router-dom";
import React, { Component, useState } from 'react';
import axios from 'axios';
import SelectMatchToReserve from './selectmatchtoreserve';
import SelectMatchToEdit from './selectmatchtoedit';
import DeleteReservation from './deletereservation';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [success, setSuccess] = useState(false);
    const [userId, setUserId] = useState(0);
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const apiURL = 'http://localhost:3000/user/login' ;


    const handleSubmit = async (e) =>{
        
        e.preventDefault();

        const response = await axios.post(apiURL,
                    {
                        username : username,
                        password : pass
                    }            
            )
            //,JSON.stringify({ username, pass }))
            .then((response) => {
                const data = response.data;

                if (response.status === 200)
                {
                    console.log("working");
                    console.log(data);
                    if(data[0]['approved'])
                    {
                        setSuccess(true);
                        setUserId(data[0]['id']);
                        setRole(data[0]['role']);
                        if (data[0]['role'] === 'fan')
                        {
                            let path = '/UserHome'; 
                            navigate({pathname : path
                                , search : createSearchParams({
                                userId: data[0]['id']
                            }).toString()
                        });
                            //     , search: createSearchParams({
                            //     userId: {userId}
                            // })
                        // );
                        }
                        else if (data[0]['role'] === 'manager')
                        {
                            let path = '/ManagerHome'; 
                            navigate(path);
                        }
                        else if (data[0]['role'] === 'administrator')
                        {
                            let path = '/AdminHome'; 
                            navigate(path);
                        }

                    }
                    else
                    {
                        alert('User not approved yet');
                        refreshPage();
                    }
                }
                else
                {
                    console.log("user");
                    alert('User does not exist');
                    refreshPage();
                }
                }).catch(() => {
                    console.log("error");
                    alert('User does not exist');
                    refreshPage();
                });
    }

    const refreshPage = ()=>{
        window.location.reload();
    }
    
    
    
    return (
        <>
        {success? 
            (<div>
                <h1>FIFA WORLD CUP 2022</h1>
                {/* {role === 'manager' ? <h1>Welcome to the manager page</h1> 
                :
                <h1>Welcome to the customer page</h1>} */}
                {/* <SelectMatchToReserve onUserIdChange={userId}/>
                <DeleteReservation onUserIdChange={userId}/> */}
                </div>
            ) : (
                <div className = "auth-form-container"> 
                <h2>Login</h2>
                <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor = "username">username</label>
                <input value = {username} onChange = {
                    (e) => setUsername(e.target.value)} type = "text" id = "username" name = "username" required/>
    
                <label htmlFor = "password">password</label>
                <input value = {pass} onChange = {
                    (e) => setPass(e.target.value)} type = "password" id = "password" name = "password" required/>
    
                <button className="loginOrRegister" type = "submit"> Log In</button>
            </form>
            <button className="link-btn" onClick = {() => props.onFormSwitch('register')}> Don't have an account? Register here</button>
        </div>
            )
        }</>  
        );
}

export default Login;