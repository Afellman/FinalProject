import React from 'react';
import styles from './endpoint.css';

export const EndpointItem = (props) => {
  // nextObject = () => {
  //   props.museumObj.map(function(endpoint) {
  //     return  key={endpoint}
  //   }

  console.log(props.museumObj, "******")
  return (
    <div className='carousel-item'>
      <h3>{props.museumObj.name}
      </h3>
      <img src={props.museumObj.img} alt="Unable to load"></img>
      <div className="caption">
        <p>
          {props.museumObj.description}
        </p>
        <a href={props.museumObj.link} target="_blank"> Learn More </a> 
        <span> 
          <button type="button" className="btn-primary">Next</button>
          <button  type="button" className="btn-primary">Save</button>
        </span>
      </div>
    </div>
  );
}
