import React, {Component} from 'react';

import Header from '../Components/Header_footer/Header'

class Layout extends Component{
    render(){
        return (
            <div>
                <Header/>
                <div className="page_container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Layout;