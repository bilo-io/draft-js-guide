import { MY_ACTION } from './actions'

const initialState = {
    data: undefined
}

const entitiesReducer = (state = initialState, {
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
}

export default entitiesReducer;