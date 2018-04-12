import React from 'react';

const EndpointItem = (props) => {
    return(
        <div className='carousel-item'>
            <h3>{props.endpoint.name} </h3>
            <img src={props.endpoint.img}> 
            </img>
            <div className="carousel-caption d-none d-md-block">      
                <p> Description: {props.endpoint.description} </p>
                <a href={props.endpoint.link}> </a>
            </div>
        </div>
    );
}

export default EndpointItem; 