import React from 'react';

export const ColorComponent = (props) => {
    return (
        <span style={{color: props.decoratedText}}>{props.children}</span>
    )
}

const COLOR_REGEX = /#[0-9A-Fa-f]{6}/g;
export const colorStrategy = (contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArray, start;
    while((matchArray = COLOR_REGEX.exec(text)) !== null) {
        start = matchArray.index;
        callback(start, start + matchArray[0].length);
    }
}

export default ColorComponent;

export const hexToColorPlugin = {
    decorators: [{
        strategy: colorStrategy,
        component: ColorComponent
    }]
}