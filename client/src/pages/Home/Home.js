// TODO ************
// - Sync transition so image loads with bubbles
// - Arrange bubbles nicer around endpoint
// - Save and delete routes

import React , {Component} from 'react';
import styles from './home.css';
import SciMuse from '../../utils/sciencemuseum';
import Category from '../../components/category';
import Background from '../../components/background';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import Wiki from '../../utils/wikiapi';
import Profile from '../../components/profile';
import anime from 'animejs';
import Unsplash from '../../utils/unsplash';
import Backdrop from '../../components/backdrop'
import { Endpoint, EndpointItem } from '../../components/endpoint';
import { Row } from "../../components/Grid";

let image;
class Home extends Component {

  state = {
    categoryTransform: ``,
    firstRound : true,
    level: 0,
    categories : [],
    currentCategory: 'home',
    backdrop_start: false,
    backgound: ``,
    showProfile: false,
    showEndpoint: false,
    endpoint:{},
    path: ''
  }
    
    componentDidMount() {
      
      this.fadeInBackground()
      // this.arrangeBubbles()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

  getBgImage = (keyword) => {
    //  Getting background image based on keyword.
    Unsplash.getPhotoByKeyword(keyword)
    .then((data)=>{
      if (data.data.total){
      let randomNum = Math.floor(Math.random() * data.data.results.length);
      image = data.data.results[randomNum].urls.full
    } else {
      image = 'https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c8df2caeb47cf27eae792735019e072f&auto=format&fit=crop&w=1350&q=80'
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

    // Animations for fading in the bubbles and arranging them around the endpoint.
    console.log('fade in')
    anime({
      targets: '.category-col',
      translateX :  (e) => {
        let radius = (window.innerWidth / 2) + 200
        let index = e.getAttribute('data-angle')
        let width = (radius / 2)
        let angle = (index / (this.state.categories.length /2 )) * Math.PI
        return ((radius/ 1.6) * Math.cos(angle )) - 150;
        
      },
      translateY : (e) => {
        let radius = (window.innerWidth / 2) + 200
        let index = e.getAttribute('data-angle')
        let width = (radius / 2)
        let angle = (index / (this.state.categories.length / 2)) * Math.PI
        return ((radius/3)  * Math.sin(angle));
      },
      scale: 1,
      duration: 6000,
    });
    anime({
      targets: '.endpoint',
      scale: 1,
      duration: 2000,
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
      
            console.log('fade out')
            this.fadeInCategorys()

        }
      }
    });         
    anime({
      targets: '.category-col, .endpoint ',
      scale: 0,
      duration: 3000,
    });
      
    }
  
    

    // -----------------------------------------------------------------

    // changing the level after a category click --------------------------
    changeLevel = (e) => {
      if (this.state.firstRound) {
        this.fadeInCategorys()
        
      } else {
        this.fadeOut()
      let target = e.target;
      let category = e.target.textContent
      // console.log(category)
      this.getBgImage(category)
      this.setState({backdrop_start : true})
      // returns new bubbles of subcategories
      this.setState({currentCategory: category})
      // ** Need to save previous bubble to search on aka "Go back"
      if (this.state.path == 'wiki'){
        console.log('wiki path')
        Wiki.getWikiByArticle(category).then(res=> {
          console.log(res)
          let wikiObj = {
            name: category,
            description: res.data.body,
            img: res.data.img
          }
          this.setState({categories: res.data.subCategories, endpoint: wikiObj, showEndpoint: true})
        })

      } else {
        console.log(category)
        //Calls function using a specific category in the science museum api
      SciMuse.getSciMuse(category).then(data => {
        let museumObj = {
          name: data.data.data[0].attributes.summary_title,
          description: data.data.data[0].attributes.description[0].value,
          img: data.data.data[0].attributes.multimedia[0].processed.large_thumbnail.location,
          link: data.data.data[0].links.self
        }
        this.setState({endpoint: museumObj, showEndpoint: true})

      })
      }
    }
    this.setState({firstRound: false})
    }
    
  
    // ------------------------------------------------------------
    
  render(){
    return(
      <div>
         
          {this.state.backdrop_start ? <Backdrop/> : null}
          <Background fade={this.fadeInBackground} image={this.state.background} trigger={this.state.currentCategory}/>
        <div id="home-container">
          <button className="btn" onClick = {()=>this.setState({showProfile: true})} id = "sidebar">Button</button>
          {this.state.showProfile ? <Profile />: null}
          <div id="home-categories">
            {this.state.showBubbles ? 
            // Mapping through all the given categories and building divs for them
            this.state.categories.map((category, index)=> {
              return (
                <Category key={index} index={index} angle={index} transition={this.state.categoryTransform} text={category} changeLevel={this.changeLevel}/>
              )
            })
          : <div id='initial-choice'>
            <div onClick={()=> {
              this.setState({showBubbles: true, path: "wiki", categories : ['Astronomy', 'Art', 'Technology', 'Classics', 'Medicine']})
              setTimeout(()=>this.changeLevel(), 1000 )
              
              } 
              } className="wiki btn">
              <h3>Wikipedia</h3>
            </div>
            <div onClick={()=>{
              this.setState({showBubbles: true, path: "scimuse", categories :  ["computing-&-data-processing", "telecommunication", "aeronautics", "photographic%20technology", "radio-communication", "orthopaedics", "space-technology" ]})
              setTimeout(()=>this.changeLevel(), 1000 )
            }}className='scimuse btn'>
              <h3>Scimuse</h3>
            </div></div>
          }
            {this.state.showEndpoint ? (
              <Endpoint> 
                <EndpointItem
                  museumObj= {this.state.endpoint}>
                </EndpointItem>
              </Endpoint>
          
          ): null}
            </div>
          
          
        </div>
       </div>
    )
  }
}

export default Home;