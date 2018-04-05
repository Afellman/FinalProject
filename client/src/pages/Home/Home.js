import React , {Component} from 'react';
import styles from './home.css'

class Home extends Component {
  state = {
    opacity: 0
  }

  
  
  render(){
    // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{

    // ** Need to write a double interval function to bring in all the category
    // divs slowing... fade in? **
    let i = 0;
    let j = 0;
    const SHOW_CATEGORIES = setInterval(()=>{
      
    }, 100)

    // }}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}

    // This data will come from the api (api's). Hard coded for now.
    let categoriesDemo = ['astronomy', 'art', 'history', 'science', 'philosophy']

    return(
      <div>
        <div id="home-container" >
          <div id="tag">
            <h1>Umerse</h1>
          </div>
          <div id="home-categories" className="container">
            <div className="row">
            {/* Mapping through all the given categories and building divs for them */}
            {categoriesDemo.map((category)=> {
              return (
                <div styl={this.state.opacity} className="category-col col-md-3"><div><h3>{category}</h3></div></div>
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