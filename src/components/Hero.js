import React from 'react';

import logo from '../assets/logo.svg';

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">Transcribe is AWESOME!</h1>

    <p className="lead">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id
      ultricies enim. Donec sodales elit id eros lobortis tincidunt. Suspendisse
      potenti. Nam diam nibh, sodales sed urna in, semper volutpat augue.
      Suspendisse volutpat lorem nisi, vitae lacinia nulla aliquet eu. Duis non
      purus convallis, rhoncus urna sed, aliquet tortor. Fusce vel sapien sed
      metus venenatis pretium ut in neque. Donec condimentum metus sit amet nunc
      lobortis efficitur. 
      erat.
    </p>
  </div>
);

export default Hero;
