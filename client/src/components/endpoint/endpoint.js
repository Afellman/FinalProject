import React, {Component} from 'react';
import styles from './endpoint.css';
import {Carousel } from 'react-bootstrap';

export const MyCarousel = ({children, props}) => {
  return (
    <Carousel className= "carousel"
      >
      {children}

      </Carousel>
  );
}
