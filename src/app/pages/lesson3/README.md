# Draft.js Guide

- [Lesson 1: Intro to Draft.js](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson1)
- [Lesson 2: Draft.js API](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson2)
- Lesson 3: Draft.js Plugins Editor (current)
- [Lesson 4: Draft.js Custom Plugins - Part 1](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson4)
- [Lesson 5: Draft.js Custom Plugins - Part 2](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson5)

## Lesson 3: Draft.js Plugins Editor

While Draft.js has a solid API, it does not come with many features out of the box. That is where [Draft.js Plugins](https://www.draft-js-plugins.com) come in handy. These are used for the `draft-js-plugins-editor`, which is a wrapper around the usual Editor, and lets you easily integrate plugins. Let's get started.

```
npm install draft-js-plugins-editor --save-dev
```

### Simple Plugins

We'll start off simple. The first plugin we'll use is the **Hashtag** plugin, which basically turns every bit of text that is preceeded with ah `#` into a hashtag. The second plugin we'll install is the **Linkify** plugin, which turns every typed-out URL into a link.

```
npm install draft-js-hashtag-plugin draft-js-linkify-plugin --save-dev
```

>**NOTE:**
>make sure to install the version `@beta10` for the editor and all subsequent plugins.
>`package.json`:
>```jsx
>"devDependencies": {
>   /* ... */
>   "draft-js-hashtag-plugin": "^2.0.0-beta10",
>   "draft-js-linkify-plugin": "^2.0.0-beta10",
>   "draft-js-plugins-editor": "^2.0.0-beta10",
>   /* ... */
>}
>```


Below is the component, implementing the plugins editor, with the hashtag and linkify plugins.

```jsx
```

Naturally you need to import these plugins and the respective styles:

```jsx
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';

import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-hashtag-plugin/lib/plugin.css';
```

>In order to load the css files, you need to update your `webpack.config.js`:
```js
var config: {
    module: {
        rules: [
            //...
            {
                test: /plugin\.css$/,
                loaders: ['style-loader','css-loader']
            }
            //...
        ]
    }
}
```

Thereafter, you need to create instances of them, in one of many ways, e.g.:

```jsx
const linkifyPlugin = createLinkifyPlugin();
const hashtagPlugin = createHashtagPlugin();
```

Finally, you need to add these in an array as a prop to the editor.

```jsx
<Editor 
    /* other props */
    plugins={[linkifyPlugin,hashtagPlugin]}
/>        
```

And that's it. Pretty easy, right? 

>**NOTE:**
> - You can specify multiple plugins for a single editor.
> - You **cannot** specify the same plugin instance to multiple editors. 
>   - for multiple editors you'll need multiple plugin instances (`e.g. const linkifyPlugin2 = createLinkifyPlugin()`)
> - You can also initialise the plugins as instance variables (e.g. in the constructor)
>```jsx
>  this.linkifyPlugin = createLinkifyPlugin()
>  this.hashtagPlugin = createHashtagPlugin()
>```

### Less simple Examples

```jsx
//TODO: add example of a more involved plugin, like mentions
```

In the next lesson we look at how to create our plugins.

[Next Lesson](https://github.com/bilo-io/draft-js-guide/tree/master/src/app/pages/lesson4)