import { MY_ACTION } from './actions'

const initialState = {
    data: undefined
}

const lesson1Reducer = (state = initialState, {
    type,
    ...action
}) => {
    switch (type) {
        case MY_ACTION:
            return {
                ...state,
                data: action.data
            }
        default: return state;
    }
};

export default lesson1Reducer;