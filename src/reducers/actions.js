import update from 'immutability-helper';

const INITIAL_STATE = [];

const actionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_ACTIONS':
            return action.actions;
        case 'ADD_NEW_ACTION':
            return update(state, { $push: [action.payload] });
        default:
            return state;
    }
}

export default actionsReducer;