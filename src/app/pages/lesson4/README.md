# Draft.js Guide
by Bilo Lwabona

[Draft.js](https://draftjs.org/) is a rich text editor that is very powerful, and quite extensible. Unfortunately, there is not as much documentation out there as you would like.

## Lessons

- [Lesson 1: Intro to Draft.js](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson1)
- [Lesson 2: Draft.js API](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson2)
- [Lesson 3: Draft.js Plugins Editor](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson3)
- Lesson 4: Draft.js Custom Plugins (current)

## Lesson 4: Draft.js Custom Plugins

In this step we start looking at how to create our own plugins, using the Draft.js API.

Let's start off small, by creating a plugin that does some text highlighting. Specifically, when you type a hexColor, the plugin will highlight that piece of text in the color it specifies.

## Decorators

For this example, we'll create a decorator that renders a hexColor in the color it specifies. We use a regular expression to pick up any hex colors like `#000000` (black) or `#FFFFFF` (white) which is 
```re
/#[0-9A-Fa-f]{6}/g
```
We'll put the strategy and component in the same file for now, as they are quite compact in this example:

1. Create the **strategy**:
`./decorators/index.js`:
```jsx
const COLOR_REGEX = /#[0-9A-Fa-f]{6}/g;

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

## Basic Plugins

In this step we cover how to create plugins, starting off with a basic example.

### plugin: hex-to-color

Now let's turn the whole thing into a plugin, making it cleaner to import.
First let's organize our folders a bit, by creating a `./plugin` directory. Within that we create a subfolder, named after the plugin we want `hex-to-color`, and move the file created above to that folder. Finally, add a function which creates the plugin.

`./plugins/hex-to-color/index.js`:
```jsx
// ... add this at the bottom:
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

>**NOTE:** remember to remove the other code, which uses `CompositeDecorator`to initialise the plugin, and remove the `decorators` as an argument when initialising the Draft.js Editor.

Try running it again and everything should be fine. Congratulations. You've created your first plugin!! but let's not stop there. Let's create a few more plugins to illustrate more possibilities.

