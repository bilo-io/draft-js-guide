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
                <div className='guide-lessons-list'>
                    <Link to='/lesson1'>Lesson 1 - A basic editor</Link>
                    <Link to='/lesson2'>Lesson 2 - Draft.js API</Link>
                    <Link to='/lesson3'>Lesson 3 - Draft.js plugins editor</Link>
                    <Link to='/lesson4'>Lesson 4 - Draft.js Custom Plugins - Part 1</Link>
                    <Link to='/lesson5'>Lesson 5 - Draft.js Custom Plugins - Part 2</Link>
                </div>
            </div>
        )
    }
}