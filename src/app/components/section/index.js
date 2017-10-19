import React from 'react';
import './style.scss';

export const Section = (props) => {
    return (
        <div className='section'>
            <label>{props.title}</label>
            <br />
            <div style={{marginTop: '1em'}}>
                {props.children}
            </div>
        </div>
    )
}

export default Section;