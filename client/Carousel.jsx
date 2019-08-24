import React, { Component } from 'react';
import InfoBox from './components/InfoBox.jsx';
import axios from 'axios';

class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      itemData: [],
      arrows: {
        leftUnclicked: 'https://shazamazon.s3.us-east-2.amazonaws.com/Carousel+Arrows/leftArrowUnclicked.jpg',
        rightUnclicked: 'https://shazamazon.s3.us-east-2.amazonaws.com/Carousel+Arrows/rightArrowUnclicked.jpg',
        leftHover: 'https://shazamazon.s3.us-east-2.amazonaws.com/Carousel+Arrows/leftArrowHover.jpg',
        rightHover: 'https://shazamazon.s3.us-east-2.amazonaws.com/Carousel+Arrows/rightArrowHover.jpg',
        leftRecentClick: 'https://shazamazon.s3.us-east-2.amazonaws.com/Carousel+Arrows/leftArrowRecentlyClicked.jpg',
        rightRecentClick: 'https://shazamazon.s3.us-east-2.amazonaws.com/Carousel+Arrows/rightArrowRecentlyClicked.jpg'
      }
    };
  }

  componentDidMount() {
    this.renderFiveMore(event, 'wizard');
  }

  renderFiveMore(event, category) {
    console.log(category);
    axios.get('/item', { 
      params: {
        category: category
      }
    })
      .then(data => {
        console.log(data);
        this.setState({itemData: data.data});
      })
      .catch(err => {
        console.error(err);
      });
  }

  setGlobal(event, id) {
    console.log(`set global productId to: ${id}`);
  }

  render() {
    return (
      <div>
        <h2 className="carouselTitle">Sponsored products related to this item</h2>
        <div className="carouselContainer">
          <div className="carouselScrollButtonContainerL">
            <img className="carouselScrollButton" src={this.state.arrows.leftUnclicked}></img>
          </div>
          {this.state.itemData.map((item, index) => {
            return (
              <InfoBox 
                setGlobal={this.setGlobal.bind(this)}
                item={item} 
                key={index}/>
            );
          })}
          <div className="carouselScrollButtonContainerR">
            <img className="carouselScrollButton" src={this.state.arrows.rightUnclicked}></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;