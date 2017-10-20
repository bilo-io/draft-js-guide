import React, { Component } from 'react';
import Lesson from '../../components/lesson';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { EditorState, ContentState } from 'draft-js';
import linkPlugin from '../../plugins/link';
import './style.scss';

export default class Entities extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.onChange = this.onChange.bind(this);
        this.setState({editorState: createEditorStateWithText('select text, then press (CTRL + K) ...  (⌘ + K)')});
    }
    onChange(editorState) {
        this.setState({editorState});
    }
    focus() {
        this.editor.focus();
    }
    render() {
        let { editorState } = this.state;
        return this.state ? (
            <Lesson title='entities'>
                <div className='editor'>
                    <Editor
                        editorState={editorState}
                        onChange={this.onChange}
                        plugins={[linkPlugin]}
                        ref={(element) => this.editor = element}
                    />
                </div>
            </Lesson>
        ) : null
    }
}