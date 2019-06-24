import React from 'react';
import {Link} from 'react-router-dom'; 

const error = () => {
    return (
    <div className="">
        Page Not Found
        <Link to="/">Head Home</Link>
    </div>
    )
}

export default error;