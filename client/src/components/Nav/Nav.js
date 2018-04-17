import React, {Component} from "react";
import "./Nav.css";
import Logout from '../logout-btn';
import { HamburgerVortex } from 'react-animated-burgers'

class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isActive: false
    }

    this.toggleButton = this
      .toggleButton
      .bind(this)
  }

  toggleButton() {
    this.props.showProfile()
    this.setState({
      isActive: !this.state.isActive
    })
  }
  render() {

    return (
      <nav className="navbar navbar-inverse navbar-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="/" className="navbar-brand">
              Final Project
            </a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <Logout/>
            <HamburgerVortex
              
              isActive={this.state.isActive}
              toggleButton={this.toggleButton}
              buttonColor="black"
              barColor="white"/>
          </ul>
        </div>
      </nav>
    )
  }
}
export default Nav;