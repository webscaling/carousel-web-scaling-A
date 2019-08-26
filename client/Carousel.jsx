import React, { Component } from 'react';
import axios from 'axios';
import InfoBox from './components/InfoBox.jsx';
import loading from './components/loading.js';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalCategory: '',
      itemData: [],
      indexOnScreen: 0,
      itemsRendered: [],
      numOfItemsOnScreen: 5,
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

  /* /////////////////////// Functions for Mounting Items //////////////////////////
  ///////////////////////////////////////////////////////////////////////////////*/

  componentDidMount() {
    this.setState({itemData: [], itemsRendered: loading});
    this.getCategory();
    
  }

  getCategory() {
    axios.get('/item', {
      params: {
        ProductId: 5 //replace with global ID ////////////////////////////////
      }
    })
      .then(data => {
        setTimeout(() =>
          this.setState({ globalCategory: data.data[0].Category }, () => {
            this.getAllFromCategory(event, this.state.globalCategory);
          }), 200);
      })
      .catch(err => {
        console.error(err);
      });
  }

  getAllFromCategory(event, category) {
    console.log(category);
    axios.get('/item', { 
      params: {
        Category: category
      }
    })
      .then(data => {
        let copy = data.data;
        let result = [];

        while (copy.length > 0) {
          result.push(copy.splice(0, this.state.numOfItemsOnScreen));
        }

        this.setState({ itemData: result, itemsRendered: result[this.state.indexOnScreen]});
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderFiveMoreItems (event, direction) {
    if (direction === 'right') {
      if (this.state.indexOnScreen === this.state.itemData.length - 1) {
        return;
      }

      this.setState({itemsRendered: loading }, () =>
        this.setState({ itemsRendered: this.state.itemData[this.state.indexOnScreen + 1]}, () => {
          this.setState({ indexOnScreen: this.state.indexOnScreen + 1});
        })
      );

    } else {
      if (this.state.indexOnScreen === 0) {
        return;
      }

      this.setState({itemsRendered: loading }, () =>
        this.setState({ itemsRendered: this.state.itemData[this.state.indexOnScreen - 1] }, () => {
          this.setState({ indexOnScreen: this.state.indexOnScreen - 1 });
        })
      );
    }
  }

  /* ////////////////////////////// Event Handlers ////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////*/

  leftArrowClick() {
    this.renderFiveMoreItems(null, 'left');
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
    this.renderFiveMoreItems(null, 'right');
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
  /* ////////////////////////////// Global Functions ////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////*/

  setGlobal(event, id) {
    console.log(`set global productId to: ${id}`);
  }

  render() {
    return (
      <div>
        <div id="carouselTitleContainer"> 
          <h2 className="carouselTitle">Sponsored products related to this item</h2>
          <p id="carouselPgCount">Page {this.state.indexOnScreen + 1} of {this.state.itemData.length}</p>
        </div>
        <div className="carouselContainer">
          <div className="carouselScrollButtonContainerL">
            <img className={this.state.clickStateLeft}
              onMouseEnter={() => this.setState({ hoverStateLeft: this.state.arrows.leftHover })}
              onMouseLeave={() => this.setState({ hoverStateLeft: this.state.arrows.leftUnclicked })}
              onClick={() => this.leftArrowClick()}
              src={this.state.hoverStateLeft}></img>
          </div>
          {this.state.itemsRendered.map((item, index) => {
            return (
              <InfoBox 
                setGlobal={this.setGlobal.bind(this)}
                item={item} 
                key={index}
                nameHover={this.state.nameHover}
              />
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