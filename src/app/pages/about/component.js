import React, { Component, PropTypes } from 'react';
import './style.scss';

export default class About extends Component {
    static propTypes = {
    }
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='page'>
                <h1>About</h1>
            </div>
        )
    }
}