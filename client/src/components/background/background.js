import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';
import styles from './background.css';

class Background extends Component {
  constructor(props) {
    super(props)
}
  componentDidMount() {
    this.fadeBg()

  }
  componentDidUpdate() {
  }

  fadeBg = () => {
    let background = document.getElementById('background')
    background.style.transition = '2s';
    // background.style.opacity = '1'
  }
  render() {
    return (
      <div id="background" style={{backgroundImage: this.props.image}}></div>
    )
  }
}

export default Background;