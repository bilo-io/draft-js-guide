import React, { Component, PropTypes } from 'react';
import Lesson from '../../components/lesson';
import { toJS } from 'immutable';
import Section from '../../components/section';
import { Editor, EditorState, ContentState, CompositeDecorator, Modifier } from 'draft-js';
import ColorComponent, { colorStrategy } from '../../draft-js/decorators/';
import './style.scss';

const decorators = new CompositeDecorator([{
    strategy: colorStrategy,
    component: ColorComponent
}]);
export default class Lesson2 extends Component {
    componentWillMount() {
        this.onChange = this.onChange.bind(this);
        this.setState({
            editorState: EditorState.createWithContent(
                ContentState.createFromText(
                    'You are learning Draft.js\n\nThis is a guide from Bilo\n\nReact Rocks\n\ndecorator to ting hexColors #00ADEE'),
            decorators),
            selection: '',
            block: '',
            content: []
        }, () => this.createTextEntity(this.state.editorState))
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
    createTextEntity(editorState) {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'IMMUTABLE',
            { url: 'http://google.com'}
        )

        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const selectionState = editorState.getSelection();
        const contentStateWithLink = Modifier.applyEntity(
            contentStateWithEntity,
            selectionState,
            entityKey
        );
    }
    retrieveTextEntity(editorState) {
        const contentState = editorState.getCurrentContent();
        const blockWithLinkAtBeginning = contentState.getBlockForKey('...');
    }
    render() {
        return (
            <Lesson title='Lesson 2: Draft.js API'>
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
            </Lesson>
        )
    }
}