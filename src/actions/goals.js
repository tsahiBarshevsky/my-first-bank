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

const updateGoal = (index, type, name, sum) => {
    return {
        type: 'UPDATE_GOAL',
        payload: {
            index: index,
            type: type,
            name: name,
            sum: sum
        }
    }
}

export { addNewGoal, purchaseGoal, removeGoal, updateGoal };