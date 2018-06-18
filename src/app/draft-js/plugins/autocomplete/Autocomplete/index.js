import React from 'react';

const Autocomplete = (props) => {
    const {
        contentState,
        entityKey,
        children
    } = props;

    const selection = contentState.getEntity(entityKey).getData().toJS();
    const category = seletion.type;
    const prettyLabel = category;
}

export default Autocomplete;