import React, { Component, PropTypes } from 'react';
import Lesson from '../../components/lesson';
import { Editor, EditorState, ContentState } from 'draft-js';
import { toJS } from 'immutable';
import './style.scss';

export default class Lesson1 extends Component {
    componentWillMount() {
        this.onChange = this.onChange.bind(this);
        this.setState({
            editorState: EditorState.createWithContent(ContentState.createFromText('This is a basic Draft.js Editor'))
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
            <Lesson title='Lesson 1: A basic Editor'>
                <div className='editor'>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange} />
                </div>
            </Lesson>
        ) : null;
    }
}