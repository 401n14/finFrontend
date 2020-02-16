import React, { Fragment } from "react";

import Hero from "../components/Hero";
import TripleImage from '../components/TripleImage';
import Button from '../components/Button';
import Content from "../components/Content";

let images = [
  'https://i.imgur.com/QFtYvKT.jpg', 
  'https://i.imgur.com/QFtYvKT.jpg', 
'https://i.imgur.com/QFtYvKT.jpg'];

const Home = () => (
  <Fragment>
    <Hero >
      <TripleImage images={images}/>
      <Button className="btn btn-primary" value="chat" />
      <Button className="btn btn-outline-white" value="Learn  more" /> 
    </Hero>
    <hr />
    <Content />
  </Fragment>
);

export default Home;
