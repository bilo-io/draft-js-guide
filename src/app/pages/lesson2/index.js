import { connect } from 'react-redux';
import Lesson2 from './component'

import {
    myAction
} from './actions';

const mapStateToProps = (state, ownProps) => {
    let _state = state.lesson2;
    return {
        myProps: _state.myProps
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        myAction: () => dispatch(myAction())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lesson2)

