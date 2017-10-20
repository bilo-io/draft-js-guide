import {
    getDefaultKeyBinding,
    RichUtils
} from 'draft-js'

const textStylePlugin = {
    keyBindingFn(e) {
        return getDefaultKeyBinding(e)
    },

    handleKeyCommand( command, editorState ,{ setEditorState }) {
        const newEditorState = RichUtils.handleKeyCommand(editorState, command);
        if(newEditorState) {
            setEditorState(newEditorState);
            return 'handled';
        }
        return 'not-handled';
    }
};

export default textStylePlugin;