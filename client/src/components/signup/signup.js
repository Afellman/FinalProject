import React from 'react';

const Signup = (props) => {

  return (
    <div id='login-container'>
    <div className='login' style={{opacity: props.opacity}}>
        <div  className='form-group'>
          <label>Email</label>
          <input className='form-control' value={props.signupEmail} onChange={props.handleChange} type='text' name='signupEmail' placeholder='Email'/>
        </div>
        <div  className='form-group'>
          <label>Password</label>
          <input className='form-control' value={props.signupPass} onChange={props.handleChange} type='password' name='signupPass' placeholder='Password'/>
        </div>
        <button className='btn btn-primary' onClick={props.handleSignup}>Submit</button>
    </div>
    </div>
  )
}

export default Signup;

