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


    getAutocompleteState(invalidate = true) {
        if(!invalidate) {
            return this.autocompleteState;
        }
        let type = null;
        let trigger = null;

        // Get range for latest hash tag trigger symbol
        const tagRange = this.getAutocompleteRange(triggers.TAG_TRIGGER);
        // Get range for latest mention tag trigger symbol
        const personRange = this.getAutocompleteRange(triggers.PERSON_TRIGGER);

        // Find latest trigger
        if(!tagRange) {

        }
        if(!personRange) {

        }

        if(!range) {

        }

        // Get TopLeft coordinates of range, to render the suggestions dropdown
        
    }

    getAutocompleteRange(trigger) {
        console.log('TODO: implement getAutocompleteRange()');
    }

    hasEntityAtSelection() {
        console.log('TODO: implement hasEntityAtSelection()');
    }
}