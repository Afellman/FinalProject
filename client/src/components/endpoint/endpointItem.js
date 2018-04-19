import React, {Component} from 'react';
import styles from './endpoint.css';
import database from '../../utils/database';
import {Carousel } from 'react-bootstrap';
import MyCarousel from "./endpoint";
import MyModal from "../modal/modal";
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

export const CarouselItem = (props) => {
    return (
    <Carousel.Item className={`carousel-item item${props.index}`}>
        <h3> {props.museumObj.name}</h3>
        <img width={300} height={300} alt="Unable to load" src={props.museumObj.img} />
    <Carousel.Caption>
      <p> {props.museumObj.description} </p>
      <a href={props.museumObj.link} target="_blank"> Learn More </a> 
      <span> 
        <MyModal />
        <button onClick={() => {
          let museumObj = props.museumObj;
          museumObj.user = props.user;
          database.postArticle(museumObj)
          .then(res=>console.log(res))
        }}
        
        type="button" className="btn-primary">Save</button>
      </span>
    </Carousel.Caption>
  </Carousel.Item>
    )
}
