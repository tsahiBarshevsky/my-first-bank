const addNewAction = (action) => {
    return {
        type: 'ADD_NEW_ACTION',
        payload: action
    }
}

const removeAction = (index) => {
    return {
        type: 'REMOVE_ACTION',
        payload: index
    }
}

export { addNewAction, removeAction };