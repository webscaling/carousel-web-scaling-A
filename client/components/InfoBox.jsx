import React from 'react';

const InfoBox = (props) => {

  return (
    <div className="carouselItemBox">
      <img className="carouselPics" onClick={() => props.setGlobal(event, props.item.productId)} src={props.item.picture}></img>
      <p className="carouselName" onClick={() => props.setGlobal(event, props.item.productId)}>{props.item.name}</p>
      <p className="carouselRating">picture of stars {props.item.stars}</p>
      <p className="carouselPrice" onClick={() => props.setGlobal(event, props.item.productId)}>${props.item.price}</p>
    </div>
  );

};

export default InfoBox;