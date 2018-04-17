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
    endpoint:[],
    path: '',
    showChoice: true
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
      targets: '#background, .endpoint',
      opacity: 1,
      duration: 7000,
      complete: ()=> {
        this.setState({backdrop_start : false})
      }
    });
  }

  fadeInCategorys = (e) => {
    
    this.setState({showBubbles: true})
    var maxElements = this.state.categories.length
    var duration = 6000;
    var toAnimate = [];
    var radius = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
    var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

    let bubbleArray = [];
    for (let i = 0; i < this.state.categories.length; i++) {
      bubbleArray.push(document.getElementById(`bubble-${i}`))
    } 
    
    var animate = (el, i)=> {
      var angle = Math.random() * Math.PI * 2;
      anime({
        targets: el,
        translateX: ()=> {
          var angle = (i / (this.state.categories.length /2 )) * Math.PI
          var distance = radius - 80;
          return 0, Math.cos(angle) * distance
        },
        translateY: ()=> {
          var angle = (i / (this.state.categories.length /2 )) * Math.PI
          var distance = radius /2 - 60;
         return 0, Math.sin(angle) * distance
        },
        scale: [
          {value: [0, 1], duration: 400, easing: 'easeOutBack'},
          {value: 0, duration: 400, delay: duration, easing: 'easeInBack'}
        ],
        offset: (duration / maxElements) * i,
        duration: duration,
        easing: 'easeOutSine',
        loop: true
      });
    }
  bubbleArray.forEach(animate)
  }

  fadeOut = () => {
    let i = 0
    anime({
      targets: '#background, .category-col, .endpoint ',
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
      targets: '#background, .category-col, .endpoint ',
      opacity: 0 ,
      duration: 3000,
      complete: (ani)=>{
        if(ani.completed) {
          console.log('fade out')
          this.fadeInCategorys()
        }
      }
    });     
      
    }
  
    

    // -----------------------------------------------------------------

    hideProfile = () => {
      this.setState({showProfile: false})
    }

    // changing the level after a category click --------------------------
    changeLevel = (e) => {
      this.setState({showBubbles: false})
      if (this.state.firstRound) {
        this.setState({showChoice: false})
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
          this.setState({categories: res.data.subCategories, endpoint: [wikiObj], showEndpoint: true})
        })

      } else {
        console.log(category)
        //Calls function using a specific category in the science museum api
      SciMuse.getSciMuse(category).then(data => {
        let array = [];
        data.data.data.forEach(element => {
          let museumObj = {
            name: element.attributes.summary_title,
            description: element.attributes.description[0].value,
            img: element.attributes.multimedia[0].processed.large_thumbnail.location,
            link: element.links.self
          }
          array.push(museumObj)
        });
        console.log(array, "array ****************************************")
      
        this.setState({endpoint: array, showEndpoint: true})

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
          <button className="btn" onClick = {()=>this.setState({showProfile: true})} id = "sidebar">My Saved Articles</button>
          {this.state.showProfile ? <Profile hideProfile = {this.hideProfile}  />: null}
          <div id="home-categories">
            {this.state.showBubbles ? 
            // Mapping through all the given categories and building divs for them
            this.state.categories.map((category, index)=> {
              return (
                <Category key={index} index={index} angle={index} transition={this.state.categoryTransform} text={category} changeLevel={this.changeLevel}/>
              )
            })
          : null }
          {this.state.showChoice ? <div id='initial-choice'>
            <div onClick={()=> {
              this.setState({showBubbles: true, path: "wiki", categories : ['Astronomy', 'Art', 'Technology', 'Classics', 'Medicine']})
              setTimeout(()=>this.changeLevel(), 500 )
              
              } 
              } className="wiki btn">
              <h3>Wikipedia</h3>
            </div>
            <div onClick={()=>{
              this.setState({showBubbles: true, path: "scimuse", categories :  ["computing-&-data-processing", "telecommunication", "aeronautics", "photographic%20technology", "radio-communication", "orthopaedics", "space-technology" ]})
              setTimeout(()=>this.changeLevel(), 500 )
            }}className='scimuse btn'>
              <h3>Scimuse</h3>
            </div></div>
            : null}
            {this.state.showEndpoint ? 
              <Endpoint> 
              {this.state.endpoint.map((element, index)=>{
                return (
                <EndpointItem
                  museumObj= {element}>
                </EndpointItem>
                )
              })}
              </Endpoint>
          
          : null}
            </div>
          
          
        </div>
       </div>
    )
  }
}



export default Home;