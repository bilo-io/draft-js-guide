# Draft.js Guide
by Bilo Lwabona

[Draft.js](https://draftjs.org/) is a rich text editor that is very powerful, and quite extensible. Unfortunately, there is not as much documentation out there as you would like.

## Lessons

- [Lesson 1: Intro to Draft.js](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson1)
- [Lesson 2: Draft.js API](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson2)
- [Lesson 3: Draft.js Plugins Editor](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson3)
- Lesson 4: Draft.js Custom Plugins (current)

## Lesson 4: Draft.js Custom Plugins


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
                <h2>Lesson 4: Draft.js Custom Plugins</h2>
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


### plugin: hex-to-color

making it cleaner to import. Remember the decorators we created in [Lesson 2](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson2#decorators)? Here we are going to turn that into a plugin.

First let's organize our folders a bit, by creating a `./plugin` directory. Within that we create a subfolder, named after the plugin we want `hex-to-color`, and move the file created above to that folder. Finally, add a function which creates the plugin.

`./plugins/hex-to-color/index.js`:
```jsx
// HERE: Code for Component
// HERE: Code for Strategy

export const hexToColorPlugin = {
    decorators: [{
        strategy: colorStrategy,
        component: ColorComponent
    }]
}
```

Now your component code becomes cleaner, as you only need to import the plugin, and attach it in the Editor:

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
