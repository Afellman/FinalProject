import React , {Component} from 'react';
import styles from './home.css'
import API from '../../utils/unsplash';
import SciMuse from '../../utils/sciencemuseum';
import Category from '../../components/category';
import {Motion, spring} from 'react-motion';
import Background from '../../components/background';

class Home extends Component {

  state = {
    transform: ``,
    level: 0,
    categories : [],
    backgound: ``,
  }

  // Random Number generator
  getRandomNum = (num) => {
    return Math.floor(Math.random() * num);

  }
  componentWillMount() {
    // calling function to display starting image
    this.displayStartingImage()
  }
  
  componentDidMount(){
    let categoriesDemo = ['Astronomy', 'Art', 'Technology', 'Classics', 'Medicine'];
    this.state.categories = categoriesDemo;
    // starting the category bobble effect
    this.categoryBobble()
    
  }
  
  // this function chooses a random photo from the array and calls the setBG function
  // passing in the image
  displayStartingImage = () => {
    //   let bgArray = [
      //     'https://images.unsplash.com/photo-1514905552197-0610a4d8fd73?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI0MDEwfQ&s=cf52b12a9b3bdea87b1c88bf98e4ff15',
      //     'https://images.unsplash.com/reserve/NnDHkyxLTFe7d5UZv9Bk_louvre.jpg?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI0MDEwfQ&s=a5e3a07a8a665d62b0824086d720b4c7',
      //     'https://images.unsplash.com/photo-1482245294234-b3f2f8d5f1a4?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI0MDEwfQ&s=985caea49b2cc32128c6448df75e68a9',
      //     'https://images.unsplash.com/photo-1505416795390-0beeb662b1f2?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI0MDEwfQ&s=bd1d145a7cbd63bb213c23e7c576e56f',
      //     'https://images.unsplash.com/photo-1514905552197-0610a4d8fd73?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI0MDEwfQ&s=cf52b12a9b3bdea87b1c88bf98e4ff15',
      //     'https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI0MDEwfQ&s=95ba2ca46a94a3201eb50fcd7ab0d44c'
      //   ]
      //   let randomNum = this.getRandomNum(5);
      //  this.setBg(bgArray[randomNum])
    }
    
    // Silly function to make the category divs bobble
    categoryBobble = () => {
      let bobble = 0;
      let full = false;
      let BOBBLE_CATEGORIES = setInterval(()=> {
        this.setState({transform: `translateY(${bobble}px)`})
        if (bobble < 8 && !full) {
          bobble = bobble + 0.2
        } else if (bobble > 8) {
          full = true;
          bobble = bobble - 0.2
        } else {
          bobble = bobble - 0.2
          if (bobble < 0) {
            full = false;
          }
        }
<<<<<<< HEAD
      }``
    },50);
  }

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
=======
      },50);
    }
    
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
>>>>>>> master
      
    }
    
    
    changeLevel = (category) => {
      let categoriesDemo2 = ['blah', 'blah', 'blah', 'blah'];
      console.log(category)
      this.getBgImage(category)
      this.setState({categories: categoriesDemo2 })
      SciMuse.getInfoAge()
    }
  
  render(){

    // This data will come from the api (api's). Hard coded for now.
    
    return(
      <div>
        <Background opacity={this.state.bgOpacity} image={this.state.backgound}/>
        <div id="home-container" classN>
          <div id="home-categories" className="container">
            <div className="row">
            {/* Mapping through all the given categories and building divs for them */}
            {this.state.categories.map((category)=> {
              return (
                <Category transform={this.state.transform} text={category} changeLevel={this.changeLevel}/>
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