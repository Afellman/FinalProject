import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';
import styles from './background.css';
import Unsplash from '../../utils/unsplash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

class Background extends Component {
  constructor(props) {
    super(props)
    this.state = {
      background: '',
      showBg : true,
      category: ''
    }
}
  
componentWillReceiveProps(nextProp){
  console.log(nextProp)
  if (nextProp.trigger != this.state.category) {
    this.setState({showBg : false})
    this.getBgImage(nextProp.trigger)
  }
}

  // gets an image from Unsplash and calls setBg with that image
  getBgImage = (keyword) => {
    let image;
    //  Getting background image based on keyword.
    // *** NEED TO SET FALLBACK IMG INCASE NOTHING IS RETURNED
    Unsplash.getPhotoByKeyword(keyword)
    .then((data)=>{
      console.log(data)
      if (data.data.total){
      // let randomNum = this.getRandomNum(10)
      image = data.data.results[0].urls.full
    } else {
      image = 'https://images.unsplash.com/photo-1465146633011-14f8e0781093?ixlib=rb-0.3.5&s=709c4a0d39f08a5558dac7e059debb05&auto=format&fit=crop&w=1050&q=80'  
    }
    this.setState({backgound: `url(${image})`, category: this.props.trigger, showBg: true})
    })
    
  }

  render(props) {
    return (
        <div id="background" style={{backgroundImage: this.state.backgound}} className={this.props.trigger}></div>
    )
  }
}

export default Background;