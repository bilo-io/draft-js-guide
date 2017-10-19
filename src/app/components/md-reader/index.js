import React, { Component, PropTypes } from 'react';
import './style.scss';

export default class MyComponent extends Component {
    static propTypes = {
        url: PropTypes.string,
        markdown: PropTypes.string,
    }
    constructor(props) {
        super(props)
    }
    componentWillMount() {}
    componentDidMount() {}
    // updates
    componentWillReceiveProps(nextProps) {}
    shouldComponentUpdate(nextProps, nextState) {}
    componentDidWillUpdate(nextProps, nextState) {}
    componentDidUpdate(prevProps, prevState) {}
    // unmounting & error handling
    componentWillUnMount() {}
    componentDidCatch(error, info) {}
    //#endregion
    render() {
        return (
            <div className='page'>
                
            </div>
        )
    }
}

// export const MyComponent = (props) => {
//     return (
//         <div>
//             <h1>MyComponent</h1>
//         </div>
//     )
// }
//
// export default MyComponent;