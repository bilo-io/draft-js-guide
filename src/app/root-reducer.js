import { combineReducers } from 'redux';
// Pages
import aboutReducer from './pages/about/reducer';
import homeReducer from './pages/home/reducer';
import lesson1Reducer from './pages/lesson1/reducer';
import lesson2Reducer from './pages/lesson2/reducer';
// Containers
const rootReducer = combineReducers({
    // Pages
    home: homeReducer,
    about: aboutReducer,
    lesson1: lesson1Reducer,
    lesson2: lesson2Reducer,
});

export default rootReducer;