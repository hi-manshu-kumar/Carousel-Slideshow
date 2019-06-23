import React, { Component } from 'react'
import axios from 'axios';

class DetailForm extends Component{
    constructor(props){
        super(props);
        this.state={
            loading: false,
            details: []
            // details: [
            //     {images:"https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/aurora.jpg", title: 'ss'},
            //     {images:"https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/canyon.jpg", title: ''},
            //     {images:"https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg", title: ''},
            // ],
        }
    }

    componentDidMount(){
        if(this.props.location.data===undefined){
            this.props.history.push({pathname: '/'})
        }
        this.fetchImage();
    }

    fetchImage = () => {
        let img = [];
        let count = this.props.location.data || 3;
        axios
            .get(`https://api.unsplash.com/photos/random?client_id=3b365ec36508fb5f2de1e73551c825644e30052302c4c77e62416149b324c460&count=${count}
            `)
            .then(
                res => {
                    console.log(res.data)
                    res.data.map((elem,i) => img.push({images : elem.urls.regular, title: ``}));
                    this.setState({details:img, loading: false});
                })
            .catch(err => console.log(err))
            console.log(this.state)
    }

    handleChange = index => e => {
        let {details}=  this.state;
        details.map((el,i) => {
            if(i===index){
                el.title=e.target.value
            }
            return el;
        })
        this.setState({details})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.history.push({
            pathname: '/slider',
            data: this.state.details
        })
    } 

    render(){
        const {details} = this.state;
        const imageList =details.map((e,i) => (
            <div key={i} className="details--wrapper">
                <img src={e.images} alt={e.title} className="image" />  
                <input type="text" value={e.title} onChange={this.handleChange(i)} className="input--title" placeholder="Enter title"/>
            </div>
            ) 
        )
        
        return (
            <div className="">
                {this.state.loading? <p>Loading...</p> : <div>{imageList}<button onClick={this.submitHandler} className="submit--title">Submit</button></div> }
            </div>
        )
    }
}


export default DetailForm;