import React, { Component } from 'react';
import Jumbotron from "../../components/Jumbotron";
import auth from '../../utils/auth'
import styles from './start.css';
import Signup from '../../components/signup'
import { Col, Row, Container } from "../../components/Grid";
import Login from '../../components/login';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 


class Start extends Component {
  state = {
    showLogin: false,
    showSignup: false,
    showButtons: true,
    signupName : '',
    signupEmail: '',
    signupPass: '',
    loginEmail: '',
    loginPass: '',
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
    this.setState({showLogin: false})
    let username = this.state.loginEmail;
    let pass = this.state.loginPass;
    // parameters need to be coming from the form
      auth.login(username, pass, (response) => {
        this.setState({loginFail: true})
        setTimeout(()=> {
          this.setState({loginFail: false, email: '', password: ''})
        }, 1500)
      })

  }

  handleGuest = () => {
    
  }

  handleSignup = (e) => {
    let username =this.state.signupEmail
    let password = this.state.signupPass
    // parameters need to be coming from the form
    auth.register(username, password)
  }

  checkSignedIn = () => {
    auth.checkLogged()
      
  }
  
  logout = () =>{
    auth.logout()
  }

  render(){
    
    return(
      <Container fluid>
        <Row>
          <Col size="md-2"/>
          <Col size="md-12">
            <Jumbotron>
            <h1><i className="fa fa-newspaper-o" aria-hidden="true"></i></h1> 
             <div>
        <ReactCSSTransitionGroup
          transitionName="login"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={300}
          >
            {this.state.showLogin ? 
              <Login email={this.state.loginEmail} pass={this.state.loginPass} handleLogin={this.handleLogin} handleChange={this.handleChange}/>
            : null}
        {this.state.showSignup ? 
          <Signup handleChange={this.handleChange} handleSignup={this.handleSignup} signupName={this.state.signupName} signupEmail={this.state.signupEmail} signupPass={this.state.signupPass}/> : null}
          </ReactCSSTransitionGroup>
        {this.state.showButtons ? 
          <div className='button-div'>
            <button onClick={()=> this.setState({showSignup: true})} className='btn btn-primary'>Signup</button>
            <button onClick={()=> this.setState({showLogin: true})} className='btn btn-primary'>Login</button>
            <button onClick={this.handleGuest} className='btn btn-primary'>Guest</button>
            <button onClick={this.checkSignedIn} className='btn btn-primary'>check user</button>
            <button onClick={this.logout} className='btn btn-primary'>Logout</button>
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
          </Jumbotron>
          <h2>Welcome to the site of endless possiblities</h2>

          </Col>
          </Row>
      

        <Row>
          <div className="container1">

           <div className="carousel">
            <div className="item a"> </div>
            <div className="item b"> </div>
            <div className="item c"> </div>
            <div className="item d"> </div>
            <div className="item e"> </div>
            <div className="item f"> </div>
          </div>
            <div className="next">Next</div>
            <div className="prev">Prev</div>

          </div>  
        </Row>

        
      
        </Container>
    )
  }
}

export default Start;