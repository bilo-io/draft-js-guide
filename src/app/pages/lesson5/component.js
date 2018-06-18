import React, { Component, PropTypes } from 'react';
import { MDReader } from 'bilo-ui';

import Lesson from '../../components/lesson';
import { EditorState } from 'draft-js';
import AutocompleteEditor from '../../components/autocomplete';

import './style.scss';

export default class Lesson5 extends Component {
    componentWillMount() {
        this.onChange = this.onChange.bind(this);
        this.setState({
            editorState: EditorState.createEmpty()
        })
        this.onAutocompleteChange = (autocompleteState) => {
            this.setState({autocompleteState})
        }
    }
    onChange(editorState) {
        this.setState({
            editorState
        })
    }
    
    render() {
        return this.state ? (
            <Lesson title='Lesson 5: Draft.js Custom Plugins Part 2'>
                <div className='editor'>
                <AutocompleteEditor 
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    onAutocompleteChange={this.onAutocompleteChange}
                />   
                </div>             
                <MDReader url={'https://raw.githubusercontent.com/bilo-io/draft-js-guide/master/src/app/pages/lesson5/README.md'} />
            </Lesson>
        ): null
    }
}