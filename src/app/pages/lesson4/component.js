import React, { Component, PropTypes } from 'react';
import Lesson from '../../components/lesson';
import { EditorState, CompositeDecorator } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { hexToColorPlugin } from './../../plugins/hex-to-color';
import { linkPlugin } from './../../plugins/link';
import textStylePlugin from '../../plugins/text-style';

import './style.scss';

export default class Lesson4 extends Component {
    componentWillMount() {
        this.setState({editorState: createEditorStateWithText('R: #FF0000\nG: #00FF00\nB: #0000FF')})
    }
    
    onChange(editorState) {
        this.setState({ editorState })
    }
    render() {
        return this.state ? (
            <Lesson title='Lesson 4: Draft.js Custom Plugins - Part 1'>
                <div className='editor'>
                <Editor 
                    onChange={this.onChange.bind(this)}
                    editorState={this.state.editorState} 
                    plugins={[hexToColorPlugin, linkPlugin, textStylePlugin]}
                />        
                </div>
            </Lesson>
        ) : null
    }
}