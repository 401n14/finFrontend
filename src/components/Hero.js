import React from "react";

function Hero(props) {
  

  return (

      <div className="contain">
        <div className="col-2 mobile">
          {props.children[0]}
        </div>
        <div className="col-2 hero-image">
          <h1 className="primary bold width">
            Transcribe is
                <br />
            <span className="primary light">
              your solution to modern communication
                </span>
          </h1>
          <p className="secondary ">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
            in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."{" "}
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
