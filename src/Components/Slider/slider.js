import React, { Component } from 'react'

import Slide from './slide'
import Dots from './Dots/dots';
import LeftArrow from './arrowComponent/leftArrow'
import RightArrow from './arrowComponent/rightArrow'

export default class Slider extends Component{
    constructor(props){
        super(props);
        this.state={
            // images: [
            //     "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/aurora.jpg",
            //     "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/canyon.jpg",
            //     "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg",
            //     "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/desert.jpg",
            //     "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/mountains.jpg",
            //     "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/redsky.jpg",
            //     "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/sandy-shores.jpg",
            //     "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/tree-of-life.jpg"
            // ],
            details: [
                {images: "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/aurora.jpg", title: "Default 1"},
                {images: "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/canyon.jpg", title: "Default 2"},
                {images: "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg", title: "Default 3"}
            ],
            currentIndex: 0,
            translateValue: 0,
            sliderLength: 3
        }
    }
    
    static getDerivedStateFromProps(props, state){
        if(props.location.data === undefined){
            props.history.push({pathname: '/'})
            return null
        }
        console.log(state.details[0].images!==props.location.data[0].images)
        if(state.details[0].images!==props.location.data[0].images || state.details[0].title!==props.location.data[0].title){
            return {details:props.location.data};
        } else{
            return null;
        }
    }

    goToPrevSlide = () => {
        let length  = this.state.details.length - 1
        if(this.state.currentIndex === 0){
            return this.setState({
                currentIndex: length,
                translateValue: -length*this.slideWidth()
            })
        }

        this.setState(prevState => ({
            currentIndex: prevState.currentIndex - 1,
            translateValue: prevState.translateValue + (this.slideWidth()) 
        }))
    }

    goToNextSlide = () => {

        if(this.state.currentIndex === this.state.details.length - 1) {
            return this.setState({
              currentIndex: 0,
              translateValue: 0
            })
        }

        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1,
            translateValue: prevState.translateValue + -(this.slideWidth()) 
        }))
    }

    slideWidth = () => {
        return document.querySelector('.slide').clientWidth
    }

    handleDotClick = (i) => {
        const { 
            currentIndex, 
            translateValue
        } = this.state
      
        // Do nothing if someone clicks on the currently active dot
        if(i === currentIndex) 
        return
      
        // If the number taken from the i argument passed into handleDotClick is
        // less than the currently active dot, we obviously need to move backwards to a previous slide.
        if(i > currentIndex) {
            this.setState({translateValue: (-i * this.slideWidth())})
        }   

        // We need to go forward to a particular slide
        else {
            this.setState({translateValue: translateValue + (currentIndex - i) * this.slideWidth()})
        }
      
        this.setState({currentIndex:i});
    }

    render() {
        return (
            <div className="slider display--container">

                <div className="slider-wrapper"
                        style={{
                            transform: `translateX(${this.state.translateValue}px)`,
                            transition: 'transform ease-out 0.45s'
                }}>
                    {
                        this.state.details.map((element, i) => {
                            return <Slide image={element.images} key={i} title={element.title}/>
                        })
                    }
                </div>
                <Dots
                    index={this.state.currentIndex}
                    images={this.state.details}
                    dotClick={this.handleDotClick}
                />
                {
                    this.state.details.length>1 ? 
                        <>
                            <LeftArrow goToPrev = {this.goToPrevSlide}/>
                            <RightArrow goToNext = {this.goToNextSlide}/>
                        </>
                    : null
                }
            </div>  
        )
    }
}