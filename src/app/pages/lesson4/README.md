# Draft.js Guide

- [Lesson 1: Intro to Draft.js](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson1)
- [Lesson 2: Draft.js API](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson2)
- [Lesson 3: Draft.js Plugins Editor](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson3)
- Lesson 4: Draft.js Custom Plugins - Part 1 (current)
- [Lesson 5: Draft.js Custom Plugins - Part 2](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson5)

## Lesson 4: Draft.js Custom Plugins - Part 1


In this step we cover how to create plugins, starting off with a basic example.
Let's start off with a clean, empty component for this lesson:

```jsx
import React, { Component, PropTypes } from 'react';
import { EditorState, CompositeDecorator } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import './style.scss';

export default class Lesson4 extends Component {
    componentWillMount() {
        this.setState({
            editorState: createEditorStateWithText('R: #FF0000\nG: #00FF00\nB: #0000FF')
        })
    }
    onChange(editorState) {
        this.setState({ editorState })
    }
    render() {
        return this.state ? (
            <div className='page page-padded'>
                <h2>Lesson 4: Draft.js Custom Plugins - Part 1</h2>
                <div className='editor'>
                <Editor 
                    onChange={this.onChange.bind(this)}
                    editorState={this.state.editorState} 
                />        
                </div>
            </div>
        ) : null
    }
}
```

## Basic Plugins

In this step we are going to look at creating some custom plugins, to give you an idea of the things you can do with Draft.js.

### Plugin: hex-to-color

Remember the decorators we created in [Lesson 2](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson2#decorators)? Here we are going to turn that into a plugin, making it cleaner to import.

First let's organize our folders a bit, by creating a `./draft-js/plugins` directory. Within that we create a subfolder, named after the plugin we want `hex-to-color`, and move the file created above to that folder. Finally, add a function which creates the plugin.

`src/app/draft/plugins/hex-to-color/index.js`:
```jsx
// HERE: Code for Component & Strategy
// -> see Lesson 2 - Draft.js API

export const hexToColorPlugin = {
    decorators: [{
        strategy: colorStrategy,
        component: ColorComponent
    }]
}
```

Now your component code is cleaner, as you only need to import the plugin, and attach it in the Editor:

```jsx
import { hexToColorPlugin } from './plugins/hex-to-color';
```
```jsx
render() {
    //...
    <Editor
        plugins={[hexToColorPlugin]} />
    //...
}
```

>**NOTE:** remember to remove the other code, which uses `CompositeDecorator` to initialise the plugin, and remove the `decorators` as an argument when initialising the Draft.js Editor.

Try running it again and everything should be fine. Congratulations. You've created your first plugin!! but let's not stop there. Let's create a few more plugins to illustrate more possibilities.

### Plugin: text-link

Now we are going to create another plugin, which makes use of Draft.js [Entities](https://draftjs.org/docs/advanced-topics-entities.html#content). Basically, this plugin allows you to select text, then press `⌘ + K` or `CTRL + K` which prompts you to add a link to the selection.
First, create a new folder, alongside `hex-to-color` one, named `text-link`, with an `index.js` file.

`./draft-js/plugins/text-link/index.js`:
```jsx
import React from 'react';
import { EditorState, ContentState, RichUtils, KeyBindingUtil } from 'draft-js';
 
// ... CODE: Component

// ... CODE: Strategy

// ... CODE: Plugin
```

Let's start by creating the link Component, which will just be an `<a href="some-url"></a>` element, with the specified `url`, and displays the text which was originally highlighted to "linkify".

`./draft-js/plugins/text-link/index.js`:
```jsx
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
```

Next, we create the strategy, which returns the link entity in the editor. To be more specific, every character can have an `Entity` attached to it. This strategy gets the `EntityRanges` and returns the set of subsequent characters, all of which are of type `'LINK'`.

`./draft-js/plugins/text-link/index.js`:
```jsx
// ... Component Above

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
```

Lastly, we create the plugin function, which does a number of things. 
1. It determines whether there is a text selection. (if `selection.isCollapsed() == true`, there is no selection, and we're done)
2. If there is a selection, it checks for the key combination `⌘ + K` or `CTRL + K`, which fires the `add-link` command.
3. The `handleKeyCommand` listens to all commands, but only deals with the `add-link` command and returns `handled`... for all other commands it returns `not-handled`.
4. It prompts the user to add a link as metadata to the entity (using `window.prompt()`).
5. When the user specifies a link, this is then turned into an entity, with the metadata:
```jsx
contentState.createEntity(
    'LINK',          // type of the entity
    'MUTABLE',       // mutability
    { url: link });  // data attached to the entity
)
```
6. Then it finds the selection (from the editorState), and assigns this entity to the selection.

```jsx
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
```

That should be it. Try using this plugin... don't forget to add it to your page component.

`src/app/pages/lesson4/index.js`:
```jsx
import textLinkPlugin from '../../draft-js/plugins/text-link';
```

```jsx
render() {
    //...
    <Editor
        //... other props
        plugins={[hexToColorPlugin, textLinkPlugin, textStylePlugin]} />
    //...
}
```

And now try it out. So just to recap, type some text, highlight it, press `⌘ + K` or `CTRL + K`, add the link and hit enter. The selection should have turned into a link. If clicking it does not redirect you, right click and choose Open Link in New Tab or Copy Link or something.

Now we've touched on Entities and created several plugins. In the next lesson, we will create more complicated plugins.

[Next Lesson](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson5)