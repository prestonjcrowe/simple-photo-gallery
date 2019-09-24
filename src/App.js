import React, { Component } from 'react';
import Header from './components/Header.js';
import Project from './components/Project.js';
import './App.scss';

// Import Config 
import config from './config.json';

function App() {
  const { bio, tags, projects } = config;

  return (
      <div className="App">
        <div className="Container">
          <Header config={config}/>
          <div className="Bio">{bio}</div>
          <div className="TagContainer">
            {
              tags.map((tag, i) => {
                return (<div className="Tag" key ={i}>{ tag }</div>);
              })
            }
          </div>
          <h3>Projects</h3>
          {
              projects.map((d, i) => {
                return (<Project data={d} key ={i}/>);
              })
            }
        </div>
      </div>
  );
}


export default App;
