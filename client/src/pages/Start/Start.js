import React, { Component } from 'react';

class Start extends Component {

  handleLogin = () => {

  }
  handleGuest = () => {
    
  }
  render(){
    
    return(
      <div style={{textAlign: 'center'}}>
        <button onClick={this.handleLogin} className='btn btn-primary'>Login</button>
        <button onClick={this.handleGuest} className='btn btn-primary'>Guest</button>
      </div>
    )
  }
}

export default Start;