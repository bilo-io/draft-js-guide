import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default class Home extends Component {
    static propTypes = {
    }
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='page page-padded'>
                <h1>Draft.js</h1>
                <Link to='/lesson1'>Lesson 1</Link>
            </div>
        )
    }
}