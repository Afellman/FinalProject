import React from 'react';
import {Motion, spring} from 'react-motion';
import styles from './background.css';

const Background = (props) => {

  return (
    <div id="filter" style={{backgroundImage: props.image, opacity: props.opacity}}></div>
  )
}

export default Background;