import React, { Component, useState } from 'react';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(username);
    }
    
    return (
        <div className = "auth-form-container"> 
            <h2>Login</h2>
            <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor = "username">username</label>
                <input value = {username} onChange = {
                    (e) => setUsername(e.target.value)} type = "text" id = "username" name = "username" />
    
                <label htmlFor = "password">password</label>
                <input value = {pass} onChange = {
                    (e) => this.setPass(e.target.value)} type = "password" id = "password" name = "password" />
    
                <button className="loginOrRegister" type = "submit"> Log In</button>
    
            </form>
            <button className="link-btn" onClick = {() => props.onFormSwitch('register')}> Don't have an account? Register here</button>
        </div>   
        );
}

export default Login;