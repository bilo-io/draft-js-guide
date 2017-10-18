import { connect } from 'react-redux';
import Lesson3 from './component'

import {
    myAction
} from './actions';

const mapStateToProps = (state, ownProps) => {
    let _state = state.lesson3;
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
)(Lesson3)

