import React from 'react';


const Slide = ({image, title}) => {
    const styles = {
        backgroundImage: `linear-gradient( rgba(0,0,0, 0), rgba(0,0,0, 0.8)),url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 60%',
        opacity: '1.5'
    }

    return (   
        <div className="slide" style={styles}>
            <h1 className="title">
                {title}
            </h1>
        </div>
    )
}

export default Slide;