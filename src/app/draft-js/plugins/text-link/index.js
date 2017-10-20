import React from 'react';
import { EditorState, ContentState, RichUtils, KeyBindingUtil } from 'draft-js';

export const LinkComponent = (props) => {
    const { contentState, entityKey } = props;
    const { url } = contentState.getEntity(entityKey).getData()
    return (
        <a className='link'
            href={url}
            rel='noopener noreferrer'
            target='_blank'
            aria-label={url}
        >
            {props.children}
        </a>
    )
};

export const linkStrategy = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    )
};

export const textLinkPlugin = {
    keyBindingFn(event, { getEditorState, setEditorState }) {

        const selection = getEditorState().getSelection();
        if (selection.isCollapsed()) {
            return;
        }
        if (KeyBindingUtil.hasCommandModifier(event) && event.which === 75) { // user presses CMD/CTRL + K
            return 'add-link';
        }
    },
    handleKeyCommand(command, editorState, { getEditorState, setEditorState }) {
        if (command !== 'add-link') {
            return 'not-handled';
        }
        let link = window.prompt('Paste the link -');
        const selection = editorState.getSelection();
        if (!link) {
            setEditorState(RichUtils.toggleLink(editorState, selection, null));
            return 'handled';
        }
        const contentState = editorState.getCurrentContent();
        console.log({ contentState });
        const contentWithEntity = contentState.createEntity(
            'LINK',          // type
            'MUTABLE',       // mutability
            { url: link });  // data
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

export default textLinkPlugin;
