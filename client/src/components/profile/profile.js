import React, { Component } from 'react';
import styles from './profile.css';
import Collapse from '../../components/collapse';
import db from '../../utils/database';
class Profile extends Component {
  constructor(props){
    super(props)
  }


  getSaved = () => {
    db.getSaved()
  }
  render() {
    let name = "Alex";
    return (
      <div className="outer">
          <h3 class = "name"> {name}'s Saved Articles</h3>
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


