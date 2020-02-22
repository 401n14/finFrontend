import React, { Fragment } from "react";
import {Link} from 'react-router-dom'

import Hero from "../components/Hero";
import TripleImage from '../components/TripleImage';
import Button from '../components/Button';
import Content from "../components/Content";
import { useAuth0 } from "../react-auth0-spa";

let images = [
  'https://live.staticflickr.com/5813/30931763465_c7cc26e743_n.jpg',
  'https://live.staticflickr.com/8568/15486971303_fe3c25285d.jpg',
  'https://live.staticflickr.com/1735/40811146810_d47a60d20c.jpg'
];


  const Home = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Fragment>
      <Hero>
        <TripleImage images={images} />
        {!isAuthenticated ? (
          <Button
            className="btn btn-primary"
            value="chat"
            onClick={loginWithRedirect}
          />
        ) : (
          <Link to="/chat">
            <Button className="btn btn-primary" value="chat" />
          </Link>
        )}

        <a href="https://github.com/401n14/finFrontend">
          <Button className="btn btn-outline-white" value="Learn  more" />
        </a>
      </Hero>
      <hr />
      <Content />
    </Fragment>
  );
}

export default Home;
