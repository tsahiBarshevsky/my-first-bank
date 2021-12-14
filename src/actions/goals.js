const addNewGoal = (goal) => {
    return {
        type: 'ADD_NEW_GOAL',
        payload: goal
    }
}

const purchaseGoal = (index, goal) => {
    return {
        type: 'PURCHASE_GOAL',
        payload: {
            index: index,
            goal: goal
        }
    }
}

const removeGoal = (index) => {
    return {
        type: 'REMOVE_GOAL',
        payload: index
    }
}

export { addNewGoal, purchaseGoal, removeGoal };