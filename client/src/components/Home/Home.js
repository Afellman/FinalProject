// TODO ************
// - Sync transition so image loads with bubbles
// - Arrange bubbles nicer around endpoint
// - Save and delete routes

import React, {Component} from 'react';
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

import Endpoint from '../../components/endpoint'
import EndpointItem from '../../components/endpoint'
import Nav from '../../components/Nav'
import auth from '../../utils/auth'

let image;
class Home extends Component {

  state = {
    categoryTransform: ``,
    firstRound: true,
    level: 0,
    categories: [],
    currentCategory: 'home',
    backdrop_start: false,
    backgound: ``,
    showProfile: false,
    showEndpoint: false,
    endpoint: [],
    path: '',
    showChoice: true,
    savedArticles: [],
    user: {},
    articles: []
  }

  componentDidMount() {
    auth.checkLogged()
      .then(res=> {
        if (res) {
          this.setState({user: res.data})
        }
      })
  }

  getBgImage = (keyword) => {
    //  Getting background image based on keyword.
    Unsplash
      .getPhotoByKeyword(keyword)
      .then((data) => {
        if (data.data.total) {
          let randomNum = Math.floor(Math.random() * data.data.results.length);
          image = data.data.results[randomNum].urls.full
        } else {
          image = 'https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?ixlib=rb-0.3.5&ixid' +
              '=eyJhcHBfaWQiOjEyMDd9&s=c8df2caeb47cf27eae792735019e072f&auto=format&fit=crop&w=' +
              '1350&q=80'
        }
        this.setState({background: image});
      })
  }

  fadeInCategorys = (e) => {
    this.setState({showBubbles: true})
    console.log('fadeInCategories')
    var maxElements = this.state.categories.length
    var duration = 6000;
    var toAnimate = [];
    var radius = window.innerWidth < window.innerHeight
      ? window.innerWidth
      : window.innerHeight;
    let bubbleArray = [];
    console.log(bubbleArray)
    var animate = (el, i) => {
      console.log('animate')
      var angle = Math.random() * Math.PI * 2;
      anime({
        targets: el,
        translateX: () => {
          var angle = (i / (this.state.categories.length / 2)) * Math.PI
          var distance = radius - 80;
          return 0,
          Math.cos(angle) * distance
        },
        translateY: () => {
          var angle = (i / (this.state.categories.length / 2)) * Math.PI
          var distance = radius / 2 - 80;
          return 0,
          Math.sin(angle) * distance
        },
        scale: [
          {
            value: [
              0, 1
            ],
            duration: 400,
            easing: 'easeOutBack'
          }, {
            value: 0,
            duration: 400,
            delay: duration,
            easing: 'easeInBack'
          }
        ],
        offset: (duration / maxElements) * i,
        duration: duration,
        easing: 'easeOutSine',
        loop: true
      });
    }
    anime({
      targets: '#background, .carousel',
      opacity: 1,
      duration: 3000,
      complete: () => {
        console.log('fade in complete')
        this.setState({backdrop_start: false})
      }
    });
    setTimeout(() => {
      for (let i = 0; i < this.state.categories.length; i++) {
        bubbleArray.push(document.getElementById(`bubble-${i}`))
      }
      bubbleArray.forEach(animate)
    }, 500)
  }

  fadeOut = () => {
    let i = 0
    anime({targets: '#background, .category-col, .carousel ', opacity: 0, duration: 2000});
  }

  transition = () => {
    let category = this.state.currentCategory;
    if (this.state.path == 'wiki') {
      console.log('wiki path')
      Wiki
        .getWikiByArticle(category)
        .then(res => {
          console.log(res)
          let wikiObj = {
            name: category,
            description: res.data.body,
            img: res.data.img
          }
          this.setState({categories: res.data.subCategories, endpoint: [wikiObj]})
          if (!this.state.firstRound) {
            this.setState({showEndpoint: true})
          }
          setTimeout(() => {
            this.fadeInCategorys()

          }, 1000)
        })

    } else {
      console.log(category)
      //Calls function using a specific category in the science museum api
      SciMuse
        .getSciMuse(category)
        .then(data => {
          let array = [];
          data
            .data
            .data
            .forEach(element => {
              let museumObj = {
                name: element.attributes.summary_title,
                description: element.attributes.description[0].value,
                img: element.attributes.multimedia[0].processed.large_thumbnail.location,
                link: element.links.self
              }
              array.push(museumObj)
            });
          this.setState({endpoint: array})
          if (!this.state.firstRound) {
            this.setState({showEndpoint: true})
          }
          setTimeout(() => {
            this.fadeInCategorys()

          }, 1000)
        })
    }
  }

  // ----------------------------------------------------------------- changing
  // the level after a category click --------------------------
  changeLevel = (e) => {
    this.setState({showBubbles: false})
    if (this.state.firstRound) {
      this.setState({showChoice: false})
      this.fadeInCategorys()
    } else {
      this.fadeOut()
      this.setState({backdrop_start: true})
      let target = e.target;
      let category = e.target.textContent
      this.setState({currentCategory: category})
      // console.log(category)
      this.getBgImage(category)
      // returns new bubbles of subcategories ** Need to save previous bubble to
      // search on aka "Go back"
    }
    this.setState({firstRound: false})
  }

  showProfile = () => {
    if(!this.state.showProfile){
      this.setState({showProfile: true})

    }else {
      this.setState({showProfile: false})
    }
  }

  // ------------------------------------------------------------

  render() {
    return (
      <div>
        <Nav showProfile={this.showProfile}/> 
        {this.state.backdrop_start
          ? <Backdrop/>
          : null}
        <Background
          fade={this.transition}
          image={this.state.background}
          trigger={this.state.currentCategory}/>
        <div id="home-container">
        <ReactCSSTransitionGroup
          transitionName="side-bar"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {this.state.showProfile
            ? <Profile articles={this.state.articles} user={this.state.user.username}/>
            : null}
            </ReactCSSTransitionGroup>
          <div id="home-categories">
            {this.state.showBubbles
              ?
              // Mapping through all the given categories and building divs for them
              this
                .state
                .categories
                .map((category, index) => {
                  if(index > 12) {
                    return
                  }
                  return (<Category
                    key={index}
                    index={index}
                    angle={index}
                    transition={this.state.categoryTransform}
                    text={category}
                    changeLevel={this.changeLevel}/>)
                })
              : null}
            {this.state.showChoice
              ? <div id='initial-choice'>
                  <div
                    onClick={() => {
                    this.setState({
                      showBubbles: true,
                      path: "wiki",
                      categories: ['Astronomy', 'Art', 'Technology', 'Classics', 'Medicine']
                    })
                    setTimeout(() => this.changeLevel(), 500)
                  }}
                    className="wiki btn">
                    <h3>Wikipedia</h3>
                  </div>
                  <div
                    onClick={() => {
                    this.setState({
                      showBubbles: true,
                      path: "scimuse",
                      categories: [
                        "Computing-&-Data-Processing",
                        "Telecommunications",
                        "Aeronautics",
                        "Photographic-Technology",
                        "Radio-Communication",
                        "Orthopaedics",
                        "Space-Technology"
                      ]
                    })
                    setTimeout(() => this.changeLevel(), 500)
                  }}className='scimuse btn'>
                    <h3>Science Museum</h3>
                  </div>
                </div>
              : null}
            {this.state.showEndpoint
              ? <Endpoint>
                  {this
                    .state
                    .endpoint
                    .map((element, index) => {
                      return (
                        <EndpointItem museumObj={element} user={this.state.user['_id']} index={index}></EndpointItem>
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

