import React, { PropTypes } from 'react';
import styles from '../style.scss';

const DefaultBlock = (props) => (
    <span className='defaultBlock'>{props.children}</span>
)

DefaultBlock.propTypes = {
    // children: PropTypes.any
}

export default DefaultBlock;