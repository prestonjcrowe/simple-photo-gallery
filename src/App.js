import React, { Component } from 'react';
import Header from './components/Header.js';
import Project from './components/Project.js';
import ThemeButton from './components/ThemeButton.js';
import './App.scss';

// Import config and themes
import config from './config.json';
import themes from './themes.json';

const DEFAULT_THEME = 'dark';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: DEFAULT_THEME
    }

    this.toggleTheme = this.toggleTheme.bind(this);
    this.setTheme = this.setTheme.bind(this);
  }

  componentDidMount() {
    const theme = localStorage.getItem('theme');
    if (theme && (theme === 'dark' || theme === 'light')) {
      this.setTheme(theme);
    } else {
      this.setTheme(DEFAULT_THEME);
    }
  }

  setTheme(theme) {
    this.setState({theme: theme});
  
    Object.keys(themes[theme]).map(key => {
      const value = themes[theme][key];
      document.documentElement.style.setProperty(key, value);
      localStorage.setItem('theme', theme)
      return null;
    });
  }

  toggleTheme() {
    const oldTheme = this.state.theme;
    const newTheme =  oldTheme === 'dark' ? 'light' : 'dark';
  
    this.setTheme(newTheme);
  }

  render() {
    const { bio, tags, projects } = config;
    const { theme } = this.state;
  
    return (
        <div className="App">
          <div className="Container">
            <ThemeButton theme={theme} toggleTheme={this.toggleTheme}/>
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
}

export default App;
