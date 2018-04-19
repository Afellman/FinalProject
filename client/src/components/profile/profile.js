import React, { Component } from 'react';
import styles from './profile.css';
import Collapse from '../../components/collapse';
import db from '../../utils/database';
import auth from '../../utils/auth'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    articles: []
  }
  
  componentDidMount() {
    auth.checkLogged()
    .then(res=> {
      if (res) {
        auth.getUser(res.data['_id'])
        .then((result)=> {
          console.log(result, "res res res res")
          this.setState({articles : result.data})
        })
      }
    })
  }
  render() {
    return (
      <div className="outer">
          <h3 className= "name"> {this.props.user}'s Saved Articles</h3>
        <div>
          <div id="accordion">
          {this.state.articles.map((element, i)=> {
            return (
            <Collapse articles={element} index={i}/>
          )
          })
          }
          </div>
        </div>
      </div>
    )
}
}
export default Profile;