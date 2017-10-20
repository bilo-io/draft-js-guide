import React from 'react';
import { REGEX_LINK } from '../regex';

export const LinkComponent = (props) => {
    const { contentState, entityKey } = props;
    const { url } = contentState.getEntity(entityKey).getData()
    return (
        // <span onClick={() => console.log(props.decoratedText)}>
        //     <a href={`https://${props.decoratedText}`} style={{color: '#00adee', cursor: 'pointer'}}>{props.children}</a>
        // </span>
        <a>
            
        </a>
    )
};

export const linkStrategy = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntityKey(entityKey).getType() === 'LINK'
            );
        },
        callback
    )
};

export const linkPlugin = {
    keyBindingFn(event, editorState) {
        const selection = editorState.getSelection();
        if(selection.isCollapsed()) {
            return;
        }
        if(KeyBindingUtil.hasCommandModifier(event) && event.which === 75) { // user presses CMD/CTRL + K
            return 'add-link';
        }
    },
    handleKeyCommand(command, editorState, setEditorState) {
        if(command !== 'add-link') {
            return 'not-handled';
        }
        let link = window.prompt('Paste the link -');
        const selection = editorState.getSelection();
        if(!link) {
            setEditorState(RichUtils.toggleLink(editorState, selection, null));
            return 'handled';
        }
        const contentState = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity(
            'LINK',         // type
            'MUTABLE',      // mutability
             { url: link});  // data
        const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
        return 'handled';
    },
    decorators: [{
        strategy: linkStrategy,
        component: LinkComponent
    }]
};

