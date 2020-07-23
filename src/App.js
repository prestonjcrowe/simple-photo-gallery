import React, { Component } from "react";
import PhotoGallery from "./components/PhotoGallery.js";
import "./App.scss";

const INDEX_URL = "https://pcrowe-photography.s3.amazonaws.com/index.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    };
  }

  componentDidMount() {
    fetch(INDEX_URL)
      .then((res) => res.json())
      .then((json) => {
        let photos = json
          .map((p) => ({
            src: p.url,
            width: p.w,
            height: p.h,
            title: p.caption,
            date: p.date,
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        this.setState({ photos: photos });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="Container">
          <div className="Content">
            <div className="GalleryTitle">photography</div>
            <div className="GallerySubTitle">
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.prestoncrowe.com"
              >
                preston crowe
              </a>{" "}
              takes photos
            </div>
            <PhotoGallery photos={this.state.photos} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
