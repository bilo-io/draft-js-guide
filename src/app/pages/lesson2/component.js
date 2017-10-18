import React, { Component, PropTypes } from 'react';
import { toJS } from 'immutable';
import { Editor, EditorState, ContentState } from 'draft-js';
import './style.scss';

export default class Lesson2 extends Component {
    componentWillMount() {
        this.onChange = this.onChange.bind(this);
        this.setState({
            editorState: EditorState.createWithContent(ContentState.createFromText('You are learning Draft.js\n\nThis is a guide from Bilo\n\nReact Rocks')),
            selection: '',
            block: ''
        })
    }
    onChange(editorState) {
        this.setState({
            editorState
        });
        this.logState(editorState);
        this.onContentChange(editorState);
        this.onSelectionChange(editorState);
    }
    onSelectionChange(editorState) {
        let selectionState = editorState.getSelection();
        let anchorKey = selectionState.getAnchorKey();
        let start = selectionState.getStartOffset();
        let end = selectionState.getEndOffset();
        let currentBlock = editorState.getCurrentContent().getBlockForKey(anchorKey)

        let block = currentBlock.getText();
        let selection = block.slice(start, end);

        this.setState({
            selection,
            block
        })
    }
    onContentChange(editorState) {
        let contentState = editorState.getCurrentContent();
    }
    render() {
        return (
            <div className='page page-padded'>
                <h2>Lesson 2: Draft.js API</h2>
                <div className='editor'>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                    />
                </div>
                <Section title={'Selection'}>
                    {this.state.selection}
                </Section>
                <Section title={'Block (paragraph)'}>
                    {this.state.block}
                </Section>
            </div>
        )
    }
}

export const Section = (props) => {
    return (
        <div className='section'>
            <label>{props.title}</label>
            <br />
            <div style={{marginTop: '1em'}}>
            {props.children}
            </div>
        </div>
    )
}