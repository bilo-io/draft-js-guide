import React from 'react';
import { Editor, EditorState } from 'draft-js';

export default class AutocompleteEditor extends React.Component {
    constructor(props) {
        super(props);
        this.autocompleteState = null;

        this.onChange = (editorState) => {
            const {
                onChange,
                onAutocompleteChange
            } = this.props;
            onChange(editorState);
        };
    }

    render() {
        const { onChange, editorState } = this.props;

        return (
            <Editor 
                editorState={editorState}
                onChange={this.onChange}
            />
        );
    }
}