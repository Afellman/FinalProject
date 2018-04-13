import React, { Component } from 'react';
import styles from './logout-btn';
import auth from '../../utils/auth';
import { Link } from 'react-router-dom'

class Logout extends Component {
    
  logout = () => {
    auth.logout()
  }

  render(){
    return (
      <Link className='btn btn-primary' to="/">Logout</Link>
    )
  }
}

export default Logout;