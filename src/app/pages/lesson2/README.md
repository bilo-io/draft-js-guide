# Draft.js Guide
by Bilo Lwabona

[Draft.js](https://draftjs.org/) is a rich text editor that is very powerful, and quite extensible. Unfortunately, there is not as much documentation out there as you would like.

## Overview

- [Lesson 1: Intro to Draft.js](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson1)
- Lesson 2: Draft.js API (current)
- [Lesson 3: Draft.js Plugins Editor](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson3)
- [Lesson 4: Draft.js Custom Plugins](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson4)

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

### Decorators



### Entities

An [entity](https://draftjs.org/docs/advanced-topics-entities.html#content) is an object that represents metadata for a range of text within a Draft editor. It has three properties:

- **type**: A string that indicates what kind of entity it is, e.g. `'LINK'`, `'MENTION'`, `'PHOTO'`
- **mutability**: denotes the behavior of a range of text annotated with this entity object when editing the text range within the editor. 
- **data**:


We begin with a simple example, whereby we just show various parts of the editorState.
To save ourselves some time, we can initiate the editor with text, rather than having to type it and then perform selections, deletions, etc. This can be done with `ContentState's` static function `createFromText(:string)`:

```jsx
// ...
componentDidMount() {
    // ...
    this.setState({
                editorState: EditorState.createWithContent(ContentState.createFromText('You are learning Draft.js\n\nThis is a guide from Bilo\n\nReact Rocks')),
                selection: '',
                block: ''
    });
    // ...
}
// ...
```

 ### ContentBlocks

You can think of a [ContentBlock](https://draftjs.org/docs/api-reference-content-block.html) is the equivalent of a paragraph.
 ### Selection



[Next Lesson](https://github.com/bilo-io/draft-js-guide/tree/lesson3)