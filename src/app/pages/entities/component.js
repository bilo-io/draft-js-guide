import React, { Component } from 'react';
import Lesson from '../../components/lesson';
import Editor from 'draft-js-plugins-editor';
import { EditorState, ContentState } from 'draft-js';
import './style.scss';

export default class Entities extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.onChange = this.onChange.bind(this);
        this.setState({editorState: EditorState.createEmpty()});
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
                        ref={(element) => this.editor = element}
                    />
                </div>
            </Lesson>
        ) : null
    }
}