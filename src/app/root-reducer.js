import { combineReducers } from 'redux';
// Pages
import aboutReducer from './pages/about/reducer';
import homeReducer from './pages/home/reducer';
import lesson1Reducer from './pages/lesson1/reducer';
// Containers
const rootReducer = combineReducers({
    // Pages
    home: homeReducer,
    about: aboutReducer,
    lesson1: lesson1Reducer
});

export default rootReducer;