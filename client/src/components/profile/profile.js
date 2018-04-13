import React, { Component } from 'react';
import styles from './profile.css';
import Collapse from '../../components/collapse';
import db from '../../utils/database';
class Profile extends Component {
  state = {

  }

  getSaved = () => {
    db.getSaved()
  }
  render() {
    let name = "Alex";
    return (
      <div className="outer">
        <div className="name">
          <h1> {name}'s Saved Articles</h1>
        </div>
        <div >
          <div id="accordion">
            <Collapse />
          </div>
        </div>

      </div>
    )
  }
}

export default Profile;


