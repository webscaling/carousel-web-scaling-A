import React from 'react';

const InfoBox = (props) => {

  if (props.item === null) {
    return (
      <div className="carouselItemBox"></div>
    );
    
  } else {
    let ratingSplit = props.item.Rating.toString().split('.');
    let rating = props.item.Rating;
    if (ratingSplit.length > 1) {
      let int = ratingSplit[0];
      let round = ratingSplit[1];
      if (Number(round) > 2 && Number(round) < 9 ) {
        rating = Number(int + '.' + '5');
      } else if (Number(round) <= 2 && Number(round) >= 0) {
        rating = Number(int);
      } else {
        rating = Number(int) + 1;
      }
    }
    let stars = [0, 0, 0, 0, 0];

    stars.forEach((element, index) => {
      if (rating === index + 0.5) {
        stars[index] = .5;
      } else if (rating >= index + 1) {
        stars[index] = 1;
      }
    });

    return (
      <div className="carouselItemBox">
        <img alt=":(" title={props.item.ItemName} className="carouselPics" onClick={() => props.setGlobal(event, props.item.ProductId)} src={props.item.Photo}></img>
        <p title={props.item.ItemName} className='carouselName' onClick={() => props.setGlobal(event, props.item.ProductId)}>{props.item.ItemName.length > 70 ? props.item.ItemName.slice(0, 70) + '...' : props.item.ItemName}</p>
        <div className="carouselReviewContainer" onClick={() => props.setReview(event, props.item.ProductId)}>
          {stars.map((star, index) => {
            if (star === 1) {
              return (<p key={index} className="carouselStar fas fa-star"></p>);
            } else if (star === .5) {
              return (<p key={index} className="carouselStar fas fa-star-half-alt"></p>);
            } else {
              return (<p key={index} className="carouselStar far fa-star"></p>);
            }
          })}
          <p className="carouselRating">{props.item.ratingcount}</p>
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