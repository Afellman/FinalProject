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
        <button className="btn" onClick={this.props.hideProfile} id="close"> X </button>
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


