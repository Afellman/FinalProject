import React from 'react';
import styles from './endpoint.css';

export const EndpointItem = (props) => {
  console.log(props.museumObj, "******")
  return (
    <div className='carousel-item'>
      <h4>{props.museumObj.name}
      </h4>
      <img src={props.museumObj.img} alt="Unable to load"></img>
      <div className="caption">
        <p>
          {props.museumObj.description}
        </p>
        <a href={props.museumObj.link}></a>
      </div>
    </div>
  );
}
