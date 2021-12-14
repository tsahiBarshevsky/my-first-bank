import { combineReducers } from 'redux';
import goalsReducer from './goals';

const rootReducer = combineReducers({
    goals: goalsReducer
});

export default rootReducer;