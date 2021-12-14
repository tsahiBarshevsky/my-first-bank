import { combineReducers } from 'redux';
import goalsReducer from './goals';
import actionsReducer from './actions';

const rootReducer = combineReducers({
    goals: goalsReducer,
    actions: actionsReducer
});

export default rootReducer;