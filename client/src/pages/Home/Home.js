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
    categoryTransform: ``,
    level: 0,
    categories : ['Astronomy', 'Art', 'Technology', 'Classics', 'Medicine'],
    backgound: ``,
    category: ["computing-&-data-processing", "telecommunication", "aeronautics", "photographic%20technology", "radio-communication", "orthopaedics", "space-technology" ],
    showEndpoint: false,
    endpoint:{}
  }

  // Random Number generator
  getRandomNum = (num) => {
    return Math.floor(Math.random() * num);

  }

  
  // sets the background image with the given image parameter
  setBg = (image) => {
      this.state.backgound = `url(${image})`
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
        let randomNum = this.getRandomNum(data.data.results.length)
      image = data.data.results[randomNum].urls.full
    } else {
      image = 'https://images.unsplash.com/photo-1465146633011-14f8e0781093?ixlib=rb-0.3.5&s=709c4a0d39f08a5558dac7e059debb05&auto=format&fit=crop&w=1050&q=80'  
    }
    this.setBg(image)
    })
    
  }
    // Function to explode the category with animation

    explodeBubble = (element) => {
      // **** Need to reset scale for new bubbles. Maybe set in state? 
      element.style.transition = ".5s ease-out"
      element.style.transform = "scale(1.5)"
      setTimeout(()=> {
        // element.style.transform = "scale(0)"
        this.setState({categoryTransform: 'scale(0)'})
      },400)
      
    }

    changeLevel = (e) => {
      let target = e.target;
      let category = e.target.textContent
      this.explodeBubble(target)
      console.log(category)
      
      this.getBgImage(category)
      // returns new bubbles of subcategories
      // ** Need to save previous bubble to search on aka "Go back"
      // Wiki.getWikiByArticle(category).then(res=> {
      //   setTimeout(()=> {
      //     this.setState({categories: res.data.subCategories, categoryTransform: 'scale(1)'})

      //   },500)
          
      //   console.log(res.data)
      // })
      let results = SciMuse.getSciMuse(this.state.category[0]);
      console.log(this.state.category[0])

      console.log(results);
      let museumObj = {
        name: results.data[0].attributes.summary.title,
        description: results.data[0].attributes.description[0].value,
        img: results.data[0].attributes.multimedia[0].processed.large_thumbnail.location
      }
      this.setState({})
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
                <Category key={index} transition={this.state.categoryTransform} text={category} changeLevel={this.changeLevel}/>
              )
            })}
            {this.state.showEndpoint ? 
              
        
              <Endpoint 
              />
          
            : null}
            </div>
          </div>
        </div>
       </div>
    )
  }
}

export default Home;