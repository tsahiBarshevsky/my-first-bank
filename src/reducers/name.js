const INITIAL_STATE = '';

const nameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return action.name;
        default:
            return state;
    }
}

export default nameReducer;