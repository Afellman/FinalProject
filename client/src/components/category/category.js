import React from 'react';
import styles from './category.css';

const Category = (props) => {
  return (
    <div onClick={props.changeLevel} className={`category-col`}><div className="bubble" style={{transform: props.transition}}><h3>{props.text}</h3></div></div>
  )
}

export default Category; 

