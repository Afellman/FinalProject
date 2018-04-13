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