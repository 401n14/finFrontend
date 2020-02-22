import React from 'react';

function Button(props) {

  return (<button className={props.className} onClick={props.onClick} style={props.style}>{props.value}</button>)
}

export default Button;