import React from 'react';
import styles from './category.css';
import {Motion, spring} from 'react-motion';

const Category = (props) => {
  return (
    <div onClick={props.changeLevel} className="category-col"><div><h3>{props.text}</h3></div></div>
  )
}

export default Category; 

