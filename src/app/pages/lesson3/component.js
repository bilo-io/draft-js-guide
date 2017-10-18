import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import './style.scss';

export default class Lesson3 extends Component {
    componentWillMount() {
        this.setState({editorState: EditorState.createEmpty()})
    }
    onChange(editorState) {
        this.setState({ editorState })
    }
    render() {
        return this.state ? (
            <div className='page page-padded'>
                <h2>Lesson 3: Draft.js Plugins Editor</h2>
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