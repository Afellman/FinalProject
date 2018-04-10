import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';
import styles from './background.css';

class Background extends Component {
  constructor(props) {
    super(props)
}
  




  render() {
    return (
      <div id="background" style={{backgroundImage: this.props.image}}></div>
    )
  }
}

export default Background;