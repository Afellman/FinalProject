import React , {Component} from 'react';
import styles from './home.css'
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
    currentCategory: 'home'
  }

  // Random Number generator -----------------------

  getRandomNum = (num) => {
    return Math.floor(Math.random() * num);
  }
  // ------------------------------------------


    // Function to explode the category with animation -----------------

    explodeBubble = (element) => {
      element.style.transition = ".5s ease-out"
      element.style.transform = "scale(1.5)"
      setTimeout(()=> {
        // element.style.transform = "scale(0)"
        this.setState({categoryTransform: 'scale(0)'})
      },400)
    }
    // -----------------------------------------------------------------

    // changing the level after a category click --------------------------
    changeLevel = (e) => {
      let target = e.target;
      let category = e.target.textContent
      console.log(category)
      this.setState({currentCategory: category})
      this.explodeBubble(target)
      // returns new bubbles of subcategories
      // ** Need to save previous bubble to search on aka "Go back"
      Wiki.getWikiByArticle(category).then(res=> {
        setTimeout(()=> {
          this.setState({categories: res.data.subCategories, categoryTransform: 'scale(1)'})
        },500)
        console.log(res.data)
      })
      // SciMuse.getInfoAge()
    }
    // ------------------------------------------------------------
  
  render(){
    return(
      <div>
        <Background opacity={this.state.bgOpacity} trigger={this.state.currentCategory} image={this.state.backgound}/>
        <div id="home-container">
          <div id="home-categories">
            <div>
            {/* Mapping through all the given categories and building divs for them */}
            {this.state.categories.map((category, index)=> {
              return (
                <Category key={index} transition={this.state.categoryTransform} text={category} changeLevel={this.changeLevel}/>
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