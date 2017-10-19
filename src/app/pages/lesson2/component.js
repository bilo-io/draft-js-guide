import React, { Component, PropTypes } from 'react';
import { toJS } from 'immutable';
import Section from '../../components/section';
import { EditorState, ContentState, CompositeDecorator } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import './style.scss';

export default class Lesson2 extends Component {
    componentWillMount() {
        this.onChange = this.onChange.bind(this);
        this.setState({
            editorState: EditorState.createWithContent(ContentState.createFromText('You are learning Draft.js\n\nThis is a guide from Bilo\n\nReact Rocks')),
            selection: '',
            block: '',
            content: []
        })
    }
    onChange(editorState) {
        this.setState({
            editorState
        });
        this.onEditorChange(editorState);
        this.onContentChange(editorState);
    }
    logState(editorState) {
        console.log(editorState.toJS());
    }
    onEditorChange(editorState) {
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
        let contentArray = contentState.getBlocksAsArray();
        let content = contentArray.map( (c) => c.getText() + '\n');
        this.setState({
            content
        })
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
                <Section title='Selection'>
                    {this.state.selection}
                </Section>
                <Section title='Block (paragraph)'>
                    {this.state.block}
                </Section>
                <Section title='Content'>
                    {this.state.content.map( (c, i) => (
                        <div key={i}>{c}</div>
                    ))}
                </Section>
            </div>
        )
    }
}