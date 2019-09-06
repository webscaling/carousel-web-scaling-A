import React from 'react';
import ReactTooltip from 'react-tooltip';
// import { startSession } from 'mongoose';

const InfoBox = (props) => {
  
  if (props.item === null) {
    return (
      <div className="carouselItemBox"></div>
    );
    
  } else {
    let rating = Math.round(props.item.Rating * 2) / 2;
    let stars = [0, 0, 0, 0, 0];

    stars.forEach((element, index) => {
      if (rating === index + 0.5) {
        stars[index] = .5;
      } else if (rating >= index + 1) {
        stars[index] = 1;
      }
    });

    let splitLine = props.item.ItemName.split(' ');
    let lineName = '';
    let i = splitLine.length;

    while (i >= 0) {
      lineName += splitLine.splice(0, 4).join(' ') + '<br />';
      i = i - 4;
    }

    return (
      <div className="carouselItemBox">
        <ReactTooltip className="carouselToolTip" multiline={true} place="top" effect="solid" delayShow={1500} offset={{ bottom: 50 }} />

        <img data-tip={lineName} className="carouselPics" onClick={() => props.setGlobal(event, props.item.ProductId)} src={props.item.Photo}></img>
        <p data-tip={lineName} className='carouselName' onClick={() => props.setGlobal(event, props.item.ProductId)}>{props.item.ItemName.length > 70 ? props.item.ItemName.slice(0, 70) + '...' : props.item.ItemName}</p>
        <div className="carouselReviewContainer" onClick={() => props.setReview(event, props.item.ProductId)}>
          {stars.map((star, index) => {
            if (star === 1) {
              return (<p key={index} className="carouselStar fas fa-star" onClick={() => props.setReview(event, props.item.ProductId)}></p>);
            } else if (star === .5) {
              return (<p key={index} className="carouselStar fas fa-star-half-alt" onClick={() => props.setReview(event, props.item.ProductId)}></p>);
            } else {
              return (<p key={index} className="carouselStar far fa-star" onClick={() => props.setReview(event, props.item.ProductId)}></p>);
            }
          })}
          <p className="carouselRating" onClick={() => props.setReview(event, props.item.ProductId)}>{props.item.RatingCount}</p>
        </div>
        <p className="carouselPrice" onClick={() => props.setGlobal(event, props.item.ProductId)}>${props.item.Price.toFixed(2)}
          <img className="carouselLogo" src='https://cart-icons.s3.us-east-2.amazonaws.com/shazam.png'></img>
          <span className="carouselShazam">SHAZAM</span>
        </p>  
      </div>
    );
  }
};

export default InfoBox;