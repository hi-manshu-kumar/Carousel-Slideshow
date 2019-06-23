import React from 'react';

const LeftArrow = (props) => {
    return (
        <div className="backArrow" onClick={props.goToPrev}>
            <i className="fas fa-chevron-left fa-2x" aria-hidden="true"></i>
        </div>
    )
}

export default LeftArrow;