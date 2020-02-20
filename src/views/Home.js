import React, { Fragment } from "react";
import {Link} from 'react-router-dom'

import Hero from "../components/Hero";
import TripleImage from '../components/TripleImage';
import Button from '../components/Button';
import Content from "../components/Content";
import { useAuth0 } from "../react-auth0-spa";

let images = [
  'https://i.imgur.com/QFtYvKT.jpg',
  'https://i.imgur.com/QFtYvKT.jpg',
  'https://i.imgur.com/QFtYvKT.jpg'];


  const Home = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Fragment>
      <Hero >
        <TripleImage images={images} />
        {!isAuthenticated ? <Button className="btn btn-primary" value="chat" onClick={loginWithRedirect} /> : <Link to='/chat'><Button className="btn btn-primary" value="chat" /></Link>}
        
        <Button className="btn btn-outline-white" value="Learn  more" />
      </Hero>
      <hr />
      <Content />
    </Fragment>
  );
}

export default Home;
