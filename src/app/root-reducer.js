import { combineReducers } from 'redux';
// Pages
import aboutReducer from './pages/about/reducer';
import homeReducer from './pages/home/reducer';
// Containers
const rootReducer = combineReducers({
    // Pages
    home: homeReducer,
    about: aboutReducer
})

export default rootReducer;