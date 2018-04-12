import React , {Component} from 'react';
import styles from './home.css';
import SciMuse from '../../utils/sciencemuseum';
import Category from '../../components/category';
import Background from '../../components/background';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import Wiki from '../../utils/wikiapi';
import Endpoint from '../../components/endpoint';
import anime from 'animejs';
import Unsplash from '../../utils/unsplash';
import Backdrop from '../../components/backdrop'

let image;
class Home extends Component {

  state = {
    categoryTransform: ``,
    level: 0,
    categories : ['Astronomy', 'Art', 'Technology', 'Classics', 'Medicine'],
    background: ``,
    currentCategory: 'home',
    backdrop_start: false
  }

    
    componentDidMount() {
      this.fadeInCategorys()
      this.fadeInBackground()
      // this.arrangeBubbles()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    arrangeBubbles = () => {
      anime({
        targets: '.category-col',
        translateX: function(e){
          return 200
        },
        translateY: function(){
        },
        rotate: 180,
        duration: function(target) {
          // Duration based on every div 'data-duration' attribute
          return target.getAttribute('data-duration');
        },
        delay: function(target, index) {
          // 100ms delay multiplied by every div index, in ascending order
          return index * 100;
        },
        elasticity: function(target, index, totalTargets) {
          // Elasticity multiplied by every div index, in descending order
          return 200 + ((totalTargets - index) * 200);
        }
      });
    }


  getBgImage = (keyword) => {
    
    //  Getting background image based on keyword.
    Unsplash.getPhotoByKeyword(keyword)
    .then((data)=>{
      if (data.data.total){
      let randomNum = Math.floor(Math.random() * data.data.results.length);
      image = data.data.results[randomNum].urls.full
    } else {
      image = 'https://images.unsplash.com/photo-1465146633011-14f8e0781093?ixlib=rb-0.3.5&s=709c4a0d39f08a5558dac7e059debb05&auto=format&fit=crop&w=1050&q=80'
    }
    this.setState({background: image});
    })
    
  }
  
  fadeInBackground = () =>{
    anime({
      targets: '#background',
      opacity: 1,
      duration: 7000,
      complete: ()=> {
        this.setState({backdrop_start : false})
      }
    });
  }

  fadeInCategorys = (e) => {
    console.log('fade in')
    anime({
      targets: '.category-col',
      scale: 1,
      duration: 6000,
    });
  }

  fadeOut = () => {
    let i = 0
    anime({
      targets: '#background',
      opacity: 0 ,
      duration: 3000,
      complete: (ani)=>{
        if(ani.completed) {
          this.fadeInCategorys()
        }
      }
    });         
    anime({
      targets: '.category-col',
      scale: 0,
      duration: 3000,
    });
      
    }
  
    

    // -----------------------------------------------------------------

    // changing the level after a category click --------------------------
    changeLevel = (e) => {
      let target = e.target;
      let category = e.target.textContent
      // console.log(category)
      this.getBgImage(category)
      this.setState({backdrop_start : true})
      this.fadeOut()
      // returns new bubbles of subcategories
      this.setState({currentCategory: category})
      // ** Need to save previous bubble to search on aka "Go back"
      Wiki.getWikiByArticle(category).then(res=> {
        setTimeout(()=> {
          this.setState({categories: res.data.subCategories, categoryTransform: 'scale(1)'})
        },500)
      })
      // SciMuse.getInfoAge()
    }

    
  
    // ------------------------------------------------------------
  
    
  render(){


    return(
      <div>
          {this.state.backdrop_start ? <Backdrop/> : null}
          <Background  fade={this.fadeInBackground} image={this.state.background} trigger={this.state.currentCategory}/>
        <div id="home-container">
          <div id="home-categories">
            <div id="bubbles-parents">
            {/* Mapping through all the given categories and building divs for them */}
            {this.state.categories.map((category, index)=> {
              return (
                <Category key={index} index={index} transition={this.state.categoryTransform} text={category} changeLevel={this.changeLevel}/>
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