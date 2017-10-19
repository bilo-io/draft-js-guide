import React from 'react';
import { REGEX_LINK } from '../regex';

export const LinkComponent = (props) => {
    return (
        <span onClick={() => console.log(props.decoratedText)}>
            <a href={`https://${props.decoratedText}`} style={{color: '#00adee', cursor: 'pointer'}}>{props.children}</a>
        </span>
    )
}

export const linkStrategy = (contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArray, start;
    while( (matchArray = REGEX_LINK.exec(text)) !== null) {
        start = matchArray.index;
        callback(start, start + matchArray[0].length);
    }
}

export const linkPlugin = {
    decorators: [{
        strategy: linkStrategy,
        component: LinkComponent
    }]
}