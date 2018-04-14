import React from 'react';
import EndpointItem from './endpoint';
import styles from './endpoint.css';

export const Endpoint = ({children}) => {
  return (
    <div className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
          {children}
      </div>
    </div>
  );
}
