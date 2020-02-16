import React from "react";

/**
 * Triple is a react component that with assistance of certain styling allows you to dynamically display
 * three images. 
 * @function
 * @param {Array} props.images - An array of the three images that you want to display 
 * @returns {JSX} - The final element to render to the page
 */
function Triple(props) {
  /**
   * Function takes the props.images and turns them each in to individual JSX elements
   * @function
   * @returns {JSX}
    */
  function generateImages() {
    let imageElements;
    if (props.images) {
      imageElements = props.images.map((image, index) => (
        <div
          key={index}
          className="triple-img"
          style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}
        />
      ));
    }
    return imageElements;
  }
  return <div className="triple">{generateImages()}</div>;
}

export default Triple;
