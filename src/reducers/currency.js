const INITIAL_STATE = 0;

const currencyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENCY':
            return action.currency;
        case 'INCREMENT':
            return state + action.payload;
        case 'DECREMENT':
            return state - action.payload;
        default:
            return state;
    }
}

export default currencyReducer;