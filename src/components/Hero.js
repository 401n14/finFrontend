import React from "react";

function Hero(props) {
  

  return (
    <div className="contain">
      <div className="col-2 mobile">{props.children[0]}</div>
      <div className="col-2 hero-image">
        <h1 className="primary bold width">
          Transcribe is
          <br />
          <span className="primary light">
            your solution to modern communication
          </span>
        </h1>
        <p className="secondary ">
          The application is a communication platform for realtime chat between
          two or more users. We utilized Google Translate API to translate one
          user's preferred language to the other user's preferred language.
          Essentially, users can communicate easily and effectively in multiple
          languages at the same time.
        </p>
        <div className="hero-buttons">
          {props.children[1]}
          {props.children[2]}
        </div>
      </div>
    </div>
  );

}

export default Hero;
