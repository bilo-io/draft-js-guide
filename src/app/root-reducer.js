import { combineReducers } from 'redux';
// Pages
import aboutReducer from './pages/about/reducer';
import homeReducer from './pages/home/reducer';
import lesson1Reducer from './pages/lesson1/reducer';
import lesson2Reducer from './pages/lesson2/reducer';
import lesson3Reducer from './pages/lesson3/reducer';
import lesson4Reducer from './pages/lesson4/reducer';
import lesson5Reducer from './pages/lesson5/reducer';
// Containers
const rootReducer = combineReducers({
    // Pages
    home: homeReducer,
    about: aboutReducer,
    lesson1: lesson1Reducer,
    lesson2: lesson2Reducer,
    lesson3: lesson3Reducer,
    lesson4: lesson4Reducer,
    lesson5: lesson5Reducer,
});

export default rootReducer;