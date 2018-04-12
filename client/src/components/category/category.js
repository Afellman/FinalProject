import React, { Component } from 'react';
import styles from './category.css';

class Category  extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  
  render(){
    return (
      <div onClick={this.props.changeLevel} id={`bubble-${this.props.index}`} data-duration="100ms" className={`category-col`}><div className="bubble" style={{transform: this.props.transition}}><h3>{this.props.text}</h3></div></div>
    )
  }
}
export default Category; 

