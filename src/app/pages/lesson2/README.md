# Draft.js Guide
by Bilo Lwabona

[Draft.js](https://draftjs.org/) is a rich text editor that is very powerful, and quite extensible. Unfortunately, there is not as much documentation out there as you would like.

## Overview

- [Lesson 1: Intro to Draft.js](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson1)
- Lesson 2: Draft.js API( current )
- [Lesson 3: Draft.js Plugins](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson3)
- [Lesson 4: Draft.js Custom Plugins](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson4)

## Lesson 2

In the last lesson we created a basic editor. Without doing much. Here, we go over the [Draft.js API](https://draftjs.org/docs/overview.html#content), which allows you to access and modify various parts of the editor's State.

There are many things to cover, but I think some essential things to know about, are:

 - editorState
 - contentState
 - selectionState
 - entities
 - decorators

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