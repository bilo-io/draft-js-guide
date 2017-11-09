import Autocomplete from './Autocomplete';
import DefaultBlock from './DefaultBlock';
import Suggestions from './Suggestions';
import decorateComponentWithProps from 'decorate-component-with-props';

const createAutocompletePlugin = () => {
    const callbacks = {
        keyBindingFn: undefined,
        handleKeyCommand: undefined,
        handleBeforeInput: undefined,
        onDownArrow: undefined,
        onUpArrow: undefined,
        onTab: undefined,
        onEscape: undefined,
        handleReturn: undefined,
        onChange: undefined
    }

    const ariaProps = {

    }

    let escapedSearch
    const store = {
        getEditorState: undefined,
        setEditorState: undefined,
        isEscaped: (offsetKey) => escapedSearch === offsetKey,
        escapeSearch: (offsetKey) => { escapedSearch = offsetKey },
        resetEscapedSearch: () => { escapedSearch = undefined }
    }

    handleReturn: (keyboardEvent) => callbacks.handleReturn && callbacks.handleReturn(keyboardEvent);
    return {
        SuggestionsDropdown: decorateComponentWithProps(Suggestions, { ariaProps, callbacks, store }),
        decorators: [
        {
            strategy: findAutocompleteStrategy,
            component: Autocomplete,
        }
        , 
        {
            strategy: findNonAutocompleteStrategy,
            component: DefaultBlock
        }
    ]
    }
}