import React, { Component } from 'react';
import InfoBox from './components/InfoBox.jsx';
import axios from 'axios';

class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      itemData: [],
      clickStateLeft: 'carouselScrollButton',
      clickStateRight: 'carouselScrollButton',
      hoverStateLeft: 'https://shazamazon.s3.us-east-2.amazonaws.com/Carousel+Arrows/leftArrowUnclicked.jpg',
      hoverStateRight: 'https://shazamazon.s3.us-east-2.amazonaws.com/Carousel+Arrows/rightArrowUnclicked.jpg',
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

  leftArrowClick() {
    //set state to render 5 items left

    //if button is reclicked multiple times, this stops the arrow from dancing from the setTimeout
    if (this.state.clickStateLeft === 'carouselArrowGlow') {
      return;
    }
    this.setState({ clickStateLeft: 'carouselArrowGlow' }, () => { 
      setTimeout(() => this.setState({ clickStateLeft: 'carouselScrollButton' }), 3000);
      if (this.state.clickStateRight === 'carouselArrowGlow') {
        this.setState({ clickStateRight: 'carouselScrollButton' });
      } 
    });
  }

  rightArrowClick() {
    //set state to render 5 items right

    //if button is reclicked multiple times, this stops the arrow from dancing from the setTimeout
    if (this.state.clickStateRight === 'carouselArrowGlow') {
      return;
    }
    this.setState({ clickStateRight: 'carouselArrowGlow' }, () => {
      setTimeout(() => this.setState({ clickStateRight: 'carouselScrollButton' }), 3000);
      if (this.state.clickStateLeft === 'carouselArrowGlow') {
        this.setState({ clickStateLeft: 'carouselScrollButton' });
      }
    });
  }

  render() {
    return (
      <div>
        <h2 className="carouselTitle">Sponsored products related to this item</h2>
        <div className="carouselContainer">
          <div className="carouselScrollButtonContainerL">
            <img className={this.state.clickStateLeft}
              onMouseEnter={() => this.setState({ hoverStateLeft: this.state.arrows.leftHover })}
              onMouseLeave={() => this.setState({ hoverStateLeft: this.state.arrows.leftUnclicked })}
              onClick={() => this.leftArrowClick()}
              src={this.state.hoverStateLeft}></img>
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
            <img className={this.state.clickStateRight}
              onMouseEnter={() => this.setState({ hoverStateRight: this.state.arrows.rightHover })}
              onMouseLeave={() => this.setState({ hoverStateRight: this.state.arrows.rightUnclicked })}
              onClick={() => this.rightArrowClick()}
              src={this.state.hoverStateRight}></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;