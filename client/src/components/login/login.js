import React, { Component } from 'react';
import styles from './login.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

const Login = (props) => {
    return (
      <div id='login-container'>
      <div className='login' style={{opacity: props.opacity}}>
          <div  className='form-group'>
            <label>Email</label>
            <input className='form-control' value={props.email} onChange={props.handleChange} type='text' name='loginEmail' placeholder='johndoe@gmail.com'/>
          </div>
          <div  className='form-group'>
            <label>Password</label>
            <input className='form-control' value={props.pass} onChange={props.handleChange} type='password' name='loginPass' placeholder='Password'/>
          </div>
          <button className='btn btn-primary' onClick={props.handleLogin}>Submit</button>
      </div>
      </div>
    )
  }


export default Login;