import React, { Component, PropTypes } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import './style.scss';

export default class Lesson4 extends Component {
    componentWillMount() {
        this.setState({editorState: EditorState.createEmpty()})
    }
    onChange(editorState) {
        this.setState({ editorState })
    }
    render() {
        return this.state ? (
            <div className='page page-padded'>
                <h2>Lesson 4: Draft.js Custom Plugins</h2>
                <div className='editor'>
                <Editor 
                    onChange={this.onChange.bind(this)}
                    editorState={this.state.editorState} 
                />        
                </div>
            </div>
        ) : null
    }
}
