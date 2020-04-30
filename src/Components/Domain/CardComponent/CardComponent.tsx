import React, { Component } from 'react';
import classes from './CardComponent.module.css';
import { Button } from 'react-bootstrap';

type CardProps = {
  img: string;
  title: string;
};

function Card({ img, title }: CardProps) {
  return (
    <div className={classes.card}>
      <img src={img} alt="random" />
      <div className={classes.card_body}>
        <h2>{title}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
        <Button value="LINK" />
      </div>
    </div>
  );
}

export default Card;
