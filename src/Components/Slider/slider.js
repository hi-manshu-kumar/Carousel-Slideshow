import React, { Component } from 'react'

import Slide from './slide'
import Dots from './Dots/dots';
import LeftArrow from './arrowComponent/leftArrow'
import RightArrow from './arrowComponent/rightArrow'

export default class Slider extends Component{
    constructor(props){
        super(props);
        this.state={
            details: [],
            currentIndex: 0,
            translateValue: 0,
        }
    }
    
    static getDerivedStateFromProps(props, state){
        if(props.location.data === undefined){
            props.history.push({pathname: '/'})
            return null
        }
        return {details:props.location.data};

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
      
        if(i === currentIndex) 
        return
      
        if(i > currentIndex) {
            this.setState({translateValue: (-i * this.slideWidth())})
        }   

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