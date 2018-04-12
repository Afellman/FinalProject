import React from 'react';

const Endpoint = (props) => {
    return (
        <div className='container'>
            <h3>{props.endpoint.name} </h3>
            <img src={props.endpoint.img} className="img-fluid"> 
            </img>
            <p> {props.endpoint.description} </p>
            <a href={props.endpoint.link}> </a>
        </div>
    )
}

export default Endpoint; 