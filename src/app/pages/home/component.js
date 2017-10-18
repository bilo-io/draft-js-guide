import React, { Component, PropTypes } from 'react';
import './style.scss';

export default class Home extends Component {
    static propTypes = {
    }
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='page'>
                <h1>Draft.js</h1>
            </div>
        )
    }
}