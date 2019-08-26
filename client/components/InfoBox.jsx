import React from 'react';

const InfoBox = (props) => {

  return (
    <div className="carouselItemBox">
      <img className="carouselPics" onClick={() => props.setGlobal(event, props.item.ProductId)} src={props.item.Photo[0]}></img>
      <p className='carouselName'
        onClick={() => props.setGlobal(event, props.item.ProductId)}>{props.item.ItemName}</p>
      <p className="carouselRating">picture of stars {props.item.Rating} 16</p>
      {/* add link to db for number of comments */}
      <p className="carouselPrice" onClick={() => props.setGlobal(event, props.item.ProductId)}>${props.item.Price.toFixed(2)}</p>
    </div>
  );

};

export default InfoBox;