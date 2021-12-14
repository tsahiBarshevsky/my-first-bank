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

export { addNewGoal, purchaseGoal };