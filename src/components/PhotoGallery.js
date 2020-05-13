import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

// function CustomImageComponent(index, photo, margin) {
//   console.log(index, photo, margin)
//   return(
//     <div className="imageContainer"
//        style={{ margin, height: photo.height, width: photo.width}}>
//       <img
//         alt={photo.title}
//         src={photo.src}
//         // style={
//         //   isSelected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }
//         // }
//         {...photo}
//         // onClick={handleOnClick}
//       />
//     </div>
    
//   )
// }

function PhotoGallery(props) {
  const { photos } = props;
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);


  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  // const imageRenderer = useCallback(
  //   ({ index, left, top, key, photo }) => (
  //     <CustomImageComponent
  //       // selected={selectAll ? true : false}
  //       key={key}
  //       margin={"2px"}
  //       index={index}
  //       photo={photo}
  //       left={left}
  //       top={top}
  //     />
  //   ), []
  // );


  return (
    <div>
      <Gallery photos={photos} onClick={openLightbox} margin={5} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

export default PhotoGallery;
