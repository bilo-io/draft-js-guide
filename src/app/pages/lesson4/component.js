import React, { Component, PropTypes } from 'react';
import Lesson from '../../components/lesson';
import { EditorState, CompositeDecorator } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { hexToColorPlugin } from '../../draft-js/plugins/hex-to-color';
import textLinkPlugin from '../../draft-js/plugins/text-link';
import textStylePlugin from '../../draft-js/plugins/text-style';
import MDReader from '../../components/md-reader'

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
                    plugins={[hexToColorPlugin, textLinkPlugin, textStylePlugin]}
                />
                </div>
                <MDReader url={'https://raw.githubusercontent.com/bilo-io/draft-js-guide/master/src/app/pages/lesson4/README.md'} />
            </Lesson>
        ) : null
    }
}