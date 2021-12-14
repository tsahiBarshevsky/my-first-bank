import { combineReducers } from 'redux';
import goalsReducer from './goals';
import actionsReducer from './actions';
import currencyReducer from './currency';
import nameReducer from './name';

const rootReducer = combineReducers({
    goals: goalsReducer,
    actions: actionsReducer,
    currency: currencyReducer,
    name: nameReducer
});

export default rootReducer;