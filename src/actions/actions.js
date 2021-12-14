const addNewAction = (action) => {
    return {
        type: 'ADD_NEW_ACTION',
        payload: action
    }
}

export { addNewAction };