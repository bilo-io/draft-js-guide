# Draft.js Guide
by Bilo Lwabona

[Draft.js](https://draftjs.org/) is a rich text editor that is very powerful, and quite extensible. Unfortunately, there is not as much documentation out there as you would like.

## Overview

- [Lesson 1: Intro to Draft.js](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson1)
- Lesson 2: Draft.js API (current)
- [Lesson 3: Draft.js Plugins Editor](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson3)
- [Lesson 4: Draft.js Custom Plugins - Part 1](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson4)
- [Lesson 5: Draft.js Custom Plugins - Part 2](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson5)

## Lesson 2: Draft.js API

In the last lesson we created a basic editor. Without doing much. Here, we go over the [Draft.js API](https://draftjs.org/docs/overview.html#content), which allows you to access and modify various parts of the editor's State.

There are many things to cover, but I think some essential things to know about, are:

 - editorState
 - contentState
 - entities
 - decorators

### EditorState

[EditorState](https://draftjs.org/docs/api-reference-editor-state.html#content) contains everything about the current state of the editor, which you can do many things with. For example, you determine the block of text that the cursor is on, or showing the selectionState, from which you can get the exact selected text.

To provide an example, we create a new function in our component, which extracts these from the editorState. This function (`onEditorChange()`) is invoked in the `onChange()` function.

```jsx
//...
onChange(editorState) {
    //...
    this.onEditorChange(editorState);
}
//...
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
//...
```

Now we could just log these new additions to the state in the console, but we'll display them on the page itself. First we create a component called `Section` outside of the current component, which just displays its children, has a title, and some nice formatting:


```jsx
export default class Lesson2 extends React.Component {
    //...
}

const Section = (props) => {
    return (
        <div className='section'>
            <label>{props.title}</label>
            <div style={{marginTop: '1em'}}>
                {props.children}
            </div>
        </div>
    )
}
```

We then use this component to display the respective information we set in the state:

```jsx
render() {
    // ...
    <Section title={'Selection'}>
        {this.state.selection}
    </Section>
    <Section title={'Block (paragraph)'}>
        {this.state.block}
    </Section>
}
```

### ContentState

[ContentState](https://draftjs.org/docs/api-reference-content-state.html#content) represents the full state of:
- the entire **contents** of an editor: `text`, `block` and `inline styles`, and `entity ranges`
- two **selection states** of an editor: one before and after the rendering of these contents.

As before, we create another function `onContent`, with which we display the entire Content of the Editor:

```jsx
onContentChange(editorState) {
    let contentState = editorState.getCurrentContent();
    let content = contentState.getBlocksAsArray();
    let text = content.map( (c) => c.getText() + '\n').join('');
    console.log(text);
}
```

And again, we display this as a section in the UI:
```jsx
<Section title='Content'>
    {this.state.content.map( (c, i) => (<div key={i}>{c}</div>))}
</Section>
```

### ContentBlock

You can think of a [ContentBlock](https://draftjs.org/docs/api-reference-content-block.html) as the equivalent of a paragraph. A ContentBlock contains the **full state of a single block of editor content**, including:

- Plain text contents of the block
- Type, e.g. paragraph, header, list item
- Entity, inline style, and depth information

The above example, using `onContentChange()`, gets all `ContentBlocks` in the `ContentState` and assigns it to a string array in `this.state.content`.

## Custom Functionality

If you want to write your own specific styles and behaviours, three main concepts of interest would be decorators, custom blocks and entities. **Decorators** allow you to apply additional styles to the text itself. **Entities** allow you to attach metadata and behaviour to the text (i.e. adding data that is stored along side the text in a ContentBlock).

### Decorators

To create a decorator you need to do the following:
1. create a `strategy` which triggers with certain content in the editor
2. create a `component` that get's used when the strategy is triggered
3. register the strategy and component when initialising the editor, using `CompositeDecorator`

We cover the usage of decorators as a plugin in [Lesson 4](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson4)

For this example, we'll create a decorator that renders a hexColor in the color it specifies. We use a regular expression to pick up any hex colors like `#000000` (black) or `#FFFFFF` (white) which is 
```re
/#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g
```
We'll put the strategy and component in the same file for now, as they are quite compact in this example:

1. Create the **strategy**:
`./decorators/index.js`:
```jsx
const COLOR_REGEX = /#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g;

export const colorStrategy = (contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArray, start;
    while((matchArray = COLOR_REGEX.exec(text)) !== null) {
        start = matchArray.index;
        callback(start, start + matchArray[0].length);
    }
}
```

2. Create the **component**:
`./decorators/index.js`:
```jsx
import React from 'react';

export const ColorComponent = (props) => {
    return (
        <span style={{color: props.decoratedText}}>{props.children}</span>
    )
}

export default ColorComponent;

//... strategy code above goes here
```

3. Register the decorator with the editor:

```jsx
import ColorComponent, {colorStrategy} from './decorators';

const decorators = new CompositeDecorator([{
    strategy: colorStrategy,
    component: ColorComponent
}]);

export class Lesson2 extends React.Component {
    componentWillMount() {
        // ...
        this.setState({
            editorState: EditorState.createWithContent(ContentState.createFromText('You are learning Draft.js\n\nThis is a guide from Bilo\n\nReact Rocks'), decorators),
            //...
        })
    }
}
```

That should be it. Now try typing color Hex codes in the editor, e.g. `#FF0000` (red), `#00FF00` (green), `#0000FF` (blue) and see how the text gets highlighted.

### Entities

An [entity](https://draftjs.org/docs/advanced-topics-entities.html#content) is an object that represents metadata for a range of text within a Draft editor. It has three properties:

- **type**: A string that indicates what kind of entity it is, e.g. `'LINK'`, `'MENTION'`, `'PHOTO'`
- **mutability**: denotes the behavior of a range of text annotated with this entity object when editing the text range within the editor. 
- **data**: an **optional** object containing the metadata for the entity.

### Custom BlockComponents

[Next Lesson](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson3)