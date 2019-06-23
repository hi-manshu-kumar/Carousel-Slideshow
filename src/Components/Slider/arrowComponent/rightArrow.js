import React from 'react';

const RightArrow = (props) => {
    return (
        <div className="nextArrow" onClick={props.goToNext}>
            <i className="fas fa-chevron-right fa-2x" aria-hidden="true"></i>
        </div>
    )
}

export default RightArrow;