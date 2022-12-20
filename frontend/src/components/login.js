import React, { Component, useState } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            pass: ''
    
        }
    }

    handleSubmit = (e) =>
    {
        e.preventDefault();

    }
    render() { 
        return (
            <div className = "auth-form-container"> 
                <h2>Login</h2>
                <form className='login-form' onSubmit={this.handleSubmit}>
                    <label htmlFor = "username">username</label>
                    <input value = {this.state.username} onChange = {
                        (e) => this.setState({username: e.target.value})} type = "text" id = "username" name = "username" />

                    <label htmlFor = "password">password</label>
                    <input value = {this.state.pass} onChange = {
                        (e) => this.setState({pass: e.target.value})} type = "password" id = "password" name = "password" />

                    <button className="loginOrRegister" type = "submit"> Log In</button>

                </form>
                <button className="link-btn" onClick = {() => this.props.onFormSwitch('register')}> Don't have an account? Register here</button>
            </div>
            
        );
    }
    displayToUser() {
        console.log(this.state.email)
    }
}
 
export default Login; 