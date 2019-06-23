import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class SliderNo extends Component {

    state = {
        queryNo: ''
    }

    handleChange = (e) => {
        this.setState({
            queryNo: e.target.value 
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        if(this.state.queryNo>1&&this.state.queryNo<10){
        this.props.history.push({
            pathname: '/img',
            data: this.state.queryNo 
        })
        event.currentTarget.reset();}
    }

    render(){
        return (
            <div className="display--container">
            <form onSubmit={this.submitForm}>
                <label htmlFor="search" className="label--search">Enter number of images:</label>
                <input 
                    type="number" 
                    value={this.state.queryNo}
                    onChange={this.handleChange}
                    name="search"
                    className="input--search"
                    min="1" max="10"
                />
                
                <button type="Submit" className="mt-3 submit--title">
                    Search
                </button>
            </form>
            </div>
        )    
    }
    
}

export default withRouter(SliderNo);