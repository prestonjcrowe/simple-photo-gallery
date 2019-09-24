import React, { Component } from 'react';
import Header from './components/Header.js';
import Bio from './components/Bio.js';
import Projects from './components/Projects.js';
import Photography from './components/Photography.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.scss';

class  App extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      selected: "about"
    }
  }

  handleMenuClick(linkName) {
    this.setState({selected: linkName});
  }

  render() {
    const navLinks = [
      <Link to="/" key={0} onClick={() => this.handleMenuClick("about")}>about</Link>,
      <Link to="/projects/" key={1} onClick={() => this.handleMenuClick("projects")}>projects</Link>,
      <Link to="/photography/" key={5} onClick={() => this.handleMenuClick("photography")}>photography</Link>
    ];
  
    return (
      <Router>
        <div className="App">
          <div className="Container">
          <Header links={navLinks} selected={this.state.selected}/>
          <Route exact path="/" component={Bio} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/photography" component={Photography} />
  
          </div>
  
        </div>
    </Router>
  
  
    );
  }
}

export default App;
