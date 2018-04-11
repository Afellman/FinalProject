import React, { Component } from 'react';
import styles from './Profile.css';
import Collapse from '../../components/collapse';

class Profile extends Component {
  render() {
    let name = "alex";
    return (
      <div className = "container">
        <div className = "name">
          <h1> {name}'s Splash Page</h1>
        </div>

        <div className = "collapse">
          <Collapse/>
        </div>






      </div>
    )
  }
}

export default Profile;