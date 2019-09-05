import React from 'react';
import { startSession } from 'mongoose';

const InfoBox = (props) => {
  
  if (props.item === null) {
    return (
      <div className="carouselItemBox"></div>
    );
    
  } else {
    let rating = Math.round(props.item.Rating * 2) / 2;
    let stars = [0, 0, 0, 0, 0];
  
    stars.forEach((element, index) => {
      if (rating === index + 1.5) {
        stars[index] = .5;
      } else if (rating >= index + 1) {
        stars[index] = 1;
      }
    });

    return (
      <div className="carouselItemBox">
        <a href='#'>
          <img className="carouselPics" onClick={() => props.setGlobal(event, props.item.ProductId)} src={props.item.Photo}></img>
          <p className='carouselName'
            onClick={() => props.setGlobal(event, props.item.ProductId)}>{props.item.ItemName.length > 70 ? props.item.ItemName.slice(0, 70) + '...' : props.item.ItemName}</p>
        </a>
        {stars.map((star, index) => {
          if (star === 1) {
            return (<a href='#reviewsApp'><p key={index} className="carouselStar fas fa-star"></p></a>);
          } else if (star === .5) {
            return (<a href='#reviewsApp'><p key={index} className="carouselStar fas fa-star-half-alt"></p></a>);
          } else {
            return (<a href='#reviewsApp'><p key={index} className="carouselStar far fa-star"></p></a>);
          }
        })}
        <a href='#reviewsApp'><p className="carouselRating">{props.item.RatingCount}</p></a>
        <a href='#'>
          <p className="carouselPrice" onClick={() => props.setGlobal(event, props.item.ProductId)}>${props.item.Price.toFixed(2)}</p>  
        </a>
      </div>
    );
  }
};

export default InfoBox;