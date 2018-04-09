import React , {Component} from 'react';
import styles from './home.css'
import Unsplash from '../../utils/unsplash';
import SciMuse from '../../utils/sciencemuseum';
import Category from '../../components/category';
import {Motion, spring} from 'react-motion';
import Background from '../../components/background';
import mojs from 'mo-js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import Wiki from '../../utils/wikiapi';
import Endpoint from '../../components/endpoint';

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
      // *** NEED TO SET FALLBACK IMG INCASE NOTHING IS RETURNED
      Unsplash.getPhotoByKeyword(keyword)
      .then((data)=>{
        
        let randomNum = this.getRandomNum(10)
        let image = data.data.results[randomNum].urls.full
        this.setBg(image)
      })
      
    }
    // Function to explode the category with animation

    explodeBubble = (element) => {
      // **** Need to reset scale for new bubbles. Maybe set in state? 
      console.log(element)
      element.style.transition = ".5s ease-out"
      element.style.transform = "scale(1.5)"
      setTimeout(()=> {
        element.style.transition = ".3s ease-out"
        element.style.transform = "scale(0)"

      },400)
    }

    changeLevel = (e) => {
      let target = e.target;
      let category = e.target.textContent
      this.explodeBubble(target)
      // demo new categories
      
      this.getBgImage(category)
      // returns new bubbles of subcategories
      // ** Need to save previous bubble to search on aka "Go back"
      Wiki.getWikiByArticle(category).then(res=> {
        setTimeout(()=> {
          this.setState({categories: res.data.subCategories })
          
          },1000)
        // console.log(res.data)
      })
      // SciMuse.getInfoAge()
    }
  
  render(){

    
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
            {this.state.endpoints ? 
              this.state.endpoints.map((object, index) => {
              return(
              <Endpoint/>
            )})
            : null}
            </div>
          </div>
        </div>
       </div>
    )
  }
}

export default Home;