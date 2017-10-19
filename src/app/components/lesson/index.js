import React, { Component } from 'react';
import './style.scss';

export const Lesson = (props) => {
    return (
        <div className='page page-padded'>
            <h1>{props.title || `no title... fix: <Lesson title='your title'></Lesson>` }</h1>
            {props.children}
        </div>
    )
}

export default Lesson;