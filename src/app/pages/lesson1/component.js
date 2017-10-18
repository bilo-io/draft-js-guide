import React, { Component, PropTypes } from 'react';
import { Editor, EditorState } from 'draft-js';
import { toJS } from 'immutable';
import './style.scss';

export default class Lesson1 extends Component {
    componentWillMount() {
        this.onChange = this.onChange.bind(this);
        this.setState({
            editorState: EditorState.createEmpty()
        })
    }
    onChange(editorState) {
        this.setState({ editorState });
        this.logState(editorState);
    }
    logState(editorState) {
        console.log(editorState.toJS())
    }
    render() {
        return this.state ? (
            <div className='page page-padded'>
                <h2>Lesson 1: A basic Editor</h2>
                <div className='editor'>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange} />
                </div>
            </div>
        ) : null;
    }
}