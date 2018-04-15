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
    level: 0,
    categories : ['Astronomy', 'Art', 'Technology', 'Classics', 'Medicine'],
    currentCategory: 'home',
    backdrop_start: false,
    backgound: ``,
    showProfile: false,
    category: ["computing-&-data-processing", "telecommunication", "aeronautics", "photographic%20technology", "radio-communication", "orthopaedics", "space-technology" ],
    showEndpoint: false,
    endpoint:{}
  }

    
    componentDidMount() {
      this.arrangeBubbles()
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
          console.log('arrange bubbles')
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
      this.arrangeBubbles()
      this.setState({backdrop_start : true})
      this.fadeOut()
      // returns new bubbles of subcategories
      this.setState({currentCategory: category})
      // ** Need to save previous bubble to search on aka "Go back"
      Wiki.getWikiByArticle(category).then(res=> {
        setTimeout(()=> {
          this.setState({categories: res.data.subCategories, categoryTransform: 'scale(1)'})

        },500)
          
        console.log(res.data)
      })
      //Calls function using a specific category in the science museum api
     SciMuse.getSciMuse(this.state.category[0]).then(data => {
       let museumObj = {
         name: data.data.data[0].attributes.summary_title,
         description: data.data.data[0].attributes.description[0].value,
         img: data.data.data[0].attributes.multimedia[0].processed.large_thumbnail.location,
         link: data.data.data[0].links.self
       }
       this.setState({endpoint: museumObj, showEndpoint: true})

     })
    }

    
  
    // ------------------------------------------------------------
    
  render(){
    return(
      <div>
          {this.state.backdrop_start ? <Backdrop/> : null}
          <Background  fade={this.fadeInBackground} image={this.state.background} trigger={this.state.currentCategory}/>
        <div id="home-container">
          <button className="btn" onClick = {()=>this.setState({showProfile: true})} id = "sidebar">Button</button>
          {this.state.showProfile ? <Profile />: null}
          <div id="home-categories">
            <div id="bubbles-parents">
            {/* Mapping through all the given categories and building divs for them */}
            {this.state.categories.map((category, index)=> {
              return (
                <Category key={index} index={index} transition={this.state.categoryTransform} text={category} changeLevel={this.changeLevel}/>
              )
            })}
            {this.state.showEndpoint ? (
              <Endpoint
              > 
                <EndpointItem
                  museumObj= {this.state.endpoint}>
                </EndpointItem>
              </Endpoint>
          
          ): null}
            </div>
          </div>
          
          
        </div>
       </div>
    )
  }
}

export default Home;