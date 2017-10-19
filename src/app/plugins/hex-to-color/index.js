import React from 'react';
import { REGEX_HEX_COLOR } from '../regex';

export const ColorComponent = (props) => {
    return (
        <span style={{color: props.decoratedText}}>{props.children}</span>
    )
}

export const colorStrategy = (contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArray, start;
    while((matchArray = REGEX_HEX_COLOR.exec(text)) !== null) {
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