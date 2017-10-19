import React, { Component, PropTypes } from 'react';
import { EditorState, CompositeDecorator } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import './style.scss';
import { hexToColorPlugin } from './plugins/hex-to-color';

export default class Lesson4 extends Component {
    componentWillMount() {
        this.setState({editorState: createEditorStateWithText('red is \n#FF0000\n\ngreen is \n#00FF00\n\nblue is \n#0000FF')})
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
                    plugins={[hexToColorPlugin]}
                />        
                </div>
            </div>
        ) : null
    }
}