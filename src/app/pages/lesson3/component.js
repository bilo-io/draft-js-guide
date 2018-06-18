import React, { Component } from 'react';
import Lesson from '../../components/lesson';
import { EditorState } from 'draft-js';
import Editor, {createEditorStateWithText} from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-hashtag-plugin/lib/plugin.css';
import './style.scss';

const linkifyPlugin = createLinkifyPlugin();
const hashtagPlugin = createHashtagPlugin();

export default class Lesson3 extends Component {
    componentWillMount() {
        this.setState({editorState: createEditorStateWithText('Type text such as #hashtags and links like draftjs.com ')})
    }
    onChange(editorState) {
        this.setState({ editorState })
    }
    render() {
        return this.state ? (
            <Lesson title='Lesson 3: Draft.js Plugins Editor'>
                <div className='editor'>
                <Editor 
                    onChange={this.onChange.bind(this)}
                    plugins={[hashtagPlugin,linkifyPlugin]}
                    editorState={this.state.editorState} 
                    ref={(e) => this.editor = e}
                />        
                </div>
                <MDReader url={'https://raw.githubusercontent.com/bilo-io/draft-js-guide/master/src/app/pages/lesson3/README.md'} />
            </Lesson>
        ) : null
    }
}