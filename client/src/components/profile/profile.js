import React, { Component } from 'react';
import styles from './profile.css';
import Collapse from '../../components/collapse';

class Profile extends Component {
  render() {
    let name = "Alex";
    return (
      <div className="outer">
        <div className="name">
          <h1> {name}'s Saved Articles</h1>
        </div>
        <div >
          <Collapse />
        </div>

      </div>
    )
  }
}

export default Profile;


