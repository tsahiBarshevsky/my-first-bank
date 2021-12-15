import update from 'immutability-helper';

const INITIAL_STATE = [];

const goalsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_GOALS':
            return action.goals;
        case 'ADD_NEW_GOAL':
            return update(state, { $push: [action.payload] });
        case 'PURCHASE_GOAL':
            return [...update(state, { [action.payload.index]: { $merge: { bought: true } } })];
        case 'REMOVE_GOAL':
            return update(state, { $splice: [[action.payload, 1]] });
        case 'UPDATE_GOAL':
            return [...update(state, {
                [action.payload.index]: {
                    $merge: {
                        type: action.payload.type,
                        name: action.payload.name,
                        sum: action.payload.sum
                    }
                }
            })];
        default:
            return state;
    }
}

export default goalsReducer;