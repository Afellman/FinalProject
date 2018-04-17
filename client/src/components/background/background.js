import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';
import styles from './background.css';
import Unsplash from '../../utils/unsplash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import anime from 'animejs';

class Background extends Component {

  constructor(props) {
    super(props)
    this.state = {
      background: '',
      category: '',
      opacity : 1
    }
  }


  render() {
    console.log(this.props.image)
    return (
      <div>
        <img  id="background" onLoad={this.props.fade} src={this.props.image || 'https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c8df2caeb47cf27eae792735019e072f&auto=format&fit=crop&w=1350&q=80'} className={this.props.trigger}/> 
      </div>
    )
  }
}

export default Background;