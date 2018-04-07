import React from 'react';
import styles from './category.css'
import {Motion, spring} from 'react-motion'
const Category = (props) => {
  
  return (
    <Motion defaultStyle={{x: 0}} style={{x: spring(1), stiffness: 120, damping: 17}}>
      {value => <div style={{transform: `scale(${value.x})`}} onClick={()=>{props.changeLevel(props.text)}}className="category-col col-md-3"><div><h3>{props.text}</h3></div></div>}
  </Motion>
  )
}

export default Category; 

