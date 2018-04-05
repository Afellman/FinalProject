import React , {Component} from 'react';
import styles from './home.css'
import API from '../../utils/unsplash';
let bg;
class Home extends Component {
  state = {
    transform: ``
    
  }

  componentWillMount() {
   this.getBgImage()
  }
  componentDidMount(){
  // console.log(this.state.backgroundImage)
    let bobble = 0;
    let full = false;
    let BOBBLE_CATEGORIES = setInterval(()=> {
      this.setState({transform: `translateY(${bobble}px)`})
      if (bobble < 5 && !full) {
        bobble = bobble + 0.1
      } else if (bobble > 5) {
          full = true;
          bobble = bobble - 0.1
        }
        else {
          bobble = bobble - 0.1
          if (bobble < 0) {
            full = false;
          }
      }
    },50);

  }

  getBgImage = () => {
     // Getting background image based on keyword.
    //  API.getPhotoByKeyword("museum")
    //  .then((data)=>{
    //    let randomNum = Math.floor(Math.random() * 10);
    //    let image = data.data.results[randomNum].urls.full
    //    console.log(data.data.results[randomNum].urls.full)
    //    bg = `url(${image})`
       // Favs - 
       // 1. https://images.unsplash.com/photo-1514905552197-0610a4d8fd73?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI0MDEwfQ&s=cf52b12a9b3bdea87b1c88bf98e4ff15
    //  })
     bg = `url(https://images.unsplash.com/photo-1514905552197-0610a4d8fd73?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI0MDEwfQ&s=cf52b12a9b3bdea87b1c88bf98e4ff15)`
  }
  
  render(){
    // This data will come from the api (api's). Hard coded for now.
    let categoriesDemo = ['Astronomy', 'Art', 'History', 'Science', 'Philosophy'];
    return(
      <div>
        <div id="filter" style={{backgroundImage: bg}}></div>
        <div  id="home-container">
          <div id="tag">
            <h1>Splash</h1>
          </div>
          <div id="home-categories" className="container">
            <div className="row">
            {/* Mapping through all the given categories and building divs for them */}
            {categoriesDemo.map((category)=> {
              return (
                <div style={this.state} className="category-col col-md-3"><div><h3>{category}</h3></div></div>
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