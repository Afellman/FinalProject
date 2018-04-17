import React, { Component } from 'react';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Start from './pages/Start/Start';
import Nav from "./components/Nav";
import Profile from './components/profile';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
      
        <Switch>
          <Route exact path="/" component={Start} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
    )
  }
}

export default App;
