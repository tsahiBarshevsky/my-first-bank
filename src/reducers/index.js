import { combineReducers } from 'redux';
import goalsReducer from './goals';
import actionsReducer from './actions';
import currencyReducer from './currency';

const rootReducer = combineReducers({
    goals: goalsReducer,
    actions: actionsReducer,
    currency: currencyReducer
});

export default rootReducer;