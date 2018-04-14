import React from 'react';
import EndpointItem from './endpoint';
import styles from './endpoint.css';

export const Endpoint = ({children}) => {
  return (
    <div className="endpoint" style={{margin: 'auto'}}>
      {children}
    </div>
  );
}
