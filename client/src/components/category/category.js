import React from 'react';
import styles from './category.css'

const Category = (props) => {
  
  return (
    <div style={{transform: props.transform}} onClick={()=>{props.changeLevel(props.text)}}className="category-col col-md-3"><div><h3>{props.text}</h3></div></div>
  )
}

export default Category; 