import React from "react";
import Gallery from "react-grid-gallery";

function Photography(props) {
  const IMAGES = [
    {
      src: "/photos/seattle_1.jpg",
      thumbnail:"/photos/seattle_1.jpg",
      caption: "jäke"
    },
    {
        src: "/photos/seattle_2.jpg",
        thumbnail:"/photos/seattle_2.jpg",
        caption: ""
      },
      {
        src: "/photos/seattle_3.jpg",
        thumbnail:"/photos/seattle_3.jpg",
        caption: ""
      },
      {
        src: "/photos/seattle_4.jpg",
        thumbnail:"/photos/seattle_4.jpg",
        caption: ""
      },
      {
        src: "/photos/seattle_5.jpg",
        thumbnail:"/photos/seattle_5.jpg",
        caption: ""
      },
      {
        src: "/photos/seattle_6.jpg",
        thumbnail:"/photos/seattle_6.jpg",
        caption: ""
      },
      {
        src: "/photos/seattle_7.jpg",
        thumbnail:"/photos/seattle_7.jpg",
        caption: ""
      },
      {
        src: "/photos/seattle_8.jpg",
        thumbnail:"/photos/seattle_8.jpg",
        caption: ""
      },
      {
        src: "/photos/seattle_9.jpg",
        thumbnail:"/photos/seattle_9.jpg",
        caption: ""
      },
      {
        src: "/photos/seattle_10.jpg",
        thumbnail:"/photos/seattle_10.jpg",
        caption: ""
      },
      {
        src: "/photos/seattle_11.jpg",
        thumbnail:"/photos/seattle_11.jpg",
        caption: ""
      },
      {
        src: "/photos/seattle_12.jpg",
        thumbnail:"/photos/seattle_12.jpg",
        caption: ""
      }
  ];

  return <Gallery
          images={IMAGES}
          enableImageSelection={false} 
          rowHeight={200}/>;
}

export default Photography;