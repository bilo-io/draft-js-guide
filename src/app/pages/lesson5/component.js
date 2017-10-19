import React, { Component, PropTypes } from 'react';
import Lesson from '../../components/lesson';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';

import './style.scss';

export default class Lesson5 extends Component {
    componentWillMount() {
        this.onChange = this.onChange.bind(this);
        this.setState({
            editorState: EditorState.createEmpty()
        })
    }
    onChange(editorState) {
        this.setState({
            editorState
        })
    }
    render() {
        return this.state ? (
            <Lesson title='Lesson 5: Draft.js Custom Plugins Part 2'>
                <div className='editor'>
                <Editor 
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                />   
                </div>             
            </Lesson>
        ): null
    }
}