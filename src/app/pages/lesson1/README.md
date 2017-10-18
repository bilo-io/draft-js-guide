# Draft.js Guide
by Bilo Lwabona

[Draft.js](https://draftjs.org/) is a rich text editor that is very powerful, and quite extensible. Unfortunately, there is not as much documentation out there as you would like.

## Lessons

- Lesson 1: Intro to Draft.js (current)
- [Lesson 2: Draft.js API](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson2)
- [Lesson 3: Draft.js Plugins](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson3)
- [Lesson 4: Draft.js Custom Plugins](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson4)

## Lesson 1: Intro to Draft.js

DraftJS is a React component using `contenteditable` attribute, and managing its state to perform rich text editing. As such it has its own state object `EditorState`, which gets updated whenever something changes in the editor, whether it is changes in text, the selection, or the cursor position. In the next section, we look at how to use the editorState to perform various tasks.

Here is a how you would add a basic draft.js `Editor` component to your application (assuming you already have a React web app).

Run the following in your project root:
```
npm install draft-js immutable --save-dev
```

And then there's component to which you want to add the `Editor`. I've decided to name this component after the lesson we are currently dealing with (here `Lesson1`):

```jsx
import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';
import { toJS } from 'immutable';
//...
export default class Lesson1 extends Component {
    componentWillMount() {
        this.onChange = this.onChange.bind(this);
        this.setState({
            editorState: EditorState.createEmpty()
        })
    }
    onChange(editorState) {
        this.setState({ editorState });
        this.logState(editorState);
    }
    logState(editorState) {
        console.log(editorState.toJS())
    }
    render() {
        return this.state ? (
            // ...
            <Editor
                editorState={this.state.editorState}
                onChange={this.onChange} />
            //...
        ) : null;
    }
}
```

You may notice the source has a bit of extra code, which is omitted here with `//...`, because this code is for presentation purposes, and does not add value to the purpose of this lesson. We discuss the key lines of code below:

First you need to import the `Editor` and `EditorState`:
>
>```jsx
>import { Editor, EditorState } from 'draft-js';
>```

Then add the `<Editor />` component in the `render()` method.

```jsx
render() {
   return (
       <Editor />
   )
}
```

The above line of code will through an error, stating that you need to specify 2 props to the Editor component, namely `onChange` and `editorState`.

Let's initialise the editorState with an `Empty` state just before the component mounts:

```jsx
componentWillMount() {
    this.setState({
        editorState: EditorState.createEmpty()
    })
}
```

Lastly, we need to create the onChange handler, which listens to all changes in the Editor.

```jsx
componentWillMount() {
    //...
    this.onChage = this.onChange.bind(this);
}
onChange(editorState) {
    this.setState({
        editorState
    })
}
```

We've also added a small function to log the `editorState`. Since everything is immutable, you'll need to import a `toJS` function from [`immutable`](https://www.npmjs.com/package/immutable), to convert the editorState to a readable format.
Define the function below, and add it in the `onChange()` handler.

```jsx
logState(editorState) {
    console.log(editorState.toJS());
}
```

Finally, we can add these to the `<Editor />` component as props.
>Since we assign EditorState to the component's state, we need to make sure the `this.state` is defined before rendering anything. Otherwise we will get an error along the lines of `cannot read editorState of undefined`.

```jsx
render() {
    return this.state ? (
        //...
        <Editor
            editorState={this.state.editorState}
            onChange={this.onChange} /> 
        //...
    ) : null
}
```

That should just about be it. In the next lesson we look at some functionality of the Draft.js API.

[Next Lesson](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson2)