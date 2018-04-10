import React, { Component } from 'react';
import auth from '../../utils/auth'
import styles from './start.css';
import Signup from '../../components/signup'
import Login from '../../components/login';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 


class Start extends Component {
  state = {
    showLogin: false,
    showSignup: false,
    showButtons: true,
    email: '',
    password: '',
    loginFail: false
  }

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name
    this.setState({
      [name]: value
    })
  }
  handleLogin = (e) => {
    e.preventDefault();
    let email = this.state.email;
    let pass = this.state.password;
    
    // parameters need to be coming from the form
      auth.login(email, pass, (response) => {
        this.setState({loginFail: true})
        setTimeout(()=> {
          this.setState({loginFail: false, email: '', password: ''})
        }, 1500)
      })

  }
  handleGuest = () => {
    
  }
  handleSignup = (e) => {
    // parameters need to be coming from the form
    auth.register('andrew', 'pass')
  }

  render(){
    
    return(
      <div>
        <ReactCSSTransitionGroup
          transitionName="login"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={300}
          >
            {this.state.showLogin ? 
              <Login email={this.state.email} pass={this.state.password} handleLogin={this.handleLogin} handleChange={this.handleChange}/>
            : null}
        </ReactCSSTransitionGroup>
        {this.state.showSignup ? 
          <Signup/> : null}
        {this.state.showButtons ? 
          <div className='button-div'>
            <button onClick={this.handleSignup} className='btn btn-primary'>Signup</button>
            <button onClick={()=> this.setState({showLogin: true, showButtons: false})} className='btn btn-primary'>Login</button>
            <button onClick={this.handleGuest} className='btn btn-primary'>Guest</button>
          </div>
        : null }
        <ReactCSSTransitionGroup
          transitionName="login"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={300}
          >
          {this.state.loginFail ? 
            <div id="fail-container">
              <div id='fail'>
                <h2>Login Failed</h2>
              </div>
            </div>
            : null}
          </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default Start;