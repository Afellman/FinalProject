import React , {Component} from 'react';
import styles from './home.css'
import API from '../../utils/unsplash';
import SciMuse from '../../utils/sciencemuseum';
import Category from '../../components/category';
import {Motion, spring} from 'react-motion';
import Background from '../../components/background';
import mojs from 'mo-js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

class Home extends Component {

  state = {
    categoryTransform: `1`,
    level: 0,
    categories : [],
    backgound: ``,
  }

  // Random Number generator
  getRandomNum = (num) => {
    return Math.floor(Math.random() * num);

  }
  componentWillMount() {
    let categoriesDemo = ['Astronomy', 'Art', 'Technology', 'Classics', 'Medicine'];
    this.state.categories = categoriesDemo;
    // calling function to display starting image
    
  }
  
  componentDidMount(){
    
    // starting the category bobble effect
  }
  

  
  // Silly function to make the category divs bobble
  
  
  // sets the background image with the given image parameter
  setBg = (image) => {
      this.state.backgound = `url(${image})`
    }
    
    // gets an image from Unsplash and calls setBg with that image
    getBgImage = (keyword) => {
      //  Getting background image based on keyword.
      API.getPhotoByKeyword(keyword)
      .then((data)=>{
        
        let randomNum = this.getRandomNum(10)
        let image = data.data.results[randomNum].urls.full
        this.setBg(image)
      })
      
    }
    // Function to explode the category with animation

    explodeBubble = (element) => {
      console.log(element)
      element.style.transition = ".5s ease-out"
      element.style.transform = "scale(1.5)"
      setTimeout(()=> {
        element.style.transition = ".3s ease-out"
        element.style.transform = "scale(0)"

      },400)
      // this.setState({categoryTransform: 2})
      
      // const burst = new mojs.Burst({
      //   radius: { 0: 360}
      // }).play()
      // this.state.categoryTransform
    }

    changeLevel = (e) => {
      let target = e.target;
      let category = e.target.textContent
      this.explodeBubble(target)
      // demo new categories
      let categoriesDemo2 = ['blah', 'blah', 'blah', 'blah'];
      this.getBgImage(category)
      // waiting .8 seconds still updating the state to avoid some weird errors
      setTimeout(()=> {
        this.setState({categories: categoriesDemo2 })
      },1000)

      SciMuse.getInfoAge()
    }
  
  render(){

    // This data will come from the api (api's). Hard coded for now.
    
    return(
      <div>
          <Background opacity={this.state.bgOpacity} image={this.state.backgound}/>
        <div id="home-container">
          <div id="home-categories">
            <div>
            {/* Mapping through all the given categories and building divs for them */}
            {this.state.categories.map((category, index)=> {
              return (
                <Category key={index} transform={this.state.categoryTransform} text={category} changeLevel={this.changeLevel}/>
              )
            })}
            </div>
          </div>
        </div>
       </div>
    )
  }
}

export default Home;